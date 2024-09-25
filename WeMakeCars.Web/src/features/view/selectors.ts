import { RootState } from "..";

export function listSockets(state: RootState) {
    return state.view.listSockets;
}

export function listParts(state: RootState) {
    return state.view.listParts;
}

export function getActiveSocketId(state: RootState) {
    return state.view.activeSocketId;
}

export function isPartSelected(partId: number) {
    return (state: RootState) => !!state.view.selectedParts[partId];
}

export function isSocketUsed(socketId: number) {
    return (state: RootState) => !!state.view.usedSockets[socketId];
}

export function getShouldStart(state: RootState) {
    return state.view.shouldStart;
}
