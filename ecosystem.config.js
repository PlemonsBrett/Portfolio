module.exports = {
  apps: [
    {
      name: "app",
      script: "./src/app.js",
      instances: "max",
      watch: "true",
      log_date_format: "YY-MM-DD HH:mm Z",
      listen_timeout: "8000",
      kill_timeout: "1600",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "https://git.heroku.com/vast-tor-34673.git",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy": "yarn && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
