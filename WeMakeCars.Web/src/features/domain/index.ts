import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import start from './actions/StartAction';
import selectPart from './actions/SelectPartAction';
import deselectPart from './actions/DeselectPartAction';
import listParts from './actions/ListPartsAction';

const slice = createSlice({
  name: 'domain',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(start.fulfilled, (state, action) => {
        state.allSockets = action.payload.reduce((acc, x) => ({...acc, [x.socketId!]: x}), state.allSockets);
      })
      .addCase(listParts.fulfilled, (state, action) => {
        state.allParts = action.payload.reduce((acc, x) => ({...acc, [x.partId!]: x}), state.allParts);
      })
      .addCase(selectPart.fulfilled, (state, action) => {
        state.allSockets = action.payload.reduce((acc, x) => ({...acc, [x.socketId!]: x}), state.allSockets);
        
        if (state.partSockets[action.meta.arg.partId] === undefined)
          state.partSockets[action.meta.arg.partId] = {};

        for (const socket of action.payload)
          state.partSockets[action.meta.arg.partId][socket.socketId!] = true;
      })
      .addCase(deselectPart.fulfilled, (state, action) => {
        for (const socketId of action.payload.sockets)
          delete state.allSockets[socketId];

        for (const partId of action.payload.parts)
          delete state.allParts[partId];

        delete state.partSockets[action.meta.arg.partId];
      })
  }
});

export const domain = {...slice.actions, start, selectPart, deselectPart, listParts};
export const domainReducer = slice.reducer;
