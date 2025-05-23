"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const design_system_1 = require("@strapi/design-system");
const SelectComponent = ({ label, error, hint, placeholder, data, ...props }) => {
    const selectRef = react_1.default.useRef(null);
    return ((0, jsx_runtime_1.jsxs)(design_system_1.Field.Root, { error: error, hint: hint, children: [(0, jsx_runtime_1.jsx)(design_system_1.Field.Label, { children: label }), (0, jsx_runtime_1.jsx)(design_system_1.SingleSelect, { ref: selectRef, placeholder: placeholder ?? 'Pilih', error: error, ...props, children: data &&
                    data?.length > 0 &&
                    data.map((item) => ((0, jsx_runtime_1.jsx)(design_system_1.SingleSelectOption, { value: item.id, children: item.name }, item.id))) }), (0, jsx_runtime_1.jsx)(design_system_1.Field.Error, {}), (0, jsx_runtime_1.jsx)(design_system_1.Field.Hint, {})] }));
};
exports.default = SelectComponent;
