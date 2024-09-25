import { PayloadAction } from "@reduxjs/toolkit";
import { State } from "../state";

export type ToggleSocketAction = PayloadAction<number>;

export function toggleSocket(state: State, action: ToggleSocketAction) {
    if (state.activeSocketId === action.payload) {
        state.activeSocketId = -1;
        state.listParts = [];
    }
    else
        state.activeSocketId = action.payload;
}
