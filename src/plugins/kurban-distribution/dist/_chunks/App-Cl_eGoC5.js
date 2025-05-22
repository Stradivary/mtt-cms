"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const React = require("react");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const moment = require("moment");
const reactHookForm = require("react-hook-form");
const zod$1 = require("@hookform/resolvers/zod");
const zod = require("zod");
require("moment/locale/id");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const React__default = /* @__PURE__ */ _interopDefault(React);
const moment__default = /* @__PURE__ */ _interopDefault(moment);
const ModalAlertComponent = ({ showAlert, setShowAlert, alertData }) => {
  const {
    success = true,
    title = "",
    content = "",
    actionText = "OK",
    cancelText = "",
    onConfirm
  } = alertData;
  const handleConfirm = () => {
    onConfirm?.();
    setShowAlert(false);
  };
  const handleCancel = () => {
    setShowAlert(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: showAlert, onOpenChange: setShowAlert, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Header, { children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Dialog.Body,
      {
        icon: success ? /* @__PURE__ */ jsxRuntime.jsx(icons.CheckCircle, { fill: "success600" }) : /* @__PURE__ */ jsxRuntime.jsx(icons.WarningCircle, { fill: "danger600" }),
        children: content
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Footer, { children: [
      cancelText && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Action, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { fullWidth: true, variant: "secondary", onClick: handleCancel, children: cancelText }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Action, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          fullWidth: true,
          variant: success ? "success-light" : "danger-light",
          onClick: handleConfirm,
          children: actionText
        }
      ) })
    ] })
  ] }) });
};
const LoadingIndicator = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 5, style: { textAlign: "center", height: "40px" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: "Memuat data..." }) });
};
const ListKurbanPage = () => {
  const [dataKurban, setDataKurban] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertData, setAlertData] = React.useState({
    success: true,
    title: "",
    content: "",
    actionText: "OK",
    cancelText: "Cancel"
  });
  const [selectedId, setSelectedId] = React.useState(null);
  const navigate = reactRouterDom.useNavigate();
  const showModal = (success, message) => {
    setAlertData({
      success,
      title: success ? "Information" : "Warning",
      content: message,
      actionText: "OK"
    });
    setShowAlert(true);
  };
  const setConfirmDelete = (id) => {
    setSelectedId(id);
    setAlertData({
      success: false,
      title: "Konfirmasi Hapus",
      content: "Apakah Anda yakin ingin menghapus data ini?",
      actionText: "Ya, Hapus",
      cancelText: "Batal",
      onConfirm: () => {
        if (selectedId !== null) handleDelete(selectedId);
      }
    });
    setShowAlert(true);
  };
  const getListKurban = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/kurbans");
      const result = await res.json();
      if (result?.data) {
        setDataKurban(result.data);
      } else {
        showModal(false, "Gagal mengambil data");
      }
      setIsLoading(false);
    } catch (err) {
      console.error("get data error:", err);
      showModal(false, "Terjadi kesalahan saat mengambil data");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/kurbans/${id}`, { method: "DELETE" });
      if (res.ok) {
        showModal(true, "Data berhasil dihapus");
        await getListKurban();
      } else {
        const errorData = await res.json().catch(() => ({ message: "Gagal menghapus data" }));
        const errorMessage = errorData?.message ?? "Gagal menghapus data";
        showModal(false, errorMessage);
      }
    } catch (err) {
      console.error("delete error:", err);
      showModal(false, "Terjadi kesalahan saat menghapus data");
    } finally {
      setIsLoading(false);
    }
  };
  const renderDistributionBadges = (typesString) => {
    if (!typesString) return null;
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Box,
      {
        style: {
          display: "flex",
          gap: "4px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
        children: typesString.split(",").map((type, i) => /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Box,
          {
            background: "success600",
            hasRadius: true,
            style: {
              fontSize: 8,
              whiteSpace: "nowrap",
              color: "white",
              padding: "2px 8px"
            },
            children: type.trim()
          },
          i
        ))
      }
    );
  };
  React.useEffect(() => {
    getListKurban();
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ModalAlertComponent, { showAlert, setShowAlert, alertData }),
    isLoading && /* @__PURE__ */ jsxRuntime.jsx(LoadingIndicator, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { padding: { small: 4, medium: 6, large: 10 }, gap: 4, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", fontSize: "20px", children: "MTT Penyaluran Hewan Kurban" }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "end", paddingTop: 6, gap: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "success", onClick: getListKurban, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowsCounterClockwise, {}), children: "Refresh" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: () => navigate(`/plugins/kurban-distribution/add`), children: "Add" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Box,
        {
          background: "neutral0",
          hasRadius: true,
          shadow: "tableShadow",
          borderColor: "neutral200",
          marginTop: 5,
          padding: 6,
          paddingBottom: 8,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", fontSize: "20px", children: "Data Penyaluran Hewan Kurban" }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 7, rowCount: dataKurban.length || 0, marginBottom: 4, padding: 0, children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { width: "14%", textColor: "primary700", children: "Provinsi" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { width: "14%", textColor: "primary700", children: "Kota" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { textColor: "primary700", children: "Sapi" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { textColor: "primary700", children: "Kambing" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Th,
                  {
                    textColor: "primary700",
                    textAlign: "center",
                    style: {
                      textAlign: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    },
                    children: /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Jenis Penyaluran" })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { textColor: "primary700", children: "Penerima" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { textColor: "primary700", children: "Tanggal" }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Th,
                  {
                    style: {
                      textAlign: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                    },
                    textColor: "primary700",
                    children: "Aksi"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: !isLoading && dataKurban.length > 0 ? dataKurban.map((item, index) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { background: index % 2 === 0 ? "neutral0" : "neutral100", children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: item?.province_name ?? "-" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: item?.city_name ?? "-" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: item?.cow_count ?? "0" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: item?.goat_count ?? "0" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { style: { maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis" }, children: renderDistributionBadges(item?.distribution_types) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: item?.recipient_count ?? "0" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: item?.createdAt ? moment__default.default(item.createdAt).locale("id").format("LL") : "-" }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, justifyContent: "end", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Button,
                    {
                      onClick: () => navigate(`/plugins/kurban-distribution/detail?id=${item.documentId}`),
                      width: "30px",
                      variant: "tertiary",
                      "aria-label": "Lihat",
                      title: "Lihat Detail",
                      children: /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, { style: { marginTop: "4px" } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Button,
                    {
                      onClick: () => navigate(`/plugins/kurban-distribution/add?id=${item.documentId}`),
                      variant: "tertiary",
                      width: "30px",
                      "aria-label": "Edit",
                      title: "Edit Data",
                      children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, { style: { marginTop: "4px" } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Button,
                    {
                      width: "30px",
                      onClick: () => setConfirmDelete(item.documentId),
                      variant: "danger",
                      "aria-label": "Hapus",
                      title: "Hapus Data",
                      children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, { style: { marginTop: "4px" } })
                    }
                  )
                ] }) })
              ] }, item.id)) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tr, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { colSpan: 7, style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral600", padding: 4, children: "Tidak ada data" }) }) }) })
            ] })
          ]
        }
      )
    ] })
  ] });
};
const SelectComponent = ({ label, error, hint, placeholder, data, ...props }) => {
  const selectRef = React__default.default.useRef(null);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { error, hint, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelect, { ref: selectRef, placeholder: placeholder ?? "Pilih", error, ...props, children: data && data?.length > 0 && data.map((item) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: item.id, children: item.name }, item.id)) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {}),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
  ] });
};
const provincesData = [
  {
    id: "11",
    name: "Aceh",
    cities: [
      {
        id: "1101",
        name: "Kabupaten Simeulue"
      },
      {
        id: "1102",
        name: "Kabupaten Aceh Singkil"
      },
      {
        id: "1171",
        name: "Kota Banda Aceh"
      },
      {
        id: "1172",
        name: "Kota Sabang"
      }
    ]
  },
  {
    id: "12",
    name: "Sumatera Utara",
    cities: [
      {
        id: "1201",
        name: "Kabupaten Nias"
      },
      {
        id: "1202",
        name: "Kabupaten Mandailing Natal"
      },
      {
        id: "1203",
        name: "Kabupaten Tapanuli Selatan"
      },
      {
        id: "1271",
        name: "Kota Medan"
      },
      {
        id: "1272",
        name: "Kota Pematangsiantar"
      }
    ]
  },
  {
    id: "13",
    name: "Sumatera Barat",
    cities: [
      {
        id: "1301",
        name: "Kabupaten Kepulauan Mentawai"
      },
      {
        id: "1302",
        name: "Kabupaten Pesisir Selatan"
      },
      {
        id: "1303",
        name: "Kabupaten Solok"
      },
      {
        id: "1371",
        name: "Kota Padang"
      },
      {
        id: "1372",
        name: "Kota Solok"
      }
    ]
  },
  {
    id: "14",
    name: "Riau",
    cities: [
      {
        id: "1401",
        name: "Kabupaten Kampar"
      },
      {
        id: "1402",
        name: "Kabupaten Indragiri Hulu"
      },
      {
        id: "1403",
        name: "Kabupaten Bengkalis"
      },
      {
        id: "1471",
        name: "Kota Pekanbaru"
      },
      {
        id: "1472",
        name: "Kota Dumai"
      }
    ]
  },
  {
    id: "15",
    name: "Jambi",
    cities: [
      {
        id: "1501",
        name: "Kabupaten Kerinci"
      },
      {
        id: "1502",
        name: "Kabupaten Merangin"
      },
      {
        id: "1503",
        name: "Kabupaten Bungo"
      },
      {
        id: "1571",
        name: "Kota Jambi"
      },
      {
        id: "1572",
        name: "Kota Sungai Penuh"
      }
    ]
  },
  {
    id: "16",
    name: "Sumatera Selatan",
    cities: [
      {
        id: "1601",
        name: "Kabupaten Ogan Komering Ulu"
      },
      {
        id: "1602",
        name: "Kabupaten Ogan Komering Ilir"
      },
      {
        id: "1603",
        name: "Kabupaten Muara Enim"
      },
      {
        id: "1671",
        name: "Kota Palembang"
      },
      {
        id: "1672",
        name: "Kota Pagar Alam"
      }
    ]
  },
  {
    id: "17",
    name: "Bengkulu",
    cities: [
      {
        id: "1701",
        name: "Kabupaten Bengkulu Utara"
      },
      {
        id: "1702",
        name: "Kabupaten Rejang Lebong"
      },
      {
        id: "1703",
        name: "Kabupaten Kepahiang"
      },
      {
        id: "1771",
        name: "Kota Bengkulu"
      }
    ]
  },
  {
    id: "18",
    name: "Lampung",
    cities: [
      {
        id: "1801",
        name: "Kabupaten Lampung Barat"
      },
      {
        id: "1802",
        name: "Kabupaten Tanggamus"
      },
      {
        id: "1803",
        name: "Kabupaten Lampung Selatan"
      },
      {
        id: "1871",
        name: "Kota Bandar Lampung"
      }
    ]
  },
  {
    id: "19",
    name: "Kepulauan Bangka Belitung",
    cities: [
      {
        id: "1901",
        name: "Kabupaten Bangka"
      },
      {
        id: "1902",
        name: "Kabupaten Belitung"
      },
      {
        id: "1971",
        name: "Kota Pangkal Pinang"
      }
    ]
  },
  {
    id: "21",
    name: "Kepulauan Riau",
    cities: [
      {
        id: "2101",
        name: "Kabupaten Bintan"
      },
      {
        id: "2102",
        name: "Kabupaten Karimun"
      },
      {
        id: "2103",
        name: "Kabupaten Lingga"
      },
      {
        id: "2171",
        name: "Kota Batam"
      },
      {
        id: "2172",
        name: "Kota Tanjung Pinang"
      }
    ]
  },
  {
    id: "31",
    name: "DKI Jakarta",
    cities: [
      {
        id: "3171",
        name: "Kota Jakarta Pusat"
      },
      {
        id: "3172",
        name: "Kota Jakarta Utara"
      },
      {
        id: "3173",
        name: "Kota Jakarta Barat"
      },
      {
        id: "3174",
        name: "Kota Jakarta Selatan"
      },
      {
        id: "3175",
        name: "Kota Jakarta Timur"
      }
    ]
  },
  {
    id: "32",
    name: "Jawa Barat",
    cities: [
      {
        id: "3201",
        name: "Kabupaten Bogor"
      },
      {
        id: "3202",
        name: "Kabupaten Sukabumi"
      },
      {
        id: "3203",
        name: "Kabupaten Cianjur"
      },
      {
        id: "3271",
        name: "Kota Bandung"
      },
      {
        id: "3272",
        name: "Kota Bekasi"
      }
    ]
  },
  {
    id: "33",
    name: "Jawa Tengah",
    cities: [
      {
        id: "3301",
        name: "Kabupaten Cilacap"
      },
      {
        id: "3302",
        name: "Kabupaten Banyumas"
      },
      {
        id: "3303",
        name: "Kabupaten Purbalingga"
      },
      {
        id: "3371",
        name: "Kota Semarang"
      },
      {
        id: "3372",
        name: "Kota Surakarta"
      }
    ]
  },
  {
    id: "34",
    name: "DI Yogyakarta",
    cities: [
      {
        id: "3471",
        name: "Kota Yogyakarta"
      },
      {
        id: "3401",
        name: "Kabupaten Bantul"
      },
      {
        id: "3402",
        name: "Kabupaten Sleman"
      }
    ]
  },
  {
    id: "35",
    name: "Jawa Timur",
    cities: [
      {
        id: "3501",
        name: "Kabupaten Banyuwangi"
      },
      {
        id: "3502",
        name: "Kabupaten Jember"
      },
      {
        id: "3503",
        name: "Kabupaten Malang"
      },
      {
        id: "3571",
        name: "Kota Surabaya"
      },
      {
        id: "3572",
        name: "Kota Malang"
      }
    ]
  },
  {
    id: "36",
    name: "Banten",
    cities: [
      {
        id: "3601",
        name: "Kabupaten Lebak"
      },
      {
        id: "3602",
        name: "Kabupaten Pandeglang"
      },
      {
        id: "3603",
        name: "Kabupaten Tangerang"
      },
      {
        id: "3671",
        name: "Kota Serang"
      },
      {
        id: "3672",
        name: "Kota Tangerang"
      }
    ]
  },
  {
    id: "51",
    name: "Bali",
    cities: [
      {
        id: "5101",
        name: "Kabupaten Badung"
      },
      {
        id: "5102",
        name: "Kabupaten Gianyar"
      },
      {
        id: "5103",
        name: "Kabupaten Karangasem"
      },
      {
        id: "5171",
        name: "Kota Denpasar"
      }
    ]
  },
  {
    id: "52",
    name: "Nusa Tenggara Barat",
    cities: [
      {
        id: "5201",
        name: "Kabupaten Lombok Barat"
      },
      {
        id: "5202",
        name: "Kabupaten Lombok Tengah"
      },
      {
        id: "5203",
        name: "Kabupaten Lombok Timur"
      },
      {
        id: "5204",
        name: "Kabupaten Sumbawa"
      },
      {
        id: "5205",
        name: "Kabupaten Sumbawa Barat"
      },
      {
        id: "5206",
        name: "Kabupaten Dompu"
      },
      {
        id: "5207",
        name: "Kabupaten Bima"
      },
      {
        id: "5271",
        name: "Kota Mataram"
      },
      {
        id: "5272",
        name: "Kota Bima"
      }
    ]
  },
  {
    id: "53",
    name: "Nusa Tenggara Timur",
    cities: [
      {
        id: "5301",
        name: "Kabupaten Kupang"
      },
      {
        id: "5302",
        name: "Kabupaten Timor Tengah Selatan"
      },
      {
        id: "5303",
        name: "Kabupaten Timor Tengah Utara"
      },
      {
        id: "5304",
        name: "Kabupaten Belu"
      },
      {
        id: "5305",
        name: "Kabupaten Alor"
      },
      {
        id: "5306",
        name: "Kabupaten Flores Timur"
      },
      {
        id: "5307",
        name: "Kabupaten Sikka"
      },
      {
        id: "5308",
        name: "Kabupaten Ende"
      },
      {
        id: "5309",
        name: "Kabupaten Ngada"
      },
      {
        id: "5310",
        name: "Kabupaten Manggarai"
      },
      {
        id: "5311",
        name: "Kabupaten Rote Ndao"
      },
      {
        id: "5312",
        name: "Kabupaten Manggarai Barat"
      },
      {
        id: "5313",
        name: "Kabupaten Nagekeo"
      },
      {
        id: "5314",
        name: "Kabupaten Sumba Timur"
      },
      {
        id: "5315",
        name: "Kabupaten Sumba Barat"
      },
      {
        id: "5316",
        name: "Kabupaten Lembata"
      },
      {
        id: "5317",
        name: "Kabupaten Sabu Raijua"
      },
      {
        id: "5371",
        name: "Kota Kupang"
      }
    ]
  },
  {
    id: "61",
    name: "Kalimantan Barat",
    cities: [
      {
        id: "6101",
        name: "Kabupaten Sambas"
      },
      {
        id: "6102",
        name: "Kabupaten Bengkayang"
      },
      {
        id: "6103",
        name: "Kabupaten Landak"
      },
      {
        id: "6104",
        name: "Kabupaten Pontianak"
      },
      {
        id: "6105",
        name: "Kabupaten Kubu Raya"
      },
      {
        id: "6106",
        name: "Kabupaten Ketapang"
      },
      {
        id: "6171",
        name: "Kota Pontianak"
      },
      {
        id: "6172",
        name: "Kota Singkawang"
      }
    ]
  },
  {
    id: "62",
    name: "Kalimantan Tengah",
    cities: [
      {
        id: "6201",
        name: "Kabupaten Kapuas"
      },
      {
        id: "6202",
        name: "Kabupaten Gunung Mas"
      },
      {
        id: "6203",
        name: "Kabupaten Barito Selatan"
      },
      {
        id: "6204",
        name: "Kabupaten Barito Timur"
      },
      {
        id: "6205",
        name: "Kabupaten Barito Utara"
      },
      {
        id: "6206",
        name: "Kabupaten Katingan"
      },
      {
        id: "6207",
        name: "Kabupaten Pulang Pisau"
      },
      {
        id: "6208",
        name: "Kabupaten Murung Raya"
      },
      {
        id: "6271",
        name: "Kota Palangka Raya"
      }
    ]
  },
  {
    id: "63",
    name: "Kalimantan Selatan",
    cities: [
      {
        id: "6301",
        name: "Kabupaten Balangan"
      },
      {
        id: "6302",
        name: "Kabupaten Banjar"
      },
      {
        id: "6303",
        name: "Kabupaten Barito Kuala"
      },
      {
        id: "6304",
        name: "Kabupaten Hulu Sungai Selatan"
      },
      {
        id: "6305",
        name: "Kabupaten Hulu Sungai Tengah"
      },
      {
        id: "6306",
        name: "Kabupaten Hulu Sungai Utara"
      },
      {
        id: "6307",
        name: "Kabupaten Tabalong"
      },
      {
        id: "6308",
        name: "Kabupaten Tanah Bumbu"
      },
      {
        id: "6309",
        name: "Kabupaten Tapin"
      },
      {
        id: "6371",
        name: "Kota Banjarmasin"
      },
      {
        id: "6372",
        name: "Kota Banjarbaru"
      }
    ]
  },
  {
    id: "64",
    name: "Kalimantan Timur",
    cities: [
      {
        id: "6401",
        name: "Kabupaten Berau"
      },
      {
        id: "6402",
        name: "Kabupaten Kutai Barat"
      },
      {
        id: "6403",
        name: "Kabupaten Kutai Kartanegara"
      },
      {
        id: "6404",
        name: "Kabupaten Kutai Timur"
      },
      {
        id: "6405",
        name: "Kabupaten Paser"
      },
      {
        id: "6409",
        name: "Kabupaten Mahakam Ulu"
      },
      {
        id: "6471",
        name: "Kota Balikpapan"
      },
      {
        id: "6472",
        name: "Kota Samarinda"
      }
    ]
  },
  {
    id: "65",
    name: "Kalimantan Utara",
    cities: [
      {
        id: "6501",
        name: "Kabupaten Bulungan"
      },
      {
        id: "6502",
        name: "Kabupaten Malinau"
      },
      {
        id: "6503",
        name: "Kabupaten Nunukan"
      },
      {
        id: "6571",
        name: "Kota Tarakan"
      }
    ]
  },
  {
    id: "71",
    name: "Sulawesi Utara",
    cities: [
      {
        id: "7101",
        name: "Kabupaten Bolaang Mongondow"
      },
      {
        id: "7102",
        name: "Kabupaten Minahasa"
      },
      {
        id: "7103",
        name: "Kabupaten Kepulauan Sangihe"
      },
      {
        id: "7104",
        name: "Kabupaten Kepulauan Talaud"
      },
      {
        id: "7105",
        name: "Kabupaten Minahasa Selatan"
      },
      {
        id: "7106",
        name: "Kabupaten Minahasa Tenggara"
      },
      {
        id: "7107",
        name: "Kabupaten Bolaang Mongondow Utara"
      },
      {
        id: "7108",
        name: "Kabupaten Bolaang Mongondow Selatan"
      },
      {
        id: "7109",
        name: "Kabupaten Kepulauan Siau Tagulandang Biaro"
      },
      {
        id: "7171",
        name: "Kota Manado"
      },
      {
        id: "7172",
        name: "Kota Bitung"
      },
      {
        id: "7173",
        name: "Kota Tomohon"
      },
      {
        id: "7174",
        name: "Kota Kotamobagu"
      }
    ]
  },
  {
    id: "72",
    name: "Sulawesi Tengah",
    cities: [
      {
        id: "7201",
        name: "Kabupaten Banggai"
      },
      {
        id: "7202",
        name: "Kabupaten Morowali"
      },
      {
        id: "7203",
        name: "Kabupaten Poso"
      },
      {
        id: "7204",
        name: "Kabupaten Donggala"
      },
      {
        id: "7205",
        name: "Kabupaten Toli-Toli"
      },
      {
        id: "7206",
        name: "Kabupaten Buol"
      },
      {
        id: "7207",
        name: "Kabupaten Parigi Moutong"
      },
      {
        id: "7208",
        name: "Kabupaten Tojo Una-Una"
      },
      {
        id: "7209",
        name: "Kabupaten Sigi"
      },
      {
        id: "7271",
        name: "Kota Palu"
      }
    ]
  },
  {
    id: "73",
    name: "Sulawesi Selatan",
    cities: [
      {
        id: "7301",
        name: "Kabupaten Kepulauan Selayar"
      },
      {
        id: "7302",
        name: "Kabupaten Bulukumba"
      },
      {
        id: "7303",
        name: "Kabupaten Bantaeng"
      },
      {
        id: "7304",
        name: "Kabupaten Jeneponto"
      },
      {
        id: "7305",
        name: "Kabupaten Takalar"
      },
      {
        id: "7306",
        name: "Kabupaten Gowa"
      },
      {
        id: "7307",
        name: "Kabupaten Sinjai"
      },
      {
        id: "7308",
        name: "Kabupaten Maros"
      },
      {
        id: "7309",
        name: "Kabupaten Pangkajene dan Kepulauan"
      },
      {
        id: "7310",
        name: "Kabupaten Barru"
      },
      {
        id: "7311",
        name: "Kabupaten Bone"
      },
      {
        id: "7312",
        name: "Kabupaten Soppeng"
      },
      {
        id: "7313",
        name: "Kabupaten Wajo"
      },
      {
        id: "7314",
        name: "Kabupaten Sidrap"
      },
      {
        id: "7315",
        name: "Kabupaten Pinrang"
      },
      {
        id: "7316",
        name: "Kabupaten Enrekang"
      },
      {
        id: "7317",
        name: "Kabupaten Luwu"
      },
      {
        id: "7318",
        name: "Kabupaten Tana Toraja"
      },
      {
        id: "7319",
        name: "Kabupaten Luwu Utara"
      },
      {
        id: "7320",
        name: "Kabupaten Luwu Timur"
      },
      {
        id: "7321",
        name: "Kabupaten Toraja Utara"
      },
      {
        id: "7371",
        name: "Kota Makassar"
      },
      {
        id: "7372",
        name: "Kota Parepare"
      },
      {
        id: "7373",
        name: "Kota Palopo"
      }
    ]
  },
  {
    id: "74",
    name: "Sulawesi Tenggara",
    cities: [
      {
        id: "7401",
        name: "Kabupaten Buton"
      },
      {
        id: "7402",
        name: "Kabupaten Muna"
      },
      {
        id: "7403",
        name: "Kabupaten Konawe"
      },
      {
        id: "7404",
        name: "Kabupaten Kolaka"
      },
      {
        id: "7405",
        name: "Kabupaten Konawe Selatan"
      },
      {
        id: "7406",
        name: "Kabupaten Bombana"
      },
      {
        id: "7407",
        name: "Kabupaten Wakatobi"
      },
      {
        id: "7408",
        name: "Kabupaten Kolaka Utara"
      },
      {
        id: "7409",
        name: "Kabupaten Konawe Utara"
      },
      {
        id: "7410",
        name: "Kabupaten Buton Utara"
      },
      {
        id: "7411",
        name: "Kabupaten Konawe Kepulauan"
      },
      {
        id: "7471",
        name: "Kota Kendari"
      },
      {
        id: "7472",
        name: "Kota Bau-Bau"
      }
    ]
  },
  {
    id: "75",
    name: "Gorontalo",
    cities: [
      {
        id: "7501",
        name: "Kabupaten Boalemo"
      },
      {
        id: "7502",
        name: "Kabupaten Gorontalo"
      },
      {
        id: "7503",
        name: "Kabupaten Pohuwato"
      },
      {
        id: "7504",
        name: "Kabupaten Bone Bolango"
      },
      {
        id: "7571",
        name: "Kota Gorontalo"
      }
    ]
  },
  {
    id: "76",
    name: "Sulawesi Barat",
    cities: [
      {
        id: "7601",
        name: "Kabupaten Mamasa"
      },
      {
        id: "7602",
        name: "Kabupaten Mamuju"
      },
      {
        id: "7603",
        name: "Kabupaten Majene"
      },
      {
        id: "7604",
        name: "Kabupaten Polewali Mandar"
      }
    ]
  },
  {
    id: "81",
    name: "Maluku",
    cities: [
      {
        id: "8101",
        name: "Kabupaten Maluku Tenggara Barat"
      },
      {
        id: "8102",
        name: "Kabupaten Maluku Tenggara"
      },
      {
        id: "8103",
        name: "Kabupaten Maluku Tengah"
      },
      {
        id: "8104",
        name: "Kabupaten Buru"
      },
      {
        id: "8105",
        name: "Kabupaten Seram Bagian Barat"
      },
      {
        id: "8106",
        name: "Kabupaten Seram Bagian Timur"
      },
      {
        id: "8107",
        name: "Kabupaten Maluku Barat Daya"
      },
      {
        id: "8108",
        name: "Kabupaten Buru Selatan"
      },
      {
        id: "8171",
        name: "Kota Ambon"
      },
      {
        id: "8172",
        name: "Kota Tual"
      }
    ]
  },
  {
    id: "82",
    name: "Maluku Utara",
    cities: [
      {
        id: "8201",
        name: "Kabupaten Halmahera Barat"
      },
      {
        id: "8202",
        name: "Kabupaten Halmahera Tengah"
      },
      {
        id: "8203",
        name: "Kabupaten Halmahera Selatan"
      },
      {
        id: "8204",
        name: "Kabupaten Halmahera Utara"
      },
      {
        id: "8205",
        name: "Kabupaten Kepulauan Sula"
      },
      {
        id: "8206",
        name: "Kabupaten Halmahera Timur"
      },
      {
        id: "8271",
        name: "Kota Ternate"
      },
      {
        id: "8272",
        name: "Kota Tidore Kepulauan"
      }
    ]
  },
  {
    id: "91",
    name: "Papua Barat",
    cities: [
      {
        id: "9101",
        name: "Kabupaten Fakfak"
      },
      {
        id: "9102",
        name: "Kabupaten Kaimana"
      },
      {
        id: "9103",
        name: "Kabupaten Teluk Wondama"
      },
      {
        id: "9104",
        name: "Kabupaten Teluk Bintuni"
      },
      {
        id: "9105",
        name: "Kabupaten Manokwari"
      },
      {
        id: "9106",
        name: "Kabupaten Sorong Selatan"
      },
      {
        id: "9107",
        name: "Kabupaten Raja Ampat"
      },
      {
        id: "9108",
        name: "Kabupaten Tambrauw"
      },
      {
        id: "9109",
        name: "Kabupaten Maybrat"
      },
      {
        id: "9171",
        name: "Kota Sorong"
      }
    ]
  },
  {
    id: "94",
    name: "Papua",
    cities: [
      {
        id: "9408",
        name: "Kabupaten Kepulauan Yapen"
      },
      {
        id: "9409",
        name: "Kabupaten Biak Numfor"
      },
      {
        id: "9471",
        name: "Kota Jayapura"
      }
    ]
  },
  {
    id: "97",
    name: "Papua Selatan",
    cities: [
      {
        id: "9701",
        name: "Kabupaten Merauke"
      },
      {
        id: "9702",
        name: "Kabupaten Mappi"
      },
      {
        id: "9703",
        name: "Kabupaten Asmat"
      },
      {
        id: "9704",
        name: "Kabupaten Boven Digoel"
      },
      {
        id: "9705",
        name: "Kabupaten Mamberamo Raya"
      },
      {
        id: "9706",
        name: "Kabupaten Puncak"
      }
    ]
  },
  {
    id: "98",
    name: "Papua Tengah",
    cities: [
      {
        id: "9801",
        name: "Kabupaten Nabire"
      },
      {
        id: "9802",
        name: "Kabupaten Paniai"
      },
      {
        id: "9803",
        name: "Kabupaten Dogiyai"
      },
      {
        id: "9804",
        name: "Kabupaten Deiyai"
      },
      {
        id: "9805",
        name: "Kabupaten Mimika"
      },
      {
        id: "9806",
        name: "Kabupaten Intan Jaya"
      },
      {
        id: "9807",
        name: "Kabupaten Puncak Jaya"
      }
    ]
  },
  {
    id: "99",
    name: "Papua Pegunungan",
    cities: [
      {
        id: "9901",
        name: "Kabupaten Jayawijaya"
      },
      {
        id: "9902",
        name: "Kabupaten Lanny Jaya"
      },
      {
        id: "9903",
        name: "Kabupaten Tolikara"
      },
      {
        id: "9904",
        name: "Kabupaten Yahukimo"
      },
      {
        id: "9905",
        name: "Kabupaten Pegunungan Bintang"
      }
    ]
  },
  {
    id: "100",
    name: "Papua Barat Daya",
    cities: [
      {
        id: "10001",
        name: "Kabupaten Fakfak"
      },
      {
        id: "10002",
        name: "Kabupaten Kaimana"
      },
      {
        id: "10003",
        name: "Kabupaten Teluk Bintuni"
      },
      {
        id: "10004",
        name: "Kabupaten Teluk Wondama"
      },
      {
        id: "10005",
        name: "Kabupaten Sorong Selatan"
      },
      {
        id: "10006",
        name: "Kabupaten Tambrauw"
      },
      {
        id: "10007",
        name: "Kabupaten Maybrat"
      }
    ]
  }
];
const schema = zod.z.object({
  province_id: zod.z.string().min(1, "Provinsi wajib diisi"),
  city_id: zod.z.string().min(1, "Kota wajib diisi"),
  goat_count: zod.z.string().refine((val) => val.trim() !== "", { message: "Jumlah kambing wajib diisi" }).refine((val) => /^[0-9]+$/.test(val), { message: "Jumlah kambing harus berupa angka bulat" }).refine((val) => parseInt(val, 10) > 0, { message: "Jumlah kambing harus lebih dari 0" }),
  cow_count: zod.z.string().refine((val) => val.trim() !== "", { message: "Jumlah sapi wajib diisi" }).refine((val) => /^[0-9]+$/.test(val), { message: "Jumlah sapi harus berupa angka bulat" }).refine((val) => parseInt(val, 10) > 0, { message: "Jumlah sapi harus lebih dari 0" }),
  recipient_count: zod.z.string().refine((val) => val.trim() !== "", { message: "Jumlah penerima wajib diisi" }).refine((val) => /^[0-9]+$/.test(val), { message: "Jumlah penerima harus berupa angka bulat" }).refine((val) => parseInt(val, 10) > 0, { message: "Jumlah penerima harus lebih dari 0" }),
  olahanKaleng: zod.z.boolean(),
  dagingSegar: zod.z.boolean()
});
const KurbanPage = () => {
  const navigate = reactRouterDom.useNavigate();
  const location = reactRouterDom.useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const [showAlert, setShowAlert] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [alertData, setAlertData] = React.useState({
    success: true,
    title: "Information",
    content: "Data berhasil disimpan",
    actionText: "OK"
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors }
  } = reactHookForm.useForm({
    resolver: zod$1.zodResolver(schema),
    defaultValues: {
      province_id: "",
      city_id: "",
      goat_count: "",
      cow_count: "",
      recipient_count: "",
      olahanKaleng: false,
      dagingSegar: false
    }
  });
  const province_id = watch("province_id");
  const selectedProvince = provincesData.find((p) => p.id === province_id);
  const cityOptions = selectedProvince?.cities || [];
  const fetchDetail = async () => {
    if (!id) return;
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
        olahanKaleng: data.distribution_types?.includes("Olahan Kaleng") ?? false,
        dagingSegar: data.distribution_types?.includes("Daging Segar") ?? false
      });
    } catch (err) {
      console.error("Gagal mengambil detail:", err);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, []);
  const showModalSuccess = () => {
    setAlertData({
      success: true,
      title: "Information",
      content: `Data berhasil ${id ? "diperbarui" : "disimpan"}`,
      actionText: "OK",
      onConfirm: () => navigate("/plugins/kurban-distribution")
    });
    setShowAlert(true);
  };
  const showModalError = () => {
    setAlertData({
      success: false,
      title: "Warning",
      content: `Data gagal ${id ? "diperbarui" : "disimpan"}, cek apakah data sudah diinput di kota yang sama`,
      actionText: "OK"
    });
    setShowAlert(true);
  };
  const onSubmit = async (form) => {
    const provinceName = provincesData.find((p) => p.id === form.province_id)?.name ?? "";
    const cityName = cityOptions.find((c) => c.id === form.city_id)?.name ?? "";
    const distributionType = [
      form.olahanKaleng && "Olahan Kaleng",
      form.dagingSegar && "Daging Segar"
    ].filter(Boolean).join(", ");
    const payload = {
      province_id: form.province_id,
      province_name: provinceName,
      city_id: form.city_id,
      city_name: cityName,
      distribution_types: distributionType,
      goat_count: form.goat_count,
      cow_count: form.cow_count,
      recipient_count: form.recipient_count
    };
    try {
      setIsLoading(true);
      const res = await fetch(id ? `/api/kurbans/${id}` : "/api/kurbans", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload })
      });
      const result = await res.json();
      result.data ? showModalSuccess() : showModalError();
    } catch (err) {
      console.error(err);
      showModalError();
    } finally {
      setIsLoading(false);
    }
  };
  const handleOnKeyDown = (e) => {
    const allowed = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
    if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ModalAlertComponent, { showAlert, setShowAlert, alertData }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { padding: {
      small: ["1rem", "2rem"],
      medium: ["2rem", "4rem"],
      large: ["4rem", "18rem"]
    }, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "center", justifyContent: "space-between", marginBottom: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", children: "Form MTT Penyaluran Hewan Kurban" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            onClick: () => navigate("/plugins/kurban-distribution"),
            variant: "success",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowLeft, {}),
            children: "Kembali"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Box,
          {
            background: "neutral0",
            hasRadius: true,
            shadow: "tableShadow",
            borderColor: "neutral200",
            marginTop: 5,
            paddingBottom: 5,
            children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { padding: [4, 8], gap: 1, direction: "column", alignItems: "flex-start", children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "50%", paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(
                reactHookForm.Controller,
                {
                  name: "province_id",
                  control,
                  render: ({ field }) => /* @__PURE__ */ jsxRuntime.jsx(
                    SelectComponent,
                    {
                      label: "Provinsi",
                      placeholder: "Pilih Provinsi",
                      data: provincesData,
                      ...field,
                      onChange: (val) => {
                        field.onChange(val);
                        setValue("city_id", "");
                      },
                      value: field.value,
                      error: errors.province_id?.message
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "50%", paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(
                reactHookForm.Controller,
                {
                  name: "city_id",
                  control,
                  render: ({ field }) => /* @__PURE__ */ jsxRuntime.jsx(
                    SelectComponent,
                    {
                      label: "Kota",
                      placeholder: "Pilih Kota",
                      data: cityOptions,
                      disabled: !province_id,
                      ...field,
                      value: field.value,
                      error: errors.city_id?.message
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsxs(
                designSystem.Box,
                {
                  background: "neutral0",
                  hasRadius: true,
                  shadow: "tableShadow",
                  padding: 7,
                  borderColor: "neutral200",
                  marginTop: 6,
                  style: { width: "100%" },
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 4, direction: "row", justifyContent: "flex-start", width: "100%", children: [
                      /* @__PURE__ */ jsxRuntime.jsx(
                        designSystem.Box,
                        {
                          width: {
                            medium: "30%",
                            large: "13%"
                          },
                          children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", fontSize: "16px", children: "Jumlah Kambing / Sapi yang disalurkan" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "25%", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntime.jsx(
                          designSystem.TextInput,
                          {
                            label: "Jumlah Kambing",
                            type: "text",
                            inputMode: "numeric",
                            ...register("goat_count"),
                            onKeyDown: (e) => handleOnKeyDown(e)
                          }
                        ),
                        errors.goat_count?.message && /* @__PURE__ */ jsxRuntime.jsx("p", { style: { color: "#D02B20", fontSize: "10px", marginTop: "5px" }, children: errors.goat_count.message })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "25%", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntime.jsx(
                          designSystem.TextInput,
                          {
                            label: "Jumlah Sapi",
                            type: "text",
                            inputMode: "numeric",
                            ...register("cow_count"),
                            onKeyDown: (e) => handleOnKeyDown(e)
                          }
                        ),
                        errors.cow_count?.message && /* @__PURE__ */ jsxRuntime.jsx("p", { style: { color: "#D02B20", fontSize: "10px", marginTop: "5px" }, children: errors.cow_count.message })
                      ] }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsxs(
                      designSystem.Flex,
                      {
                        gap: 4,
                        direction: "row",
                        justifyContent: "flex-start",
                        width: "100%",
                        marginTop: 6,
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(
                            designSystem.Box,
                            {
                              width: {
                                medium: "30%",
                                large: "13%"
                              },
                              children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", fontSize: "16px", children: "Jenis Penyaluran Hewan" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "25%", children: /* @__PURE__ */ jsxRuntime.jsx(
                            reactHookForm.Controller,
                            {
                              name: "olahanKaleng",
                              control,
                              render: ({ field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Checkbox, { checked: field.value, onCheckedChange: field.onChange, children: "Olahan Kaleng" })
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "25%", children: /* @__PURE__ */ jsxRuntime.jsx(
                            reactHookForm.Controller,
                            {
                              name: "dagingSegar",
                              control,
                              render: ({ field }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Checkbox, { checked: field.value, onCheckedChange: field.onChange, children: "Daging Segar" })
                            }
                          ) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsxs(
                      designSystem.Flex,
                      {
                        gap: 4,
                        direction: "row",
                        justifyContent: "flex-start",
                        width: "100%",
                        marginTop: 6,
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsx(
                            designSystem.Box,
                            {
                              width: {
                                medium: "30%",
                                large: "13%"
                              },
                              children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", fontSize: "16px", children: "Jumlah Penerima Manfaat Kurban" })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "51.3%", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntime.jsx(
                              designSystem.TextInput,
                              {
                                label: "Jumlah Penerima",
                                type: "text",
                                inputMode: "numeric",
                                ...register("recipient_count"),
                                onKeyDown: (e) => handleOnKeyDown(e)
                              }
                            ),
                            errors.recipient_count?.message && /* @__PURE__ */ jsxRuntime.jsx("p", { style: { color: "#D02B20", fontSize: "10px", marginTop: "5px" }, children: errors.recipient_count.message })
                          ] }) })
                        ]
                      }
                    )
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "end", paddingTop: 6, gap: 4, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "danger-light", onClick: () => navigate("/plugins/kurban-distribution"), children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", disabled: isLoading, children: "Submit" })
        ] })
      ] })
    ] })
  ] });
};
const DetailKurbanPage = () => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = reactRouterDom.useNavigate();
  const location = reactRouterDom.useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const fetchDetail = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/kurbans/${id}`);
      const result = await res.json();
      if (result?.data) {
        setData(result.data);
      }
    } catch (err) {
      console.error("Gagal mengambil detail:", err);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    fetchDetail();
  }, []);
  const renderDistributionBadges = (typesString) => {
    if (!typesString) return null;
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Box,
      {
        style: {
          display: "flex",
          gap: "4px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
        children: typesString.split(",").map((type, i) => /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Box,
          {
            background: "success600",
            hasRadius: true,
            style: {
              fontSize: 12,
              whiteSpace: "nowrap",
              color: "white",
              padding: "2px 8px"
            },
            children: type.trim()
          },
          i
        ))
      }
    );
  };
  const renderDetail = () => {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", hasRadius: true, shadow: "tableShadow", padding: 8, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { wrap: "wrap", gap: 4, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Provinsi" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", children: data?.province_name })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Kota" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", children: data?.city_name })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Jumlah Sapi" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", children: data?.cow_count })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Jumlah Kambing" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", children: data?.goat_count })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", width: "32%", padding: 4, hasRadius: true, shadow: "tableShadow", borderColor: "success600", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 4, children: "Jenis Penyaluran" }),
        renderDistributionBadges(data?.distribution_types)
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", width: "32%", hasRadius: true, padding: 4, shadow: "tableShadow", borderColor: "success600", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Jumlah Penerima" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", children: data?.recipient_count })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", textColor: "success600", marginBottom: 2, children: "Tanggal Dibuat" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", children: data?.createdAt ? moment__default.default(data.createdAt).locale("id").format("LLLL") : "-" })
      ] })
    ] }) });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { padding: { small: 4, medium: 6, large: 10 }, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "center", justifyContent: "space-between", marginBottom: 4, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", fontSize: "20px", children: "Detail Penyaluran Kurban" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: () => navigate("/plugins/kurban-distribution"), variant: "success", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowLeft, {}), children: "Kembali" })
    ] }),
    (() => {
      if (isLoading) {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: "Memuat data..." });
      }
      if (!data) {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: "Data tidak ditemukan." });
      }
      return renderDetail();
    })()
  ] }) });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.DesignSystemProvider, { locale: "en-GB", theme: designSystem.lightTheme, children: /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(ListKurbanPage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/add", element: /* @__PURE__ */ jsxRuntime.jsx(KurbanPage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/detail", element: /* @__PURE__ */ jsxRuntime.jsx(DetailKurbanPage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] }) });
};
exports.App = App;
