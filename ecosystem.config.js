module.exports = {
  apps: [
    {
      name: 'dispora-mobile',
      exec_mode: 'cluster',
      instances: 'max', // atau 1 jika server kecil
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
