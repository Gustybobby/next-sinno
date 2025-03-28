"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSinnoRouter = createSinnoRouter;
function createSinnoRouter(config, controller) {
    return controller.mapRoutes(config);
}
