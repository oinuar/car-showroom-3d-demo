import { createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';
import { createApi } from '../../../api';
import { RootState } from '@/features';

export async function listParts(args: {socketId: number}, thunkAPI: GetThunkAPI<any>) {
    const state = thunkAPI.getState() as RootState;
    const api = createApi();
    const response = await api.partGetBySocketList(args);

    return response.data.filter(x => x.partId && (!state.domain.allParts[x.partId] || x.socketId === state.domain.allParts[x.partId].socketId));
}

export default createAsyncThunk(
    'As a user, I want to view part listing by selected socket.',
    listParts
);
