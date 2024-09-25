import { RootState } from "..";
import { getActiveSocketId, getShouldStart, isPartSelected, isSocketUsed, listParts, listSockets } from "./selectors";

test('returns listSockets state', () => {
    const state = {};

    const value = listSockets({
        view: {
            listSockets: state
        }
    } as RootState);

    expect(value).toBe(state);
});

test('returns listParts state', () => {
    const state = {};

    const value = listParts({
        view: {
            listParts: state
        }
    } as RootState);

    expect(value).toBe(state);
});

test('returns activeSocketId state', () => {
    const state = {};

    const value = getActiveSocketId({
        view: {
            activeSocketId: state
        }
    } as RootState);

    expect(value).toBe(state);
});

test('returns selectedParts state', () => {
    const partId = 1;

    const no = isPartSelected(partId)({
        view: {
            selectedParts: {}
        }
    } as RootState);

    const yes = isPartSelected(partId)({
        view: {
            selectedParts: {
                [partId]: true
            }
        }
    } as unknown as RootState);

    expect(no).toBe(false);
    expect(yes).toBe(true);
});

test('returns usedSockets state', () => {
    const socketId = 1;

    const no = isSocketUsed(socketId)({
        view: {
            usedSockets: {}
        }
    } as RootState);

    const yes = isSocketUsed(socketId)({
        view: {
            usedSockets: {
                [socketId]: true
            }
        }
    } as unknown as RootState);

    expect(no).toBe(false);
    expect(yes).toBe(true);
});

test('returns shouldStart state', () => {
    const state = {};

    const value = getShouldStart({
        view: {
            shouldStart: state
        }
    } as RootState);

    expect(value).toBe(state);
});
