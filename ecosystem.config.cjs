module.exports = {
  apps: [
    {
      name: 'dispora-mobile',
      exec_mode: 'cluster',
      instances: '1', // atau 1 jika server kecil
      script: './.output/server/index.mjs',
      interpreter: '/root/.nvm/versions/node/v21.7.3/bin/node',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
