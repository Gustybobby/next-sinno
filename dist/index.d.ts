import type { SinnoController } from "./controller";
import type { SinnoLogger } from "./logger";
import type { BaseNextParams } from "./router";
import type { SinnoRouterConfig } from "./router/config";
export declare function createSinnoRouter<Req extends Request, NextParams extends BaseNextParams, Logger extends SinnoLogger>(config: SinnoRouterConfig<Req, Logger>, controller: SinnoController<Req, NextParams, Logger>): Partial<Record<"GET" | "POST" | "PUT" | "PATCH" | "DELETE", (req: Req, { params }: {
    params: NextParams;
}) => Promise<Response>>>;
