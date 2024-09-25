import { useDispatch as _useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cameraReducer } from './camera';
import { sceneReducer } from './scene';
import { domainReducer } from './domain';
import { viewReducer } from './view';

export const store = configureStore({
  reducer: {
    camera: cameraReducer,
    scene: sceneReducer,
    domain: domainReducer, 
    view: viewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useDispatch = _useDispatch<typeof store.dispatch>;
