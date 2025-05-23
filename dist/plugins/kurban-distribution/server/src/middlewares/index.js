"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kurban_plugin_middleware_1 = __importDefault(require("./kurban-plugin-middleware"));
exports.default = {
    'customPluginMiddleware': kurban_plugin_middleware_1.default,
};
