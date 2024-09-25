import { PayloadAction } from '@reduxjs/toolkit';
import { ModelTransform, type State } from '../state';

export type AddObjModelAction = PayloadAction<{
    model: string;
    transforms: ModelTransform[];
}>;

export function addObjModel(state: State, action: AddObjModelAction) {
    state.models[action.payload.model] = action.payload.transforms;
}
