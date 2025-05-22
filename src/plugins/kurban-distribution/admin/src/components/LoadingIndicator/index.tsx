import { Box, Loader } from '@strapi/design-system';

const LoadingIndicator = () => {
  return (
    <Box padding={5} style={{ textAlign: 'center', height:'40px' }}>
      <Loader>Memuat data...</Loader>
    </Box>
  );
};

export default LoadingIndicator;
