import { RootState } from '../..';
import { createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';

export function deselectPart(args: {partId: number; socketId: number}, thunkAPI: GetThunkAPI<any>) {
    const state = thunkAPI.getState() as RootState;
    const parts = [];
    const sockets = [];

    for (const socketId in state.domain.partSockets[args.partId]) {
        const socket = state.domain.allSockets[socketId];

        if (!socket)
            continue;

        sockets.push(socket.socketId!);

        for (const partId in state.domain.allParts) {
            const part = state.domain.allParts[partId];

            if (part && part.socketId === socket.socketId)
                parts.push(part.partId!);
        }
    }

    return Promise.resolve({parts, sockets});
}

export default createAsyncThunk(
    'As a user, I do not want to selected part to be included in my car configuration.',
    deselectPart
);
