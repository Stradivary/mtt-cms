"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const register = ({ strapi }) => {
    (0, utils_1.registerDocumentMiddleware)(strapi);
};
exports.default = register;
