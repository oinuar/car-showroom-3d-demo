import { RootState } from "..";

export function getPosition(state: RootState) {
    return state.camera.position;
}

export function getYaw(state: RootState) {
    return state.camera.yaw;
}

export function getPitch(state: RootState) {
    return state.camera.pitch;
}
