import { GetThunkAPI } from "@reduxjs/toolkit";
import thunk, { selectPart } from "./SelectPartAction";
import { RootState } from "../..";
import { scene } from '../../scene';
import { createApi } from '../../../api';

jest.mock('@reduxjs/toolkit', () => ({
    ...jest.requireActual('@reduxjs/toolkit'),
    createAsyncThunk: jest.fn((_, f) => f),
}));

jest.mock('../../../api', () => ({
    createApi: jest.fn(),
}));

test('registers an async thunk for selecting a part action', () => {
    expect(thunk).toBe(selectPart);
});

test('calls get sockets by part API', async () => {
    const partId = 1;
    const socketId = 1;
    const response = {
        data: [
            {socketId},
            {socketId: socketId + 1}
        ],
    };
    const objModel = '';
    const transforms = [{}];
    const state = {
        domain: {
            allParts: {
                [partId]: {
                    objModel,
                },
            },
            allSockets: {
                [socketId]: {
                    transforms,
                },
            },
        },
    } as unknown as RootState;

    const thunkAPI = {
        getState: jest.fn(() => state),
        dispatch: jest.fn(),
    } as unknown as GetThunkAPI<any>;

    (createApi as jest.Mock).mockReturnValue({
        socketGetByPartList: jest.fn().mockReturnValue(response),
    });

    const sockets = await selectPart({partId, socketId}, thunkAPI);

    expect(sockets).toEqual([{socketId: socketId + 1}]);
});

test('adds part to scene', async () => {
    const partId = 1;
    const socketId = 1;
    const response = {
        data: [],
    };
    const objModel = 'obj model';
    const transforms = [{}];
    const state = {
        domain: {
            allParts: {
                [partId]: {
                    objModel,
                },
            },
            allSockets: {
                [socketId]: {
                    transforms,
                },
            },
        },
    } as unknown as RootState;

    const thunkAPI = {
        getState: jest.fn(() => state),
        dispatch: jest.fn(),
    } as unknown as GetThunkAPI<any>;

    (createApi as jest.Mock).mockReturnValue({
        socketGetByPartList: jest.fn().mockReturnValue(response),
    });

    await selectPart({partId, socketId}, thunkAPI);

    expect(thunkAPI.dispatch as jest.Mock).toHaveBeenCalledWith(scene.addObjModel({model: objModel, transforms}));
});
