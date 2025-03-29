import type { SinnoLogger } from "../logger";
import type { SinnoRouterConfig } from "./config";
import type { SinnoRouteResponse } from "./response";
export type NextHTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type NextMethodHandler<Req extends Request, NextParams extends BaseNextParams> = (req: Req, { params }: {
    params: NextParams;
}) => Promise<Response>;
export type NextMethodHandlers<Req extends Request, NextParams extends BaseNextParams> = Partial<Record<NextHTTPMethods, NextMethodHandler<Req, NextParams>>>;
export declare function createSinnoRouter<Req extends Request, NextParams extends BaseNextParams, Logger extends SinnoLogger, MethodResults extends Partial<Record<NextHTTPMethods, unknown>>>(handlers: SinnoMethodHandlers<Req, NextParams, Logger, MethodResults>, config: SinnoRouterConfig<Req, Logger>): NextMethodHandlers<Req, NextParams>;
export type SinnoMethodHandler<Req extends Request, NextParams extends BaseNextParams, Logger extends SinnoLogger, Results> = (args: SinnoRouterMethodArgs<Req, NextParams, Logger>) => Promise<SinnoRouteResponse<Results>>;
export type SinnoMethodHandlers<Req extends Request, NextParams extends BaseNextParams, Logger extends SinnoLogger, MethodResults extends Partial<Record<NextHTTPMethods, unknown>>> = {
    [method in NextHTTPMethods]?: SinnoMethodHandler<Req, NextParams, Logger, MethodResults[method]>;
};
export type BaseNextParams = Record<string, string | string[]>;
export interface SinnoRouterMethodArgs<Req extends Request, NextParams extends BaseNextParams, Logger extends SinnoLogger> {
    req: Req;
    params: NextParams;
    logger: Logger;
}
