import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import { rotation } from './actions/RotationAction';
import { zoom } from './actions/ZoomAction';

const slice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    rotation,
    zoom,
  },
});

export const camera = slice.actions;
export const cameraReducer = slice.reducer;
