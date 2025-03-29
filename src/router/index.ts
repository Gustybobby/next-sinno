import type { SinnoLogger } from "../logger";
import type { SinnoRouterConfig } from "./config";
import type { SinnoRouteResponse } from "./response";

export type NextHTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type NextMethodHandler<
  Req extends Request,
  NextParams extends BaseNextParams,
> = (req: Req, { params }: { params: NextParams }) => Promise<Response>;

export type NextMethodHandlers<
  Req extends Request,
  NextParams extends BaseNextParams,
> = Partial<Record<NextHTTPMethods, NextMethodHandler<Req, NextParams>>>;

export function createSinnoRouter<
  Req extends Request,
  NextParams extends BaseNextParams,
  Logger extends SinnoLogger,
  MethodResults extends Partial<Record<NextHTTPMethods, unknown>>,
>(
  handlers: SinnoMethodHandlers<NextParams, MethodResults>,
  config: SinnoRouterConfig<Req, Logger>,
): NextMethodHandlers<Req, NextParams> {
  return {
    GET: routeMethodMapper<Req, NextParams, Logger, MethodResults["GET"]>(
      handlers.GET,
      config,
    ),
    POST: routeMethodMapper<Req, NextParams, Logger, MethodResults["POST"]>(
      handlers.POST,
      config,
    ),
    PUT: routeMethodMapper<Req, NextParams, Logger, MethodResults["PUT"]>(
      handlers.PUT,
      config,
    ),
    PATCH: routeMethodMapper<Req, NextParams, Logger, MethodResults["PATCH"]>(
      handlers.PATCH,
      config,
    ),
    DELETE: routeMethodMapper<Req, NextParams, Logger, MethodResults["DELETE"]>(
      handlers.DELETE,
      config,
    ),
  };
}

function routeMethodMapper<
  Req extends Request,
  NextParams extends BaseNextParams,
  Logger extends SinnoLogger,
  Results,
>(
  handler: SinnoMethodHandler<NextParams, Results> | undefined,
  config: SinnoRouterConfig<Req, Logger>,
): NextMethodHandler<Req, NextParams> | undefined {
  return handler
    ? (req, { params }) => handleSinnoRouterMethod(req, params, handler, config)
    : undefined;
}

export type SinnoMethodHandler<NextParams extends BaseNextParams, Results> = (
  args: SinnoRouterMethodArgs<NextParams>,
) => Promise<SinnoRouteResponse<Results>>;

export type SinnoMethodHandlers<
  NextParams extends BaseNextParams,
  MethodResults extends Partial<Record<NextHTTPMethods, unknown>>,
> = {
  [method in NextHTTPMethods]?: SinnoMethodHandler<
    NextParams,
    MethodResults[method]
  >;
};

export type BaseNextParams = Record<string, string | string[]>;

export interface SinnoRouterMethodArgs<NextParams extends BaseNextParams> {
  req: Request;
  params: NextParams;
  logger: SinnoLogger;
}

async function handleSinnoRouterMethod<
  Req extends Request,
  NextParams extends BaseNextParams,
  Logger extends SinnoLogger,
  Results,
>(
  req: Req,
  params: NextParams,
  handler: (
    args: SinnoRouterMethodArgs<NextParams>,
  ) => Promise<SinnoRouteResponse<Results>>,
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
