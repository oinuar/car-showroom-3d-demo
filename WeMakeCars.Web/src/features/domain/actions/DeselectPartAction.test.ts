import { GetThunkAPI } from "@reduxjs/toolkit";
import thunk, { deselectPart } from "./DeselectPartAction";
import { RootState } from "../..";

jest.mock('@reduxjs/toolkit', () => ({
    ...jest.requireActual('@reduxjs/toolkit'),
    createAsyncThunk: jest.fn((_, f) => f),
}));

test('registers an async thunk for deselecting a part action', () => {
    expect(thunk).toBe(deselectPart);
});

test('marks parts and sockets to be removed that belong to given part', async () => {
    const partId = 10;
    const socketId = 20;
    const state = {
        domain: {
            partSockets: {
                [partId]: {
                    [socketId + 1]: true,
                    [socketId + 2]: true,
                }
            },
            allSockets: {
                [socketId + 1]: {socketId: socketId + 1},
                [socketId + 2]: {socketId: socketId + 2},
                [socketId + 3]: {socketId: socketId + 3},
            },
            allParts: {
                [partId + 1]: {partId: partId + 1, socketId: socketId + 1},
                [partId + 2]: {partId: partId + 2, socketId: socketId + 1},
                [partId + 3]: {partId: partId + 3, socketId: socketId + 2},
                [partId + 4]: {partId: partId + 4, socketId: socketId},
            }
        }
    } as unknown as RootState;

    const thunkAPI = {
        getState: jest.fn(() => state),
    } as unknown as GetThunkAPI<any>;

    const {sockets, parts} = await deselectPart({partId, socketId}, thunkAPI);

    expect(sockets).toEqual([socketId + 1, socketId + 2]);
    expect(parts).toEqual([partId + 1, partId + 2, partId + 3]);
});
