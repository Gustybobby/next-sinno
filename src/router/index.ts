import type { SinnoLogger } from "../logger";
import type { SinnoRouterConfig } from "./config";
import type { SinnoRouteResponse } from "./response";

export type BaseNextParams = Record<string, string | string[]>;

export interface SinnoRouterArgs<NextParams extends BaseNextParams> {
  req: Request;
  params: NextParams;
  logger: SinnoLogger;
}

export async function handleSinnoRouter<
  Req extends Request,
  NextParams extends BaseNextParams,
  Logger extends SinnoLogger,
  RouterResults,
>(
  req: Req,
  params: NextParams,
  handler: (
    args: SinnoRouterArgs<NextParams>,
  ) => Promise<SinnoRouteResponse<RouterResults>>,
  config: SinnoRouterConfig<Req, Logger>,
): Promise<Response> {
  const logger = await config.setupLoggerHandler({ req });
  try {
    await config.beforeHandler({ req, logger });

    const body = await handler({ req, params, logger });

    await config.onCompleteHandler({ req, logger, response: body.response });

    return Response.json(body, { status: body.response.status });
  } catch (error) {
    const errorResponse = await config.onErrorHandler({ req, logger, error });

    return Response.json(
      {
        payload: null,
        response: errorResponse,
      } satisfies SinnoRouteResponse<null>,
      { status: errorResponse.status },
    );
  }
}
