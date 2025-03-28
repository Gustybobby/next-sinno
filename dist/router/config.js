"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouterConfig = void 0;
const createRouterConfig = () => {
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
exports.createRouterConfig = createRouterConfig;
