import thunk, { listParts } from "./ListPartsAction";
import { createApi } from '../../../api';
import { RootState } from "@/features";
import { GetThunkAPI } from "@reduxjs/toolkit";

jest.mock('@reduxjs/toolkit', () => ({
    ...jest.requireActual('@reduxjs/toolkit'),
    createAsyncThunk: jest.fn((_, f) => f),
}));

jest.mock('../../../api', () => ({
    createApi: jest.fn(),
}));

test('registers an async thunk for listing parts action', () => {
    expect(thunk).toBe(listParts);
});

test('calls list parts by socket API', async () => {
    const socketId = 1;
    const state = {} as RootState;

    const thunkAPI = {
        getState: jest.fn(() => state),
    } as unknown as GetThunkAPI<any>;

    const response = {
        data: []
    };

    (createApi as jest.Mock).mockReturnValue({
        partGetBySocketList: jest.fn().mockReturnValue(response),
    });

    const api = createApi();
    const result = await listParts({socketId}, thunkAPI);

    expect(api.partGetBySocketList as jest.Mock).toHaveBeenCalledWith({socketId});
    expect(result).toEqual(response.data);
});
