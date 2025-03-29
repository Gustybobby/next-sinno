import type { SinnoLogger } from "../logger";
import type { SinnoRouterConfig } from "./config";
import type { SinnoRouteResponse } from "./response";
type NextHTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type NextMethodHandler<Req extends Request, NextParams extends BaseNextParams> = (req: Req, { params }: {
    params: NextParams;
}) => Promise<Response>;
type NextMethodHandlers<Req extends Request, NextParams extends BaseNextParams> = Partial<Record<NextHTTPMethods, NextMethodHandler<Req, NextParams>>>;
export declare function createSinnoRouter<Req extends Request, NextParams extends BaseNextParams, Logger extends SinnoLogger, MethodResults extends Record<NextHTTPMethods, unknown>>(handlers: SinnoMethodHandlers<NextParams, MethodResults>, config: SinnoRouterConfig<Req, Logger>): NextMethodHandlers<Req, NextParams>;
type SinnoMethodHandler<NextParams extends BaseNextParams, Results> = (args: SinnoRouterMethodArgs<NextParams>) => Promise<SinnoRouteResponse<Results>>;
type SinnoMethodHandlers<NextParams extends BaseNextParams, MethodResults extends Record<NextHTTPMethods, unknown>> = {
    [method in NextHTTPMethods]?: SinnoMethodHandler<NextParams, MethodResults[method]>;
};
type BaseNextParams = Record<string, string | string[]>;
interface SinnoRouterMethodArgs<NextParams extends BaseNextParams> {
    req: Request;
    params: NextParams;
    logger: SinnoLogger;
}
export {};
