import type { Core } from "@strapi/strapi";
import { registerDocumentMiddleware } from "./utils";

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  registerDocumentMiddleware(strapi);
};

export default register;