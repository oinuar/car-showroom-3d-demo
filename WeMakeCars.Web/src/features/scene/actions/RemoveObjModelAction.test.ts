import { State } from "../state";
import { removeObjModel, RemoveObjModelAction } from "./RemoveObjModelAction";

test('adds a model to models', () => {
    const action = {
        payload: 'obj model'
    } as RemoveObjModelAction;

    const state = {
        models: {
            [action.payload]: {}
        }
    } as State;

    removeObjModel(state, action);

    expect(state.models[action.payload]).toBeUndefined();
});
