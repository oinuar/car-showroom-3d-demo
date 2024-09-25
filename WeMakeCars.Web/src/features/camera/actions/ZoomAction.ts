import { PayloadAction } from '@reduxjs/toolkit';
import { type State } from '../state';

export type ZoomAction = PayloadAction<number>;

export function zoom(state: State, action: ZoomAction) {
    const [x, y, z] = state.position;
    state.position = [x, y, z - action.payload];
}
