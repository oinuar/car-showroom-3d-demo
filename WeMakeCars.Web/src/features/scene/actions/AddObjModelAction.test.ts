import { ModelTransform, State } from "../state";
import { addObjModel, AddObjModelAction } from "./AddObjModelAction";

test('adds a model to models', () => {
    const action = {
        payload: {
            model: 'obj model',
            transforms: [] as ModelTransform[]
        }
    } as AddObjModelAction;

    const state = {
        models: {}
    } as State;

    addObjModel(state, action);

    expect(state.models[action.payload.model]).toBe(action.payload.transforms);
});
