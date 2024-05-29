module.exports = {
  apps: [
    {
      script: "npm start",
    },
  ],

  deploy: {
    production: {
      key: "TeamTokens-KeyPair.pem",
      user: "ubuntu",
      host: "34.200.228.118",
      ref: "origin/main",
      repo: "https://github.com/jacobkinsey/teamtokensmarketing.git",
      path: "/home/ubuntu/teamtokensfrontend",
      "pre-deploy-local": "",
      "post-deploy":
        "source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      ssh_options: "ForwardAgent=yes",
    },
  },
};
