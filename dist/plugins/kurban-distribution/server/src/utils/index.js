"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDocumentMiddleware = void 0;
const registerDocumentMiddleware = (strapi) => {
    const middleware = 'plugin::kurban-distribution.customPluginMiddleware';
    const routesPath = strapi.apis.kurban.routes.kurban.routes;
    const targetMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    for (const method of targetMethods) {
        const index = routesPath.findIndex((route) => route.path === '/kurbans' && route.method === method);
        if (index !== -1) {
            const route = routesPath[index];
            route.config.middlewares = route.config.middlewares || [];
            route.config.middlewares.push(middleware);
        }
    }
};
exports.registerDocumentMiddleware = registerDocumentMiddleware;
