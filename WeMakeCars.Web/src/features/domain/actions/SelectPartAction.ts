import { createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';
import { createApi } from '../../../api';
import { scene } from '../../scene';
import { RootState } from '../..';

export async function selectPart(args: {partId: number, socketId: number}, thunkAPI: GetThunkAPI<any>) {
    const state = thunkAPI.getState() as RootState;
    const model = state.domain.allParts[args.partId].objModel!;
    const transforms = state.domain.allSockets[args.socketId].transforms!;
    const api = createApi();

    // Add selected part to scene
    thunkAPI.dispatch(scene.addObjModel({model, transforms}));

    // Evaluate next sockets of selected part
    const response = await api.socketGetByPartList(args);

    // Include only sockets that are unique
    return response.data.filter(x => state.domain.allSockets[x.socketId!] === undefined);
}

export default createAsyncThunk(
    'As a user, I want to selected part to be included in my car configuration.',
    selectPart
);
