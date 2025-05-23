"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const design_system_1 = require("@strapi/design-system");
const icons_1 = require("@strapi/icons");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const moment_1 = __importDefault(require("moment"));
require("moment/locale/id");
const DetailKurbanPage = () => {
    const [data, setData] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    const fetchDetail = async () => {
        if (!id)
            return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/kurbans/${id}`);
            const result = await res.json();
            if (result?.data) {
                setData(result.data);
            }
        }
        catch (err) {
            console.error('Gagal mengambil detail:', err);
        }
        finally {
            setIsLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchDetail();
    }, []);
    const renderDistributionBadges = (typesString) => {
        if (!typesString)
            return null;
        return ((0, jsx_runtime_1.jsx)(design_system_1.Box, { style: {
                display: 'flex',
                gap: '4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }, children: typesString.split(',').map((type, i) => ((0, jsx_runtime_1.jsx)(design_system_1.Box, { background: "success600", hasRadius: true, style: {
                    fontSize: 12,
                    whiteSpace: 'nowrap',
                    color: 'white',
                    padding: '2px 8px',
                }, children: type.trim() }, i))) }));
    };
    const renderDetail = () => {
        return ((0, jsx_runtime_1.jsx)(design_system_1.Box, { background: "neutral0", hasRadius: true, shadow: "tableShadow", padding: 8, children: (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { wrap: "wrap", gap: 4, children: [(0, jsx_runtime_1.jsxs)(design_system_1.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Provinsi" }), (0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", children: data?.province_name })] }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Kota" }), (0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", children: data?.city_name })] }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Jumlah Sapi" }), (0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", children: data?.cow_count })] }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Jumlah Kambing" }), (0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", children: data?.goat_count })] }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 4, children: "Jenis Penyaluran" }), renderDistributionBadges(data?.distribution_types)] }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { direction: "column", width: "32%", hasRadius: true, padding: 4, shadow: "tableShadow", borderColor: "success600", children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Jumlah Penerima" }), (0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", children: data?.recipient_count })] }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { direction: "column", width: "100%", children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Tanggal Dibuat" }), (0, jsx_runtime_1.jsx)(design_system_1.Typography, { fontWeight: "semiBold", children: data?.createdAt ? (0, moment_1.default)(data.createdAt).locale('id').format('LLLL') : '-' })] })] }) }));
    };
    return ((0, jsx_runtime_1.jsx)(design_system_1.Main, { children: (0, jsx_runtime_1.jsxs)(design_system_1.Box, { padding: { small: 4, medium: 6, large: 10 }, children: [(0, jsx_runtime_1.jsxs)(design_system_1.Flex, { alignItems: "center", justifyContent: "space-between", marginBottom: 4, children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { variant: "alpha", fontSize: "20px", children: "Detail Penyaluran Kurban" }), (0, jsx_runtime_1.jsx)(design_system_1.Button, { onClick: () => navigate('/plugins/kurban-distribution'), variant: "success", startIcon: (0, jsx_runtime_1.jsx)(icons_1.ArrowLeft, {}), children: "Kembali" })] }), (() => {
                    if (isLoading) {
                        return (0, jsx_runtime_1.jsx)(design_system_1.Typography, { children: "Memuat data..." });
                    }
                    if (!data) {
                        return (0, jsx_runtime_1.jsx)(design_system_1.Typography, { children: "Data tidak ditemukan." });
                    }
                    return renderDetail();
                })()] }) }));
};
exports.default = DetailKurbanPage;
