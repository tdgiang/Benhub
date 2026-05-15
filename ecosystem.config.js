// PM2 ecosystem — dùng thay Docker nếu VPS đã cài Node.js trực tiếp
// Usage: pm2 start ecosystem.config.js --env production

module.exports = {
  apps: [
    {
      name: "benhub-backend",
      cwd: "./src/backend",
      script: "dist/main.js",
      instances: 2,
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
        PORT: 4000,
      },
      error_file: "./logs/backend-error.log",
      out_file: "./logs/backend-out.log",
      time: true,
      max_memory_restart: "512M",
      wait_ready: true,
      listen_timeout: 10000,
    },
    {
      name: "benhub-frontend",
      cwd: "./src/frontend",
      script: "node_modules/.bin/next",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      error_file: "./logs/frontend-error.log",
      out_file: "./logs/frontend-out.log",
      time: true,
      max_memory_restart: "1G",
    },
  ],
};
