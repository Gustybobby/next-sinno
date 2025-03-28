import type { SinnoLogger } from "../logger";
import type { SinnoRouterConfig } from "./config";
import type { SinnoRouteResponse } from "./response";
export type BaseNextParams = Record<string, string | string[]>;
export interface SinnoRouterArgs<NextParams extends BaseNextParams> {
    req: Request;
    params: NextParams;
    logger: SinnoLogger;
}
export declare function handleSinnoRouter<Req extends Request, NextParams extends BaseNextParams, Logger extends SinnoLogger, RouterResults>(req: Req, params: NextParams, handler: (args: SinnoRouterArgs<NextParams>) => Promise<SinnoRouteResponse<RouterResults>>, config: SinnoRouterConfig<Req, Logger>): Promise<Response>;
