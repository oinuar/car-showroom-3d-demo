import { PayloadAction } from '@reduxjs/toolkit';
import { type State } from '../state';

export type RotationAction = PayloadAction<{
    yawDelta: number;
    pitchDelta: number;
}>;

export function rotation(state: State, action: RotationAction) {
    state.yaw += action.payload.yawDelta;
    state.pitch += action.payload.pitchDelta;
}
