"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinnoController = void 0;
const router_1 = require("../router");
class SinnoController {
    constructor(allowedRoutes) {
        this.allowedRoutes = allowedRoutes;
    }
    mapRoutes(config) {
        return {
            GET: this.allowedRoutes.GET
                ? (req, { params }) => (0, router_1.handleSinnoRouter)(req, params, this.get, config)
                : undefined,
            POST: this.allowedRoutes.POST
                ? (req, { params }) => (0, router_1.handleSinnoRouter)(req, params, this.post, config)
                : undefined,
            PUT: this.allowedRoutes.PUT
                ? (req, { params }) => (0, router_1.handleSinnoRouter)(req, params, this.put, config)
                : undefined,
            PATCH: this.allowedRoutes.PATCH
                ? (req, { params }) => (0, router_1.handleSinnoRouter)(req, params, this.patch, config)
                : undefined,
            DELETE: this.allowedRoutes.DELETE
                ? (req, { params }) => (0, router_1.handleSinnoRouter)(req, params, this.delete, config)
                : undefined,
        };
    }
}
exports.SinnoController = SinnoController;
