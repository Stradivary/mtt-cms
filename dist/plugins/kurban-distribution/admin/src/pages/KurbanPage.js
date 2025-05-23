"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const design_system_1 = require("@strapi/design-system");
const Select_1 = __importDefault(require("../components/Select"));
const ModalAlert_1 = __importDefault(require("../components/ModalAlert"));
const indonesia_provinces_cities_json_1 = __importDefault(require("../data/indonesia_provinces_cities.json"));
const icons_1 = require("@strapi/icons");
const react_router_dom_1 = require("react-router-dom");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const kurban_zod_schema_1 = require("../data/kurban-zod-schema");
const KurbanPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    const [showAlert, setShowAlert] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [alertData, setAlertData] = (0, react_1.useState)({
        success: true,
        title: 'Information',
        content: 'Data berhasil disimpan',
        actionText: 'OK',
    });
    const { register, handleSubmit, watch, setValue, control, reset, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(kurban_zod_schema_1.schema),
        defaultValues: {
            province_id: '',
            city_id: '',
            goat_count: '',
            cow_count: '',
            recipient_count: '',
            olahanKaleng: false,
            dagingSegar: false,
        },
    });
    const province_id = watch('province_id');
    const selectedProvince = indonesia_provinces_cities_json_1.default.find((p) => p.id === province_id);
    const cityOptions = selectedProvince?.cities || [];
    const fetchDetail = async () => {
        if (!id)
            return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/kurbans/${id}`);
            const result = await res.json();
            const data = result?.data;
            reset({
                province_id: data.province_id,
                city_id: data.city_id,
                goat_count: data.goat_count?.toString(),
                cow_count: data.cow_count?.toString(),
                recipient_count: data.recipient_count?.toString(),
                olahanKaleng: data.distribution_types?.includes('Olahan Kaleng') ?? false,
                dagingSegar: data.distribution_types?.includes('Daging Segar') ?? false,
            });
        }
        catch (err) {
            console.error('Gagal mengambil detail:', err);
        }
        finally {
            setIsLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        if (id) {
            fetchDetail();
        }
    }, []);
    const showModalSuccess = () => {
        setAlertData({
            success: true,
            title: 'Information',
            content: `Data berhasil ${id ? 'diperbarui' : 'disimpan'}`,
            actionText: 'OK',
            onConfirm: () => navigate('/plugins/kurban-distribution'),
        });
        setShowAlert(true);
    };
    const showModalError = () => {
        setAlertData({
            success: false,
            title: 'Warning',
            content: `Data gagal ${id ? 'diperbarui' : 'disimpan'}, cek apakah data sudah diinput di kota yang sama`,
            actionText: 'OK',
        });
        setShowAlert(true);
    };
    const onSubmit = async (form) => {
        const provinceName = indonesia_provinces_cities_json_1.default.find((p) => p.id === form.province_id)?.name ?? '';
        const cityName = cityOptions.find((c) => c.id === form.city_id)?.name ?? '';
        const distributionType = [
            form.olahanKaleng && 'Olahan Kaleng',
            form.dagingSegar && 'Daging Segar',
        ]
            .filter(Boolean)
            .join(', ');
        const payload = {
            province_id: form.province_id,
            province_name: provinceName,
            city_id: form.city_id,
            city_name: cityName,
            distribution_types: distributionType,
            goat_count: form.goat_count,
            cow_count: form.cow_count,
            recipient_count: form.recipient_count,
        };
        try {
            setIsLoading(true);
            const res = await fetch(id ? `/api/kurbans/${id}` : '/api/kurbans', {
                method: id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: payload }),
            });
            const result = await res.json();
            result.data ? showModalSuccess() : showModalError();
        }
        catch (err) {
            console.error(err);
            showModalError();
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleOnKeyDown = (e) => {
        const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
            e.preventDefault();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(design_system_1.Main, { children: [(0, jsx_runtime_1.jsx)(ModalAlert_1.default, { showAlert: showAlert, setShowAlert: setShowAlert, alertData: alertData }), (0, jsx_runtime_1.jsxs)(design_system_1.Box, { padding: {
                    small: ['1rem', '2rem'],
                    medium: ['2rem', '4rem'],
                    large: ['4rem', '18rem'],
                }, children: [(0, jsx_runtime_1.jsxs)(design_system_1.Flex, { alignItems: "center", justifyContent: "space-between", marginBottom: 4, children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { variant: "alpha", children: "Form MTT Penyaluran Hewan Kurban" }), (0, jsx_runtime_1.jsx)(design_system_1.Button, { onClick: () => navigate('/plugins/kurban-distribution'), variant: "success", startIcon: (0, jsx_runtime_1.jsx)(icons_1.ArrowLeft, {}), children: "Kembali" })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), children: [(0, jsx_runtime_1.jsx)(design_system_1.Box, { background: "neutral0", hasRadius: true, shadow: "tableShadow", borderColor: "neutral200", marginTop: 5, paddingBottom: 5, children: (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { padding: [4, 8], gap: 1, direction: "column", alignItems: "flex-start", children: [(0, jsx_runtime_1.jsx)(design_system_1.Box, { width: "50%", paddingTop: 4, children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "province_id", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(Select_1.default, { label: "Provinsi", placeholder: "Pilih Provinsi", data: indonesia_provinces_cities_json_1.default, ...field, onChange: (val) => {
                                                        field.onChange(val);
                                                        setValue('city_id', '');
                                                    }, value: field.value, error: errors.province_id?.message })) }) }), (0, jsx_runtime_1.jsx)(design_system_1.Box, { width: "50%", paddingTop: 4, children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "city_id", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(Select_1.default, { label: "Kota", placeholder: "Pilih Kota", data: cityOptions, disabled: !province_id, ...field, value: field.value, error: errors.city_id?.message })) }) }), (0, jsx_runtime_1.jsxs)(design_system_1.Box, { background: "neutral0", hasRadius: true, shadow: "tableShadow", padding: 7, borderColor: "neutral200", marginTop: 6, style: { width: '100%' }, children: [(0, jsx_runtime_1.jsxs)(design_system_1.Flex, { gap: 4, direction: "row", justifyContent: "flex-start", width: "100%", children: [(0, jsx_runtime_1.jsx)(design_system_1.Box, { width: {
                                                                medium: '30%',
                                                                large: '13%',
                                                            }, children: (0, jsx_runtime_1.jsx)(design_system_1.Typography, { variant: "alpha", fontSize: "16px", children: "Jumlah Kambing / Sapi yang disalurkan" }) }), (0, jsx_runtime_1.jsx)(design_system_1.Box, { width: "25%", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(design_system_1.TextInput, { label: "Jumlah Kambing", type: "text", inputMode: "numeric", ...register('goat_count'), onKeyDown: (e) => handleOnKeyDown(e) }), errors.goat_count?.message && ((0, jsx_runtime_1.jsx)("p", { style: { color: '#D02B20', fontSize: '10px', marginTop: '5px' }, children: errors.goat_count.message }))] }) }), (0, jsx_runtime_1.jsx)(design_system_1.Box, { width: "25%", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(design_system_1.TextInput, { label: "Jumlah Sapi", type: "text", inputMode: "numeric", ...register('cow_count'), onKeyDown: (e) => handleOnKeyDown(e) }), errors.cow_count?.message && ((0, jsx_runtime_1.jsx)("p", { style: { color: '#D02B20', fontSize: '10px', marginTop: '5px' }, children: errors.cow_count.message }))] }) })] }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { gap: 4, direction: "row", justifyContent: "flex-start", width: "100%", marginTop: 6, children: [(0, jsx_runtime_1.jsx)(design_system_1.Box, { width: {
                                                                medium: '30%',
                                                                large: '13%',
                                                            }, children: (0, jsx_runtime_1.jsx)(design_system_1.Typography, { variant: "alpha", fontSize: "16px", children: "Jenis Penyaluran Hewan" }) }), (0, jsx_runtime_1.jsx)(design_system_1.Box, { width: "25%", children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "olahanKaleng", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(design_system_1.Checkbox, { checked: field.value, onCheckedChange: field.onChange, children: "Olahan Kaleng" })) }) }), (0, jsx_runtime_1.jsx)(design_system_1.Box, { width: "25%", children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "dagingSegar", control: control, render: ({ field }) => ((0, jsx_runtime_1.jsx)(design_system_1.Checkbox, { checked: field.value, onCheckedChange: field.onChange, children: "Daging Segar" })) }) })] }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { gap: 4, direction: "row", justifyContent: "flex-start", width: "100%", marginTop: 6, children: [(0, jsx_runtime_1.jsx)(design_system_1.Box, { width: {
                                                                medium: '30%',
                                                                large: '13%',
                                                            }, children: (0, jsx_runtime_1.jsx)(design_system_1.Typography, { variant: "alpha", fontSize: "16px", children: "Jumlah Penerima Manfaat Kurban" }) }), (0, jsx_runtime_1.jsx)(design_system_1.Box, { width: "51.3%", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(design_system_1.TextInput, { label: "Jumlah Penerima", type: "text", inputMode: "numeric", ...register('recipient_count'), onKeyDown: (e) => handleOnKeyDown(e) }), errors.recipient_count?.message && ((0, jsx_runtime_1.jsx)("p", { style: { color: '#D02B20', fontSize: '10px', marginTop: '5px' }, children: errors.recipient_count.message }))] }) })] })] })] }) }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { justifyContent: "end", paddingTop: 6, gap: 4, children: [(0, jsx_runtime_1.jsx)(design_system_1.Button, { variant: "danger-light", onClick: () => navigate('/plugins/kurban-distribution'), children: "Cancel" }), (0, jsx_runtime_1.jsx)(design_system_1.Button, { type: "submit", disabled: isLoading, children: "Submit" })] })] })] })] }));
};
exports.default = KurbanPage;
