import { useRef, useEffect, useState } from "react";
import { mat4 } from "gl-matrix";
import { initMeshBuffers, deleteMeshBuffers, Mesh, MeshWithBuffers } from "webgl-obj-loader";
import { useSelector, useDispatch } from 'react-redux';
import { camera } from "../features/camera";
import { ModelTransform } from "../features/scene/state";
import { getModels } from "../features/scene/selectors";
import { getPitch, getPosition, getYaw } from "../features/camera/selectors";

interface Props {
    resolutionX: number;
    resolutionY: number;
    enableZoom: boolean;
}

interface RenderingState {
    program: WebGLProgram;
    variables: {
        aPosition: number;
        aNormal: number;
        aTextureCoord: number;
        uModelViewMatrix: WebGLUniformLocation;
        uProjectionMatrix: WebGLUniformLocation;
        uNormalMatrix: WebGLUniformLocation;
        uLightPosition: WebGLUniformLocation;
        uLightColor: WebGLUniformLocation;
        uAmbientColor: WebGLUniformLocation;
        uDiffuseColor: WebGLUniformLocation;
        uSpecularColor: WebGLUniformLocation;
        uShininess: WebGLUniformLocation;
    },
}

type MeshState = {[model: string]: {
    mesh: MeshWithBuffers;
    transforms: ModelTransform[]
}};

function SceneView({resolutionX, resolutionY, enableZoom = true} : Props) {
    const [renderingState, setRenderingState] = useState<RenderingState | null>(null);
    const [meshState, setMeshState] = useState<MeshState>({});
    const ref = useRef<HTMLCanvasElement>(null);
    const dispatch = useDispatch();

    const cameraPosition = useSelector(getPosition);
    const cameraYaw = useSelector(getYaw);
    const cameraPitch = useSelector(getPitch);
    const models = useSelector(getModels);

    useEffect(() => {
        let lastMouseX = 0;
        let lastMouseY = 0;
        let isMouseDown = false;

        function mousedown(event: MouseEvent) {
            isMouseDown = true;
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }
        
        function mouseup() {
            isMouseDown = false;
        }
    
        function mousemove(event: MouseEvent) {
            if (isMouseDown) {
                const deltaX = event.clientX - lastMouseX;
                const deltaY = event.clientY - lastMouseY;

                dispatch(camera.rotation({
                   pitchDelta: deltaX * 0.01,
                   yawDelta: deltaY * 0.01,
                }));

                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            }
        }
    
        function wheel(event: WheelEvent) {
            dispatch(camera.zoom(event.deltaY * 0.01));
        }

        // Nothing to do if we don't have Canvas ref
        if (!ref.current)
            return;

        // Setup event handlers for mouse interaction
        if (renderingState) {
            const canvas = ref.current;

            canvas.addEventListener('mousedown', mousedown);
            window.addEventListener('mouseup', mouseup);
            window.addEventListener('mousemove', mousemove);

            if (enableZoom)
                window.addEventListener('wheel', wheel);

            return () => {
                canvas.removeEventListener('mousedown', mousedown);
                window.removeEventListener('mouseup', mouseup);
                window.removeEventListener('mousemove', mousemove);

                if (enableZoom)
                    window.removeEventListener('wheel', wheel);
            };
        }

        const gl = ref.current.getContext('webgl');

        // Cannot continue if we cannot get WebGL context
        if (!gl)
            return;

        // Vertex shader program
        const vsSource = `
            attribute vec4 aPosition;
            attribute vec3 aNormal;
            
            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;
            uniform mat4 uNormalMatrix;
            
            varying vec3 vNormal;
            varying vec3 vPosition;

            void main(void) {
                vPosition = vec3(uModelViewMatrix * aPosition);
                vNormal = mat3(uNormalMatrix) * aNormal;
                gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
            }
        `;

        // Fragment shader program
        const fsSource = `
            precision mediump float;

            varying vec3 vNormal;
            varying vec3 vPosition;

            uniform vec3 uLightPosition;
            uniform vec3 uLightColor;
            uniform vec3 uAmbientColor;
            uniform vec3 uDiffuseColor;
            uniform vec3 uSpecularColor;
            uniform float uShininess;

            void main(void) {
                vec3 lightDirection = normalize(uLightPosition - vPosition);
                vec3 normal = normalize(vNormal);

                // Ambient
                vec3 ambient = uAmbientColor;

                // Diffuse
                float diff = max(dot(normal, lightDirection), 0.0);
                vec3 diffuse = uDiffuseColor * diff;

                // Specular
                vec3 viewDirection = normalize(-vPosition);
                vec3 reflection = reflect(-lightDirection, normal);
                float spec = pow(max(dot(viewDirection, reflection), 0.0), uShininess);
                vec3 specular = uSpecularColor * spec;

                gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
            }
        `;

        const program = initShaderProgram(gl, vsSource, fsSource)!;

        setRenderingState({
            program,
            variables: {
                aPosition: gl.getAttribLocation(program, 'aPosition'),
                aNormal: gl.getAttribLocation(program, 'aNormal'),
                aTextureCoord: gl.getAttribLocation(program, 'aTextureCoord'),
                uModelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix')!,
                uProjectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix')!,
                uNormalMatrix: gl.getUniformLocation(program, 'uNormalMatrix')!,
                uLightPosition: gl.getUniformLocation(program, 'uLightPosition')!,
                uLightColor: gl.getUniformLocation(program, 'uLightColor')!,
                uAmbientColor: gl.getUniformLocation(program, 'uAmbientColor')!,
                uDiffuseColor: gl.getUniformLocation(program, 'uDiffuseColor')!,
                uSpecularColor: gl.getUniformLocation(program, 'uSpecularColor')!,
                uShininess: gl.getUniformLocation(program, 'uShininess')!,
            }
        });
    }, [dispatch, ref, renderingState, enableZoom]);

    // Update active OBJ models from Redux state, parse OBJ and then initialize OpenGL buffers
    useEffect(() => {
        if (!ref.current || !renderingState)
            return;

        const gl = ref.current.getContext('webgl');

        if (!gl)
            return;

        setMeshState(prevState => {
            const nextState = {} as typeof prevState;
            let changed = false;

            // Added & updated models
            for (const model in models) {
                if (prevState[model] === undefined) {
                    nextState[model] = {
                        mesh: initMeshBuffers(gl, new Mesh(model)),
                        transforms: models[model]
                    };
                    changed = true;
                }
                else
                    nextState[model] = prevState[model];
            }

            // Removed models
            for (const model in prevState) {
                if (nextState[model] === undefined) {
                    deleteMeshBuffers(gl, prevState[model].mesh);
                    changed = true;
                }
            }

            return changed ? nextState : prevState;
        });
    }, [ref, renderingState, models]);

    // Update scene rendering when:
    // - camera changes
    // - meshes that are visualized change
    useEffect(() => {
        if (!ref.current || !renderingState)
            return;

        const gl = ref.current.getContext('webgl');

        if (!gl)
            return;

        const aspectRatio = (ref.current.clientWidth ?? 0) / (ref.current.clientHeight ?? 1);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Projection matrix
        const fieldOfView = Math.PI / 4;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();
        mat4.perspective(projectionMatrix, fieldOfView, aspectRatio, zNear, zFar);

        requestAnimationFrame(() => drawScene(gl, renderingState, meshState, cameraPosition, cameraYaw, cameraPitch, projectionMatrix));
    }, [ref, renderingState, meshState, cameraPosition, cameraYaw, cameraPitch]);

    return (
        <canvas ref={ref} className="w-full h-full" width={resolutionX} height={resolutionY}>
            Unable to use Canvas. Your browser may not support it.
        </canvas>
    );
}

function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)!;
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)!;

    const shaderProgram = gl.createProgram()!;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(shaderProgram));
        alert('Unable to initialize the shader program');
        return null;
    }

    return shaderProgram;
}

function loadShader(gl: WebGLRenderingContext, type: GLenum, source: string) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        alert('An error occurred compiling the shaders');
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function drawScene(gl: WebGLRenderingContext, renderingState: RenderingState, meshState: MeshState, cameraPosition: [number, number, number], cameraYaw: number, cameraPitch: number, projectionMatrix: mat4) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(renderingState.program);

    // Set the shader uniforms
    gl.uniform3fv(renderingState.variables.uLightPosition, [5, 5, 5]);
    gl.uniform3fv(renderingState.variables.uLightColor, [1.0, 1.0, 1.0]);
    gl.uniform3fv(renderingState.variables.uAmbientColor, [0.1, 0.1, 0.1]);
    gl.uniform3fv(renderingState.variables.uDiffuseColor, [0.8, 0.8, 0.8]);
    gl.uniform3fv(renderingState.variables.uSpecularColor, [1.0, 1.0, 1.0]);
    gl.uniform1f(renderingState.variables.uShininess, 32.0);
    gl.uniformMatrix4fv(renderingState.variables.uProjectionMatrix, false, projectionMatrix);

    // Render each mesh in scene
    for (const model in meshState) {
        const mesh = meshState[model].mesh;
        const viewMatrix = mat4.create();

        mat4.translate(viewMatrix, viewMatrix, cameraPosition);
        mat4.rotate(viewMatrix, viewMatrix, cameraYaw, [1, 0, 0]);
        mat4.rotate(viewMatrix, viewMatrix, cameraPitch, [0, 1, 0]);

        // Bind vertex positions
        if (renderingState.variables.aPosition >= 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
            gl.vertexAttribPointer(renderingState.variables.aPosition, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(renderingState.variables.aPosition);
        }

        // Bind vertex normals
        if (renderingState.variables.aNormal >= 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
            gl.vertexAttribPointer(renderingState.variables.aNormal, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(renderingState.variables.aNormal);
        }

        // Bind texture coords
        if (renderingState.variables.aTextureCoord >= 0) {
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureBuffer);
            gl.vertexAttribPointer(renderingState.variables.aTextureCoord, mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(renderingState.variables.aTextureCoord);
        }

        // Bind indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

        // Render each transformation
        for (const {positionX, positionY, positionZ, rotationX, rotationY, rotationZ} of meshState[model].transforms) {
            const modelMatrix = mat4.create();
            const modelViewMatrix = mat4.create();
            const normalMatrix = mat4.create();
    
            mat4.translate(modelMatrix, modelMatrix, [positionX ?? 0, positionZ ?? 0, -(positionY ?? 0)]);
            mat4.rotate(modelMatrix, modelMatrix, (rotationX ?? 0) * (Math.PI / 180.0), [1, 0, 0]);
            mat4.rotate(modelMatrix, modelMatrix, (rotationY ?? 0) * (Math.PI / 180.0), [0, 1, 0]);
            mat4.rotate(modelMatrix, modelMatrix, (rotationZ ?? 0) * (Math.PI / 180.0), [0, 0, 1]);

            mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);

            mat4.invert(normalMatrix, modelViewMatrix);
            mat4.transpose(normalMatrix, normalMatrix);
    
            gl.uniformMatrix4fv(renderingState.variables.uModelViewMatrix, false, modelViewMatrix);
            gl.uniformMatrix4fv(renderingState.variables.uNormalMatrix, false, normalMatrix);
            
            // Draw the mesh
            gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
    }

    // Request drawing next frame
    // requestAnimationFrame(() => drawScene(gl, renderingState, meshState, cameraPosition, cameraYaw, cameraPitch, projectionMatrix));
}

export default SceneView;
