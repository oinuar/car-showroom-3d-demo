import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import { addObjModel } from './actions/AddObjModelAction';
import { removeObjModel } from './actions/RemoveObjModelAction';

const slice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    addObjModel,
    removeObjModel,
  }
});

export const scene = slice.actions;
export const sceneReducer = slice.reducer;
