"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const design_system_1 = require("@strapi/design-system");
const LoadingIndicator = () => {
    return ((0, jsx_runtime_1.jsx)(design_system_1.Box, { padding: 5, style: { textAlign: 'center', height: '40px' }, children: (0, jsx_runtime_1.jsx)(design_system_1.Loader, { children: "Memuat data..." }) }));
};
exports.default = LoadingIndicator;
