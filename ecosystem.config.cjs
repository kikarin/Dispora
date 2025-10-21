// ecosystem.config.cjs
const path = require('path')

module.exports = {
  apps: [
    {
      name: 'dispora-mobile',
      exec_mode: 'cluster',
      instances: 1,
      script: './.output/server/index.mjs',
      // pastikan proses app dijalankan dengan node dari nvm saat ini:
      interpreter:
        process.env.PM2_NODE_INTERPRETER ||
        '/root/.nvm/versions/node/v21.7.3/bin/node',
      env: {
        NODE_ENV: 'production',
        // pastikan Nitro bind ke IPv4 localhost
        NITRO_HOST: '127.0.0.1',
        NITRO_PORT: 3000,
        // sebagian app membaca PORT; set juga sebagai jaga-jaga
        PORT: 3000,
      },
    },
  ],
}
