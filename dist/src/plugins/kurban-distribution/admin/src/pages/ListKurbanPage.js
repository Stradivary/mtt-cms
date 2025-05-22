"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const design_system_1 = require("@strapi/design-system");
const icons_1 = require("@strapi/icons");
const ModalAlert_1 = __importDefault(require("../components/ModalAlert"));
const LoadingIndicator_1 = __importDefault(require("../components/LoadingIndicator"));
const react_router_dom_1 = require("react-router-dom");
const moment_1 = __importDefault(require("moment"));
const ListKurbanPage = () => {
    const [dataKurban, setDataKurban] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [showAlert, setShowAlert] = (0, react_1.useState)(false);
    const [alertData, setAlertData] = (0, react_1.useState)({
        success: true,
        title: '',
        content: '',
        actionText: 'OK',
        cancelText: 'Cancel',
    });
    const [selectedId, setSelectedId] = (0, react_1.useState)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const showModal = (success, message) => {
        setAlertData({
            success,
            title: success ? 'Information' : 'Warning',
            content: message,
            actionText: 'OK',
        });
        setShowAlert(true);
    };
    const setConfirmDelete = (id) => {
        setSelectedId(id);
        setAlertData({
            success: false,
            title: 'Konfirmasi Hapus',
            content: 'Apakah Anda yakin ingin menghapus data ini?',
            actionText: 'Ya, Hapus',
            cancelText: 'Batal',
            onConfirm: () => {
                if (selectedId !== null)
                    handleDelete(selectedId);
            },
        });
        setShowAlert(true);
    };
    const getListKurban = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/kurbans');
            const result = await res.json();
            if (result?.data) {
                setDataKurban(result.data);
            }
            else {
                showModal(false, 'Gagal mengambil data');
            }
            setIsLoading(false);
        }
        catch (err) {
            console.error('get data error:', err);
            showModal(false, 'Terjadi kesalahan saat mengambil data');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/kurbans/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showModal(true, 'Data berhasil dihapus');
                await getListKurban();
            }
            else {
                const errorData = await res.json().catch(() => ({ message: 'Gagal menghapus data' }));
                const errorMessage = errorData?.message ?? 'Gagal menghapus data';
                showModal(false, errorMessage);
            }
        }
        catch (err) {
            console.error('delete error:', err);
            showModal(false, 'Terjadi kesalahan saat menghapus data');
        }
        finally {
            setIsLoading(false);
        }
    };
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
                    fontSize: 8,
                    whiteSpace: 'nowrap',
                    color: 'white',
                    padding: '2px 8px',
                }, children: type.trim() }, i))) }));
    };
    (0, react_1.useEffect)(() => {
        getListKurban();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(design_system_1.Main, { children: [(0, jsx_runtime_1.jsx)(ModalAlert_1.default, { showAlert: showAlert, setShowAlert: setShowAlert, alertData: alertData }), isLoading && (0, jsx_runtime_1.jsx)(LoadingIndicator_1.default, {}), (0, jsx_runtime_1.jsxs)(design_system_1.Box, { padding: { small: 4, medium: 6, large: 10 }, gap: 4, children: [(0, jsx_runtime_1.jsx)(design_system_1.Typography, { variant: "alpha", fontSize: "20px", children: "MTT Penyaluran Hewan Kurban" }), (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { justifyContent: "end", paddingTop: 6, gap: 4, children: [(0, jsx_runtime_1.jsx)(design_system_1.Button, { variant: "success", onClick: getListKurban, startIcon: (0, jsx_runtime_1.jsx)(icons_1.ArrowsCounterClockwise, {}), children: "Refresh" }), (0, jsx_runtime_1.jsx)(design_system_1.Button, { onClick: () => navigate(`/plugins/kurban-distribution/add`), children: "Add" })] }), (0, jsx_runtime_1.jsxs)(design_system_1.Box, { background: "neutral0", hasRadius: true, shadow: "tableShadow", borderColor: "neutral200", marginTop: 5, padding: 6, paddingBottom: 8, children: [(0, jsx_runtime_1.jsx)(design_system_1.Box, { marginBottom: 4, children: (0, jsx_runtime_1.jsx)(design_system_1.Typography, { variant: "alpha", fontSize: "20px", children: "Data Penyaluran Hewan Kurban" }) }), (0, jsx_runtime_1.jsxs)(design_system_1.Table, { colCount: 7, rowCount: dataKurban.length || 0, marginBottom: 4, padding: 0, children: [(0, jsx_runtime_1.jsx)(design_system_1.Thead, { children: (0, jsx_runtime_1.jsxs)(design_system_1.Tr, { children: [(0, jsx_runtime_1.jsx)(design_system_1.Th, { width: "14%", textColor: "primary700", children: "Provinsi" }), (0, jsx_runtime_1.jsx)(design_system_1.Th, { width: "14%", textColor: "primary700", children: "Kota" }), (0, jsx_runtime_1.jsx)(design_system_1.Th, { textColor: "primary700", children: "Sapi" }), (0, jsx_runtime_1.jsx)(design_system_1.Th, { textColor: "primary700", children: "Kambing" }), (0, jsx_runtime_1.jsx)(design_system_1.Th, { textColor: "primary700", textAlign: "center", style: {
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }, children: (0, jsx_runtime_1.jsx)("span", { children: "Jenis Penyaluran" }) }), (0, jsx_runtime_1.jsx)(design_system_1.Th, { textColor: "primary700", children: "Penerima" }), (0, jsx_runtime_1.jsx)(design_system_1.Th, { textColor: "primary700", children: "Tanggal" }), (0, jsx_runtime_1.jsx)(design_system_1.Th, { style: {
                                                        textAlign: 'center',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }, textColor: "primary700", children: "Aksi" })] }) }), (0, jsx_runtime_1.jsx)(design_system_1.Tbody, { children: !isLoading && dataKurban.length > 0 ? (dataKurban.map((item, index) => ((0, jsx_runtime_1.jsxs)(design_system_1.Tr, { background: index % 2 === 0 ? 'neutral0' : 'neutral100', children: [(0, jsx_runtime_1.jsx)(design_system_1.Td, { children: item?.province_name ?? '-' }), (0, jsx_runtime_1.jsx)(design_system_1.Td, { children: item?.city_name ?? '-' }), (0, jsx_runtime_1.jsx)(design_system_1.Td, { children: item?.cow_count ?? '0' }), (0, jsx_runtime_1.jsx)(design_system_1.Td, { children: item?.goat_count ?? '0' }), (0, jsx_runtime_1.jsx)(design_system_1.Td, { style: { maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis' }, children: renderDistributionBadges(item?.distribution_types) }), (0, jsx_runtime_1.jsx)(design_system_1.Td, { children: item?.recipient_count ?? '0' }), (0, jsx_runtime_1.jsx)(design_system_1.Td, { children: item?.createdAt ? (0, moment_1.default)(item.createdAt).locale('id').format('LL') : '-' }), (0, jsx_runtime_1.jsx)(design_system_1.Td, { children: (0, jsx_runtime_1.jsxs)(design_system_1.Flex, { gap: 2, justifyContent: "end", children: [(0, jsx_runtime_1.jsx)(design_system_1.Button, { onClick: () => navigate(`/plugins/kurban-distribution/detail?id=${item.documentId}`), width: "30px", variant: "tertiary", "aria-label": "Lihat", title: "Lihat Detail", children: (0, jsx_runtime_1.jsx)(icons_1.Eye, { style: { marginTop: '4px' } }) }), (0, jsx_runtime_1.jsx)(design_system_1.Button, { onClick: () => navigate(`/plugins/kurban-distribution/add?id=${item.documentId}`), variant: "tertiary", width: "30px", "aria-label": "Edit", title: "Edit Data", children: (0, jsx_runtime_1.jsx)(icons_1.Pencil, { style: { marginTop: '4px' } }) }), (0, jsx_runtime_1.jsx)(design_system_1.Button, { width: "30px", onClick: () => setConfirmDelete(item.documentId), variant: "danger", "aria-label": "Hapus", title: "Hapus Data", children: (0, jsx_runtime_1.jsx)(icons_1.Trash, { style: { marginTop: '4px' } }) })] }) })] }, item.id)))) : ((0, jsx_runtime_1.jsx)(design_system_1.Tr, { children: (0, jsx_runtime_1.jsx)(design_system_1.Td, { colSpan: 7, style: { textAlign: 'center' }, children: (0, jsx_runtime_1.jsx)(design_system_1.Typography, { variant: "omega", textColor: "neutral600", padding: 4, children: "Tidak ada data" }) }) })) })] })] })] })] }));
};
exports.default = ListKurbanPage;
