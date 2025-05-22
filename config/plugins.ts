import path from 'path';

export default () => ({
  'kurban-distribution': {
    enabled: true,
    resolve: path.resolve(__dirname, '../src/plugins/kurban-distribution'),
  },
});
