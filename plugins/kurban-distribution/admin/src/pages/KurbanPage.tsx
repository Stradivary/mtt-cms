import { useEffect, useState } from 'react';
import { Box, Typography, TextInput, Button, Flex, Checkbox, Main } from '@strapi/design-system';
import Select from '../components/Select';
import ModalAlert from '../components/ModalAlert';
import provincesData from '../data/indonesia_provinces_cities.json';
import { ArrowLeft } from '@strapi/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../data/kurban-zod-schema';
import { KurbanDistribution } from '../data/kurban.interpace';

type FormData = z.infer<typeof schema>;

const KurbanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');

  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState<{
    success: boolean;
    title: string;
    content: string;
    actionText: string;
    onConfirm?: () => void;
  }>({
    success: true,
    title: 'Information',
    content: 'Data berhasil disimpan',
    actionText: 'OK',
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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
  const selectedProvince = provincesData.find((p) => p.id === province_id);
  const cityOptions = selectedProvince?.cities || [];

  const fetchDetail = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/kurbans/${id}`);
      const result: any = await res.json();
      const data: KurbanDistribution = result?.data;
      reset({
        province_id: data.province_id,
        city_id: data.city_id,
        goat_count: data.goat_count?.toString(),
        cow_count: data.cow_count?.toString(),
        recipient_count: data.recipient_count?.toString(),
        olahanKaleng: data.distribution_types?.includes('Olahan Kaleng') ?? false,
        dagingSegar: data.distribution_types?.includes('Daging Segar') ?? false,
      });
    } catch (err) {
      console.error('Gagal mengambil detail:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

  const onSubmit = async (form: FormData) => {
    const provinceName = provincesData.find((p) => p.id === form.province_id)?.name ?? '';
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

      const result: any = await res.json();
      result.data ? showModalSuccess() : showModalError();
    } catch (err) {
      console.error(err);
      showModalError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnKeyDown = (e: any) => {
    const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Main>
      <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} alertData={alertData} />
      <Box  padding={{
          small: ['1rem', '2rem'],
          medium: ['2rem', '4rem'],
          large: ['4rem', '18rem'],
        }}>
        <Flex alignItems="center" justifyContent="space-between" marginBottom={4}>
          <Typography variant="alpha">Form MTT Penyaluran Hewan Kurban</Typography>
          <Button
            onClick={() => navigate('/plugins/kurban-distribution')}
            variant="success"
            startIcon={<ArrowLeft />}
          >
            Kembali
          </Button>
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            background="neutral0"
            hasRadius
            shadow="tableShadow"
            borderColor="neutral200"
            marginTop={5}
            paddingBottom={5}
          >
            <Flex padding={[4, 8]} gap={1} direction="column" alignItems="flex-start">
              <Box width="50%" paddingTop={4}>
                <Controller
                  name="province_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Provinsi"
                      placeholder="Pilih Provinsi"
                      data={provincesData}
                      {...field}
                      onChange={(val: string) => {
                        field.onChange(val);
                        setValue('city_id', '');
                      }}
                      value={field.value}
                      error={errors.province_id?.message}
                    />
                  )}
                />
              </Box>
              <Box width="50%" paddingTop={4}>
                <Controller
                  name="city_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Kota"
                      placeholder="Pilih Kota"
                      data={cityOptions}
                      disabled={!province_id}
                      {...field}
                      value={field.value}
                      error={errors.city_id?.message}
                    />
                  )}
                />
              </Box>
              <Box
                background="neutral0"
                hasRadius
                shadow="tableShadow"
                padding={7}
                borderColor="neutral200"
                marginTop={6}
                style={{ width: '100%' }}
              >
                <Flex gap={4} direction="row" justifyContent="flex-start" width="100%">
                  <Box
                    width={{
                      medium: '30%',
                      large: '13%',
                    }}
                  >
                    <Typography variant="alpha" fontSize="16px">
                      Jumlah Kambing / Sapi yang disalurkan
                    </Typography>
                  </Box>
                  <Box width="25%">
                    <div>
                      <TextInput
                        label="Jumlah Kambing"
                        type="text"
                        inputMode="numeric"
                        {...register('goat_count')}
                        onKeyDown={(e: any) => handleOnKeyDown(e)}
                      />
                      {errors.goat_count?.message && (
                        <p style={{ color: '#D02B20', fontSize: '10px', marginTop: '5px' }}>
                          {errors.goat_count.message}
                        </p>
                      )}
                    </div>
                  </Box>
                  <Box width="25%">
                    <div>
                      <TextInput
                        label="Jumlah Sapi"
                        type="text"
                        inputMode="numeric"
                        {...register('cow_count')}
                        onKeyDown={(e: any) => handleOnKeyDown(e)}
                      />
                      {errors.cow_count?.message && (
                        <p style={{ color: '#D02B20', fontSize: '10px', marginTop: '5px' }}>
                          {errors.cow_count.message}
                        </p>
                      )}
                    </div>
                  </Box>
                </Flex>
                <Flex
                  gap={4}
                  direction="row"
                  justifyContent="flex-start"
                  width="100%"
                  marginTop={6}
                >
                  <Box
                    width={{
                      medium: '30%',
                      large: '13%',
                    }}
                  >
                    <Typography variant="alpha" fontSize="16px">
                      Jenis Penyaluran Hewan
                    </Typography>
                  </Box>
                  <Box width="25%">
                    <Controller
                      name="olahanKaleng"
                      control={control}
                      render={({ field }) => (
                        <Checkbox checked={field.value} onCheckedChange={field.onChange}>
                          Olahan Kaleng
                        </Checkbox>
                      )}
                    />
                  </Box>
                  <Box width="25%">
                    <Controller
                      name="dagingSegar"
                      control={control}
                      render={({ field }) => (
                        <Checkbox checked={field.value} onCheckedChange={field.onChange}>
                          Daging Segar
                        </Checkbox>
                      )}
                    />
                  </Box>
                </Flex>
                <Flex
                  gap={4}
                  direction="row"
                  justifyContent="flex-start"
                  width="100%"
                  marginTop={6}
                >
                  <Box
                    width={{
                      medium: '30%',
                      large: '13%',
                    }}
                  >
                    <Typography variant="alpha" fontSize="16px">
                      Jumlah Penerima Manfaat Kurban
                    </Typography>
                  </Box>
                  <Box width="51.3%">
                    <div>
                      <TextInput
                        label="Jumlah Penerima"
                        type="text"
                        inputMode="numeric"
                        {...register('recipient_count')}
                        onKeyDown={(e: any) => handleOnKeyDown(e)}
                      />
                      {errors.recipient_count?.message && (
                        <p style={{ color: '#D02B20', fontSize: '10px', marginTop: '5px' }}>
                          {errors.recipient_count.message}
                        </p>
                      )}
                    </div>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Flex justifyContent="end" paddingTop={6} gap={4}>
            <Button variant="danger-light" onClick={() => navigate('/plugins/kurban-distribution')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Main>
  );
};

export default KurbanPage;
