import type { SinnoController } from "./controller";
import type { SinnoLogger } from "./logger";
import type { BaseNextParams } from "./router";
import type { SinnoRouterConfig } from "./router/config";

export function createSinnoRouter<
  Req extends Request,
  NextParams extends BaseNextParams,
  Logger extends SinnoLogger,
>(
  config: SinnoRouterConfig<Req, Logger>,
  controller: SinnoController<Req, NextParams, Logger>,
) {
  return controller.mapRoutes(config);
}

export * from "./controller";
export * from "./logger";
export * from "./router";
