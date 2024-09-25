import { RootState } from "..";

export function getSocketName(socketId: number) {
    return (state: RootState) => state.domain.allSockets[socketId].name;
}

export function getPartName(partId: number) {
    return (state: RootState) => state.domain.allParts[partId].name;
}

export function getPartObjModel(partId: number) {
    return (state: RootState) => state.domain.allParts[partId].objModel;
}

export function getPartPreviewUrl(partId: number) {
    return (state: RootState) => state.domain.allParts[partId].previewUrl;
}

export function getSocketTransforms(socketId: number) {
    return (state: RootState) => state.domain.allSockets[socketId].transforms!;
}
