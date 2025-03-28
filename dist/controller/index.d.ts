import type { SinnoLogger } from "../logger";
import type { BaseNextParams, SinnoRouterArgs } from "../router";
import type { SinnoRouterConfig } from "../router/config";
import type { SinnoRouteResponse } from "../router/response";
export type SinnoAllowedRoutes = Partial<Record<NextHTTPMethods, boolean>>;
export type SinnoNextRoutes<Req extends Request, NextParams extends BaseNextParams> = Partial<Record<NextHTTPMethods, (req: Req, { params }: {
    params: NextParams;
}) => Promise<Response>>>;
type NextHTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export declare abstract class SinnoController<Req extends Request, NextParams extends BaseNextParams, Logger extends SinnoLogger> {
    private readonly allowedRoutes;
    constructor(allowedRoutes: SinnoAllowedRoutes);
    abstract get<Result>(args: SinnoRouterArgs<NextParams>): Promise<SinnoRouteResponse<Result>>;
    abstract post<Result>(args: SinnoRouterArgs<NextParams>): Promise<SinnoRouteResponse<Result>>;
    abstract put<Result>(args: SinnoRouterArgs<NextParams>): Promise<SinnoRouteResponse<Result>>;
    abstract patch<Result>(args: SinnoRouterArgs<NextParams>): Promise<SinnoRouteResponse<Result>>;
    abstract delete<Result>(args: SinnoRouterArgs<NextParams>): Promise<SinnoRouteResponse<Result>>;
    mapRoutes(config: SinnoRouterConfig<Req, Logger>): SinnoNextRoutes<Req, NextParams>;
}
export {};
