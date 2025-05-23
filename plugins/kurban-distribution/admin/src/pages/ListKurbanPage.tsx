import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Flex,
  Main,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from '@strapi/design-system';
import { ArrowsCounterClockwise, Eye, Pencil, Trash } from '@strapi/icons';
import ModalAlert, { AlertData } from '../components/ModalAlert';
import LoadingIndicator from '../components/LoadingIndicator';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ListKurbanPage = () => {
  const [dataKurban, setDataKurban] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<AlertData>({
    success: true,
    title: '',
    content: '',
    actionText: 'OK',
    cancelText: 'Cancel',
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const navigate = useNavigate();

  const showModal = (success: boolean, message: string) => {
    setAlertData({
      success,
      title: success ? 'Information' : 'Warning',
      content: message,
      actionText: 'OK',
    });
    setShowAlert(true);
  };

  const setConfirmDelete = (id:number) => {
    setSelectedId(id);
    setAlertData({
      success: false,
      title: 'Konfirmasi Hapus',
      content: 'Apakah Anda yakin ingin menghapus data ini?',
      actionText: 'Ya, Hapus',
      cancelText: 'Batal',
      onConfirm: () => {
        if (selectedId !== null) handleDelete(selectedId);
      },
    });
    setShowAlert(true);
  };

  const getListKurban = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/kurbans');
      const result: any = await res.json();
      if (result?.data) {
        setDataKurban(result.data);
      } else {
        showModal(false, 'Gagal mengambil data');
      }
      setIsLoading(false);
    } catch (err) {
      console.error('get data error:', err);
      showModal(false, 'Terjadi kesalahan saat mengambil data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/kurbans/${id}`, { method: 'DELETE' });

      if (res.ok) {
        showModal(true, 'Data berhasil dihapus');
        await getListKurban();
      } else {
        const errorData: any = await res.json().catch(() => ({ message: 'Gagal menghapus data' }));
        const errorMessage = errorData?.message ?? 'Gagal menghapus data';
        showModal(false, errorMessage);
      }
    } catch (err) {
      console.error('delete error:', err);
      showModal(false, 'Terjadi kesalahan saat menghapus data');
    } finally {
      setIsLoading(false);
    }
  };

  const renderDistributionBadges = (typesString: string) => {
    if (!typesString) return null;

    return (
      <Box
        style={{
          display: 'flex',
          gap: '4px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {typesString.split(',').map((type, i) => (
          <Box
            key={i}
            background="success600"
            hasRadius
            style={{
              fontSize: 8,
              whiteSpace: 'nowrap',
              color: 'white',
              padding: '2px 8px',
            }}
          >
            {type.trim()}
          </Box>
        ))}
      </Box>
    );
  };

  useEffect(() => {
    getListKurban();
  }, []);

  return (
    <Main>
      <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} alertData={alertData} />
      {isLoading && <LoadingIndicator />}
      <Box padding={{ small: 4, medium: 6, large: 10 }} gap={4}>
        <Typography variant="alpha" fontSize="20px">
          MTT Penyaluran Hewan Kurban
        </Typography>

        <Flex justifyContent="end" paddingTop={6} gap={4}>
          <Button variant="success" onClick={getListKurban} startIcon={<ArrowsCounterClockwise />}>
            Refresh
          </Button>
          <Button onClick={() => navigate(`/plugins/kurban-distribution/add`)}>Add</Button>
        </Flex>

        <Box
          background="neutral0"
          hasRadius
          shadow="tableShadow"
          borderColor="neutral200"
          marginTop={5}
          padding={6}
          paddingBottom={8}
        >
          <Box marginBottom={4}>
            <Typography variant="alpha" fontSize="20px">
              Data Penyaluran Hewan Kurban
            </Typography>
          </Box>
          <Table colCount={7} rowCount={dataKurban.length || 0} marginBottom={4} padding={0}>
            <Thead>
              <Tr>
                <Th width="14%" textColor="primary700">
                  Provinsi
                </Th>
                <Th width="14%" textColor="primary700">
                  Kota
                </Th>
                <Th textColor="primary700">Sapi</Th>
                <Th textColor="primary700">Kambing</Th>
                <Th
                  textColor="primary700"
                  textAlign="center"
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <span>Jenis Penyaluran</span>
                </Th>
                <Th textColor="primary700">Penerima</Th>
                <Th textColor="primary700">Tanggal</Th>
                <Th
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  textColor="primary700"
                >
                  Aksi
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isLoading && dataKurban.length > 0 ? (
                dataKurban.map((item, index) => (
                  <Tr key={item.id} background={index % 2 === 0 ? 'neutral0' : 'neutral100'}>
                    <Td>{item?.province_name ?? '-'}</Td>
                    <Td>{item?.city_name ?? '-'}</Td>
                    <Td>{item?.cow_count ?? '0'}</Td>
                    <Td>{item?.goat_count ?? '0'}</Td>
                    <Td style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {renderDistributionBadges(item?.distribution_types)}
                    </Td>
                    <Td>{item?.recipient_count ?? '0'}</Td>
                    <Td>
                      {item?.createdAt ? moment(item.createdAt).locale('id').format('LL') : '-'}
                    </Td>
                    <Td>
                      <Flex gap={2} justifyContent="end">
                        <Button
                          onClick={() =>
                            navigate(`/plugins/kurban-distribution/detail?id=${item.documentId}`)
                          }
                          width="30px"
                          variant="tertiary"
                          aria-label="Lihat"
                          title="Lihat Detail"
                        >
                          <Eye style={{ marginTop: '4px' }} />
                        </Button>
                        <Button
                          onClick={() =>
                            navigate(`/plugins/kurban-distribution/add?id=${item.documentId}`)
                          }
                          variant="tertiary"
                          width="30px"
                          aria-label="Edit"
                          title="Edit Data"
                        >
                          <Pencil style={{ marginTop: '4px' }} />
                        </Button>
                        <Button
                          width="30px"
                          onClick={() => setConfirmDelete(item.documentId)}
                          variant="danger"
                          aria-label="Hapus"
                          title="Hapus Data"
                        >
                          <Trash style={{ marginTop: '4px' }} />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} style={{ textAlign: 'center' }}>
                    <Typography variant="omega" textColor="neutral600" padding={4}>
                      Tidak ada data
                    </Typography>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Main>
  );
};

export default ListKurbanPage;
