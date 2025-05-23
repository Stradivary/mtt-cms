"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config, { strapi }) => {
    return async (ctx, next) => {
        await next();
    };
};
