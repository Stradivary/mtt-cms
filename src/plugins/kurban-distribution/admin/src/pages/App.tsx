import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';
import ListKurbanPage from './ListKurbanPage';
import { DesignSystemProvider, lightTheme } from '@strapi/design-system';
import KurbanPage from './KurbanPage';
import DetailKurbanPage from './DetailKurbanPage';

const App = () => {
  return (
    <DesignSystemProvider locale="en-GB" theme={lightTheme}>
      <Routes>
        <Route index element={<ListKurbanPage />} />
        <Route path="/add" element={<KurbanPage />} />
        <Route path="/detail" element={<DetailKurbanPage />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </DesignSystemProvider>
  );
};

export { App };
