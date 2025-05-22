"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const admin_1 = require("@strapi/strapi/admin");
const react_router_dom_1 = require("react-router-dom");
const ListKurbanPage_1 = __importDefault(require("./ListKurbanPage"));
const design_system_1 = require("@strapi/design-system");
const KurbanPage_1 = __importDefault(require("./KurbanPage"));
const DetailKurbanPage_1 = __importDefault(require("./DetailKurbanPage"));
const App = () => {
    return ((0, jsx_runtime_1.jsx)(design_system_1.DesignSystemProvider, { locale: "en-GB", theme: design_system_1.lightTheme, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { index: true, element: (0, jsx_runtime_1.jsx)(ListKurbanPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/add", element: (0, jsx_runtime_1.jsx)(KurbanPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/detail", element: (0, jsx_runtime_1.jsx)(DetailKurbanPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(admin_1.Page.Error, {}) })] }) }));
};
exports.App = App;
