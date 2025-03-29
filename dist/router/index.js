"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSinnoRouter = createSinnoRouter;
function createSinnoRouter(handlers, config) {
    return {
        GET: routeMethodMapper(handlers.GET, config),
        POST: routeMethodMapper(handlers.POST, config),
        PUT: routeMethodMapper(handlers.PUT, config),
        PATCH: routeMethodMapper(handlers.PATCH, config),
        DELETE: routeMethodMapper(handlers.DELETE, config),
    };
}
function routeMethodMapper(handler, config) {
    return handler
        ? (req, { params }) => handleSinnoRouterMethod(req, params, handler, config)
        : undefined;
}
function handleSinnoRouterMethod(req, params, handler, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = yield config.setupLoggerHandler({ req });
        try {
            yield config.beforeHandler({ req, logger });
            const body = yield handler({ req, params, logger });
            yield config.onCompleteHandler({ req, logger, response: body.response });
            return Response.json(body, { status: body.response.status });
        }
        catch (error) {
            const errorResponse = yield config.onErrorHandler({ req, logger, error });
            return Response.json({
                payload: null,
                response: errorResponse,
            }, { status: errorResponse.status });
        }
    });
}
