import { RootState } from "..";
import { getModels, } from "./selectors";

test('returns models state', () => {
    const state = {};

    const value = getModels({
        scene: {
            models: state
        }
    } as RootState);

    expect(value).toBe(state);
});
