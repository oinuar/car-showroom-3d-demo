import { PayloadAction } from '@reduxjs/toolkit';
import { type State } from '../state';

export type RemoveObjModelAction = PayloadAction<string>;

export function removeObjModel(state: State, action: RemoveObjModelAction) {
    delete state.models[action.payload];
}
