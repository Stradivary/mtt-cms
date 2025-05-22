import { factories } from "@strapi/strapi";
const bootstrap = ({ strapi }) => {
};
const destroy = ({ strapi }) => {
};
const registerDocumentMiddleware = (strapi) => {
  const middleware = "plugin::kurban-distribution.customPluginMiddleware";
  const routesPath = strapi.apis.kurban.routes.kurban.routes;
  const targetMethods = ["GET", "POST", "PUT", "DELETE"];
  for (const method of targetMethods) {
    const index2 = routesPath.findIndex(
      (route) => route.path === "/kurbans" && route.method === method
    );
    if (index2 !== -1) {
      const route = routesPath[index2];
      route.config.middlewares = route.config.middlewares || [];
      route.config.middlewares.push(middleware);
    }
  }
};
const register = ({ strapi }) => {
  registerDocumentMiddleware(strapi);
};
const config = {
  default: {},
  validator() {
  }
};
const contentTypes = {};
const controller = factories.createCoreRouter("api::kurban.kurban");
const controllers = {
  controller
};
const customPluginMiddleware = (config2, { strapi }) => {
  return async (ctx, next) => {
    await next();
  };
};
const middlewares = {
  "customPluginMiddleware": customPluginMiddleware
};
const policies = {};
const routes$1 = [
  {
    method: "GET",
    path: "/kurbans",
    handler: "api::kurban.kurban.find",
    config: {
      middlewares: ["plugin::kurban-distribution.customPluginMiddleware"],
      policies: []
    }
  },
  {
    method: "GET",
    path: "/kurbans/:id",
    handler: "api::kurban.kurban.findOne",
    config: {
      middlewares: ["plugin::kurban-distribution.customPluginMiddleware"],
      policies: []
    }
  },
  {
    method: "POST",
    path: "/kurbans",
    handler: "api::kurban.kurban.create",
    config: {
      middlewares: ["plugin::kurban-distribution.customPluginMiddleware"],
      policies: []
    }
  },
  {
    method: "PUT",
    path: "/kurbans/:id",
    handler: "api::kurban.kurban.update",
    config: {
      middlewares: ["plugin::kurban-distribution.customPluginMiddleware"],
      policies: []
    }
  },
  {
    method: "DELETE",
    path: "/kurbans/:id",
    handler: "api::kurban.kurban.delete",
    config: {
      middlewares: ["plugin::kurban-distribution.customPluginMiddleware"],
      policies: []
    }
  }
];
const routes = {
  "content-api": {
    type: "content-api",
    routes: routes$1
  }
};
const service = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  }
});
const services = {
  service
};
const index = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
export {
  index as default
};
