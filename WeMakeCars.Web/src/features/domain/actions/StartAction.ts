import { createAsyncThunk } from '@reduxjs/toolkit';
import { createApi } from '../../../api';

export async function start() {
    const api = createApi();
    const response = await api.socketGetList();

    return response.data;
}

export default createAsyncThunk(
    'As a user, I want to start configuring my car by selecting initial part.',
    start
);
