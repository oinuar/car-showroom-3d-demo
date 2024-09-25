import { State } from "../state";
import { toggleSocket, ToggleSocketAction } from "./ToggleSocketAction";

test('toggles a socket on', () => {
    const action = {
        payload: 1
    } as ToggleSocketAction;

    const state = {
        activeSocketId: -1,
    } as State;

    toggleSocket(state, action);

    expect(state.activeSocketId).toBe(action.payload);
});

test('toggles an active socket off', () => {
    const action = {
        payload: 1
    } as ToggleSocketAction;

    const state = {
        activeSocketId: 1,
        listParts: [1]
    } as State;

    toggleSocket(state, action);

    expect(state.activeSocketId).toBe(-1);
    expect(state.listParts).toEqual([]);
});
