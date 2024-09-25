import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import { domain } from '../domain';
import { toggleSocket } from './actions/ToggleSocketAction';

const slice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    toggleSocket,
  },
  extraReducers: builder => {
    builder
      .addCase(domain.start.fulfilled, (state, action) => {
        state.listSockets = action.payload.map(x => x.socketId!);
        state.shouldStart = false;
      })
      .addCase(domain.listParts.fulfilled, (state, action) => {
        state.listParts = action.payload.map(x => x.partId!);
      })
      .addCase(domain.selectPart.fulfilled, (state, action) => {
        state.listSockets = state.listSockets.concat(action.payload.map(x => x.socketId!));
        state.selectedParts[action.meta.arg.partId] = true;
        state.usedSockets[action.meta.arg.socketId] = true;
      })
      .addCase(domain.deselectPart.fulfilled, (state, action) => {
        for (const socketId of action.payload.sockets) {
          delete state.usedSockets[socketId];

          if (state.activeSocketId === socketId)
            state.activeSocketId = -1;
        }

        for (const partId of action.payload.parts)
          delete state.selectedParts[partId];

        delete state.selectedParts[action.meta.arg.partId];
        delete state.usedSockets[action.meta.arg.socketId];

        state.listSockets = state.listSockets.filter(x => action.payload.sockets.indexOf(x) < 0);
        state.listParts = state.listParts.filter(x => action.payload.parts.indexOf(x) < 0);
      });
  }
});

export const view = slice.actions;
export const viewReducer = slice.reducer;
