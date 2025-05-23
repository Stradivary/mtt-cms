const routes = [
  {
    method: 'GET',
    path: '/kurbans',
    handler: 'api::kurban.kurban.find',
    config: {
      middlewares: ['plugin::kurban-distribution.customPluginMiddleware'],
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/kurbans/:id',
    handler: 'api::kurban.kurban.findOne',
    config: {
      middlewares: ['plugin::kurban-distribution.customPluginMiddleware'],
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/kurbans',
    handler: 'api::kurban.kurban.create',
    config: {
      middlewares: ['plugin::kurban-distribution.customPluginMiddleware'],
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/kurbans/:id',
    handler: 'api::kurban.kurban.update',
    config: {
      middlewares: ['plugin::kurban-distribution.customPluginMiddleware'],
      policies: [],
    },
  },
  {
    method: 'DELETE', 
    path: '/kurbans/:id',
    handler: 'api::kurban.kurban.delete',
    config: {
      middlewares: ['plugin::kurban-distribution.customPluginMiddleware'],
      policies: [],
    },
  },
];

export default routes;
