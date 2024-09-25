import { State } from "../state";
import { rotation, RotationAction } from "./RotationAction";

test('adds a model to models', () => {
    const action = {
        payload: {
            yawDelta: 1,
            pitchDelta: 2,
        }
    } as RotationAction;

    const state = {
        yaw: 100,
        pitch: 200,
    } as State;

    rotation(state, action);

    expect(state.yaw).toBe(action.payload.yawDelta + 100);
    expect(state.pitch).toBe(action.payload.pitchDelta + 200);
});
