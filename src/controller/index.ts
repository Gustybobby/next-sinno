import type { SinnoLogger } from "../logger";
import type { BaseNextParams, SinnoRouterArgs } from "../router";
import type { SinnoRouterConfig } from "../router/config";
import type { SinnoRouteResponse } from "../router/response";

import { handleSinnoRouter } from "../router";

export type SinnoAllowedRoutes = Partial<Record<NextHTTPMethods, boolean>>;

export type SinnoNextRoutes<
  Req extends Request,
  NextParams extends BaseNextParams,
> = Partial<
  Record<
    NextHTTPMethods,
    (req: Req, { params }: { params: NextParams }) => Promise<Response>
  >
>;

type NextHTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export abstract class SinnoController<
  Req extends Request,
  NextParams extends BaseNextParams,
  Logger extends SinnoLogger,
> {
  constructor(private readonly allowedRoutes: SinnoAllowedRoutes) {}

  abstract get<Result>(
    args: SinnoRouterArgs<NextParams>,
  ): Promise<SinnoRouteResponse<Result>>;

  abstract post<Result>(
    args: SinnoRouterArgs<NextParams>,
  ): Promise<SinnoRouteResponse<Result>>;

  abstract put<Result>(
    args: SinnoRouterArgs<NextParams>,
  ): Promise<SinnoRouteResponse<Result>>;

  abstract patch<Result>(
    args: SinnoRouterArgs<NextParams>,
  ): Promise<SinnoRouteResponse<Result>>;

  abstract delete<Result>(
    args: SinnoRouterArgs<NextParams>,
  ): Promise<SinnoRouteResponse<Result>>;

  mapRoutes(
    config: SinnoRouterConfig<Req, Logger>,
  ): SinnoNextRoutes<Req, NextParams> {
    return {
      GET: this.allowedRoutes.GET
        ? (req, { params }) => handleSinnoRouter(req, params, this.get, config)
        : undefined,
      POST: this.allowedRoutes.POST
        ? (req, { params }) => handleSinnoRouter(req, params, this.post, config)
        : undefined,
      PUT: this.allowedRoutes.PUT
        ? (req, { params }) => handleSinnoRouter(req, params, this.put, config)
        : undefined,
      PATCH: this.allowedRoutes.PATCH
        ? (req, { params }) =>
            handleSinnoRouter(req, params, this.patch, config)
        : undefined,
      DELETE: this.allowedRoutes.DELETE
        ? (req, { params }) =>
            handleSinnoRouter(req, params, this.delete, config)
        : undefined,
    };
  }
}
