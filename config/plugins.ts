export default () => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '30d',
      },
      routes: {
        'content-api': {
          prefix: '/api',
        },
      },
      rest: {
        defaultLimit: 25,
        maxLimit: 100,
      },
    },
  },
});
