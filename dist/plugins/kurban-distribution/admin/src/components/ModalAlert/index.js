"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const design_system_1 = require("@strapi/design-system");
const icons_1 = require("@strapi/icons");
const ModalAlertComponent = ({ showAlert, setShowAlert, alertData }) => {
    const { success = true, title = '', content = '', actionText = 'OK', cancelText = '', onConfirm, } = alertData;
    const handleConfirm = () => {
        onConfirm?.();
        setShowAlert(false);
    };
    const handleCancel = () => {
        setShowAlert(false);
    };
    return ((0, jsx_runtime_1.jsx)(design_system_1.Dialog.Root, { open: showAlert, onOpenChange: setShowAlert, children: (0, jsx_runtime_1.jsxs)(design_system_1.Dialog.Content, { children: [(0, jsx_runtime_1.jsx)(design_system_1.Dialog.Header, { children: title }), (0, jsx_runtime_1.jsx)(design_system_1.Dialog.Body, { icon: success ? (0, jsx_runtime_1.jsx)(icons_1.CheckCircle, { fill: "success600" }) : (0, jsx_runtime_1.jsx)(icons_1.WarningCircle, { fill: "danger600" }), children: content }), (0, jsx_runtime_1.jsxs)(design_system_1.Dialog.Footer, { children: [cancelText && (0, jsx_runtime_1.jsx)(design_system_1.Dialog.Action, { children: (0, jsx_runtime_1.jsx)(design_system_1.Button, { fullWidth: true, variant: "secondary", onClick: handleCancel, children: cancelText }) }), (0, jsx_runtime_1.jsx)(design_system_1.Dialog.Action, { children: (0, jsx_runtime_1.jsx)(design_system_1.Button, { fullWidth: true, variant: success ? 'success-light' : 'danger-light', onClick: handleConfirm, children: actionText }) })] })] }) }));
};
exports.default = ModalAlertComponent;
