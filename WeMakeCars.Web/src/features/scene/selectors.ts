import { RootState } from "..";

export function getModels(state: RootState) {
    return state.scene.models;
}
