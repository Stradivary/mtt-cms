import { Box, Typography, Button, Flex, Main } from '@strapi/design-system';
import { ArrowLeft } from '@strapi/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/id';

const DetailKurbanPage = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const id = query.get('id');

  const fetchDetail = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/kurbans/${id}`);
      const result: any = await res.json();
      if (result?.data) {
        setData(result.data);
      }
    } catch (err) {
      console.error('Gagal mengambil detail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

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
              fontSize: 12,
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
  
  const renderDetail = () => {
    return (
      <Box background="neutral0" hasRadius shadow="tableShadow" padding={8}>
        <Flex wrap="wrap" gap={4}>
          <Flex direction="column" width="32%" padding={4} hasRadius shadow="tableShadow" borderColor="success600">
            <Typography fontWeight="semiBold" textColor="success600" marginBottom={2}>Provinsi</Typography>
            <Typography fontWeight="semiBold">{data?.province_name}</Typography>
          </Flex>

          <Flex direction="column" width="32%" padding={4} hasRadius shadow="tableShadow" borderColor="success600">
            <Typography fontWeight="semiBold" textColor="success600" marginBottom={2}>Kota</Typography>
            <Typography  fontWeight="semiBold">{data?.city_name}</Typography>
          </Flex>

          <Flex direction="column" width="32%" padding={4} hasRadius shadow="tableShadow" borderColor="success600">
            <Typography fontWeight="semiBold" textColor="success600" marginBottom={2}>Jumlah Sapi</Typography>
            <Typography  fontWeight="semiBold">{data?.cow_count}</Typography>
          </Flex>

          <Flex direction="column" width="32%" padding={4} hasRadius shadow="tableShadow" borderColor="success600">
            <Typography fontWeight="semiBold" textColor="success600" marginBottom={2}>Jumlah Kambing</Typography>
            <Typography  fontWeight="semiBold">{data?.goat_count}</Typography>
          </Flex>
          <Flex direction="column" width="32%" padding={4} hasRadius shadow="tableShadow" borderColor="success600">
            <Typography fontWeight="semiBold" textColor="success600" marginBottom={4}>
              Jenis Penyaluran
            </Typography>
            {renderDistributionBadges(data?.distribution_types)}
          </Flex>
          <Flex direction="column" width="32%" hasRadius padding={4} shadow="tableShadow" borderColor="success600">
            <Typography fontWeight="semiBold" textColor="success600" marginBottom={2}>Jumlah Penerima</Typography>
            <Typography  fontWeight="semiBold">{data?.recipient_count}</Typography>
          </Flex>

          <Flex direction="column" width="100%">
            <Typography fontWeight="semiBold" textColor="success600" marginBottom={2}>Tanggal Dibuat</Typography>
            <Typography  fontWeight="semiBold">
              {data?.createdAt ? moment(data.createdAt).locale('id').format('LLLL') : '-'}
            </Typography>
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Main>
      <Box padding={{ small: 4, medium: 6, large: 10 }}>
        <Flex alignItems="center" justifyContent="space-between" marginBottom={4}>
          <Typography variant="alpha" fontSize="20px">
            Detail Penyaluran Kurban
          </Typography>
          <Button onClick={() => navigate('/plugins/kurban-distribution')} variant="success" startIcon={<ArrowLeft />}>
            Kembali
          </Button>
        </Flex>

        {(() => {
          if (isLoading) {
            return <Typography>Memuat data...</Typography>;
          }
          if (!data) {
            return <Typography>Data tidak ditemukan.</Typography>;
          }
          return renderDetail();
        })()}
      </Box>
    </Main>
  );
};

export default DetailKurbanPage;
