import { RootState } from "..";
import { getPartName, getPartObjModel, getPartPreviewUrl, getSocketName, getSocketTransforms } from "./selectors";

test("returns socket's name", () => {
    const socketId = 1;
    const state = {};

    const value = getSocketName(socketId)({
        domain: {
            allSockets: {
                [socketId]: {
                    name: state
                }
            }
        }
    } as unknown as RootState);

    expect(value).toBe(state);
});

test("returns part's name", () => {
    const partId = 1;
    const state = {};

    const value = getPartName(partId)({
        domain: {
            allParts: {
                [partId]: {
                    name: state
                }
            }
        }
    } as unknown as RootState);

    expect(value).toBe(state);
});

test("returns part's obj model", () => {
    const partId = 1;
    const state = {};

    const value = getPartObjModel(partId)({
        domain: {
            allParts: {
                [partId]: {
                    objModel: state
                }
            }
        }
    } as unknown as RootState);

    expect(value).toBe(state);
});

test("returns part's preview url", () => {
    const partId = 1;
    const state = {};

    const value = getPartPreviewUrl(partId)({
        domain: {
            allParts: {
                [partId]: {
                    previewUrl: state
                }
            }
        }
    } as unknown as RootState);

    expect(value).toBe(state);
});

test("returns socket's transforms", () => {
    const socketId = 1;
    const state = {};

    const value = getSocketTransforms(socketId)({
        domain: {
            allSockets: {
                [socketId]: {
                    transforms: state
                }
            }
        }
    } as unknown as RootState);

    expect(value).toBe(state);
});
