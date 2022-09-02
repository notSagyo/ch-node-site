export default {
  apps: [
    {
      name: 'app1',
      script: './dist/app.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
