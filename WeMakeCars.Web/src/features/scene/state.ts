
export type ModelTransform = {
    positionX?: number;
    positionY?: number;
    positionZ?: number;
    rotationW?: number;
    rotationX?: number;
    rotationY?: number;
    rotationZ?: number;
};

export interface State {
    models: {[model: string]: ModelTransform[]};
}

export default {
    models: {}
} as State;
