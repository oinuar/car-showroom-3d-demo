
export interface State {
    selectedParts: {[partId: number]: boolean};
    usedSockets: {[socketId: number]: boolean};
    activeSocketId: number;
    listSockets: number[];
    listParts: number[];
    shouldStart: boolean;
}

export default {
    selectedParts: {},
    usedSockets: {},
    activeSocketId: -1,
    listSockets: [],
    listParts: [],
    shouldStart: true,
} as State;
