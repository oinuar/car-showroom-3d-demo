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

import { PartModel, SocketModel } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Part
   * @name PartGetBySocketList
   * @request GET:/api/Part/GetBySocket
   */
  partGetBySocketList = (
    query: {
      /** @format int32 */
      socketId: number;
      /**
       * @format int32
       * @default 100
       */
      limit?: number;
      /**
       * @format int32
       * @default 0
       */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<PartModel[], any>({
      path: `/api/Part/GetBySocket`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Socket
   * @name SocketGetList
   * @request GET:/api/Socket/Get
   */
  socketGetList = (params: RequestParams = {}) =>
    this.request<SocketModel[], any>({
      path: `/api/Socket/Get`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Socket
   * @name SocketGetByPartList
   * @request GET:/api/Socket/GetByPart
   */
  socketGetByPartList = (
    query: {
      /** @format int32 */
      socketId: number;
      /** @format int32 */
      partId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<SocketModel[], any>({
      path: `/api/Socket/GetByPart`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}
