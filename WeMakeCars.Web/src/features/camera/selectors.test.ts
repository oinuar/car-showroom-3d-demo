import { RootState } from "..";
import { getPitch, getPosition, getYaw } from "./selectors";

test('returns position state', () => {
    const state = {};

    const value = getPosition({
        camera: {
            position: state
        }
    } as RootState);

    expect(value).toBe(state);
});

test('returns yaw state', () => {
    const state = {};

    const value = getYaw({
        camera: {
            yaw: state
        }
    } as RootState);

    expect(value).toBe(state);
});

test('returns pitch state', () => {
    const state = {};

    const value = getPitch({
        camera: {
            pitch: state
        }
    } as RootState);

    expect(value).toBe(state);
});
