import thunk, { start } from "./StartAction";
import { createApi } from '../../../api';

jest.mock('@reduxjs/toolkit', () => ({
    createAsyncThunk: jest.fn((_, f) => f),
}));

jest.mock('../../../api', () => ({
    createApi: jest.fn(),
}));

test('registers an async thunk for start action', () => {
    expect(thunk).toBe(start);
});

test('calls get sockets API', async () => {
    const response = {
        data: {}
    };

    (createApi as jest.Mock).mockReturnValue({
        socketGetList: jest.fn(),
    });

    const api = createApi();

    (api.socketGetList as jest.Mock).mockReturnValue(response);

    const result = await start();

    expect(api.socketGetList as jest.Mock).toHaveBeenCalled();
    expect(result).toEqual(response.data);
});
