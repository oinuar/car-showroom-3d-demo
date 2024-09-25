import { SocketModel, PartModel } from "../../api/data-contracts";

export interface State {
    allSockets: {[socketId: number]: SocketModel};
    allParts: {[partId: number]: PartModel};
    partSockets: {[partId: number]: {[socketId: number]: boolean}};
}

export default {
    allSockets: {},
    allParts: {},
    partSockets: {},
} as State;
