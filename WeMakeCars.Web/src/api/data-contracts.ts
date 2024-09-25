/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PartModel {
  /** @format int32 */
  partId?: number;
  /** @format int32 */
  socketId?: number;
  name?: string | null;
  objModel?: string | null;
  previewUrl?: string | null;
}

export interface SocketModel {
  /** @format int32 */
  socketId?: number;
  name?: string | null;
  transforms?: TransformModel[] | null;
}

export interface TransformModel {
  /** @format float */
  positionX?: number;
  /** @format float */
  positionY?: number;
  /** @format float */
  positionZ?: number;
  /** @format float */
  rotationX?: number;
  /** @format float */
  rotationY?: number;
  /** @format float */
  rotationZ?: number;
}
