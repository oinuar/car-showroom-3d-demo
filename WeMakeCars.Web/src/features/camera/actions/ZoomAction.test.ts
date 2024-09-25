import { State } from "../state";
import { zoom, ZoomAction } from "./ZoomAction";

test('adds a model to models', () => {
    const action = {
        payload: 12
    } as ZoomAction;

    const state = {
        position: [1, 2, 3]
    } as State;

    zoom(state, action);

    expect(state.position).toEqual([1, 2, 3 - 12]);
});
