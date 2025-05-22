"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register({ strapi }) {
        // const middleware = "global::kurban-middleware";
        // const routesPath = strapi.apis.kurban.routes.kurban.routes;
        // console.log(routesPath, "routesPath");
        // console.log(middleware, "middleware");
        // const registerIndex = routesPath.findIndex(
        //   (route) => route.path === "/kurbans" && route.method === "GET"
        // );
        // console.log(registerIndex, "registerIndex");
        // const registerRoute = routesPath[registerIndex];
        // if (registerRoute.config.middlewares === undefined) {
        //   registerRoute.config.middlewares = [];
        // }
        // registerRoute.config.middlewares.push(middleware);
    },
    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap( /* { strapi }: { strapi: Core.Strapi } */) { },
};
