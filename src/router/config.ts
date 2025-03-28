import type { SinnoLogger } from "../logger";
import type { SinnoResponse } from "./response";

export type SinnoRouterConfig<
  Req extends Request,
  Logger extends SinnoLogger,
> = {
  setupLoggerHandler: ({ req }: { req: Req }) => Promise<Logger>;
  beforeHandler: ({
    req,
    logger,
  }: {
    req: Req;
    logger: Logger;
  }) => Promise<void>;
  onCompleteHandler: ({
    req,
    logger,
    response,
  }: {
    req: Req;
    logger: Logger;
    response: SinnoResponse;
  }) => Promise<void>;
  onErrorHandler: ({
    req,
    logger,
    error,
  }: {
    req: Req;
    logger: Logger;
    error: unknown;
  }) => Promise<SinnoResponse>;
};

type RouterLoggerSetup<Req extends Request, Logger extends SinnoLogger> = (
  handler: SinnoRouterConfig<Req, Logger>["setupLoggerHandler"],
) => {
  beforeHandler: RouterBeforeHandler<Req, Logger>;
};

type RouterBeforeHandler<Req extends Request, Logger extends SinnoLogger> = (
  handler: SinnoRouterConfig<Req, Logger>["beforeHandler"],
) => {
  onHandlerComplete: RouterOnHandlerComplete<Req, Logger>;
};

type RouterOnHandlerComplete<
  Req extends Request,
  Logger extends SinnoLogger,
> = (handler: SinnoRouterConfig<Req, Logger>["onCompleteHandler"]) => {
  onHandlerError: RouterOnHandlerError<Req, Logger>;
};

type RouterOnHandlerError<Req extends Request, Logger extends SinnoLogger> = (
  handler: SinnoRouterConfig<Req, Logger>["onErrorHandler"],
) => SinnoRouterConfig<Req, Logger>;

export const createRouterConfig = <
  Req extends Request,
  Logger extends SinnoLogger,
>(): { setupLogger: RouterLoggerSetup<Req, Logger> } => {
  return {
    setupLogger: (setupLoggerHandler) => ({
      beforeHandler: (beforeHandler) => ({
        onHandlerComplete: (onCompleteHandler) => ({
          onHandlerError: (onErrorHandler) => ({
            setupLoggerHandler,
            beforeHandler,
            onCompleteHandler,
            onErrorHandler,
          }),
        }),
      }),
    }),
  };
};
