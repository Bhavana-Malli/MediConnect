const PROXY_CONFIG = [
  {
    context: [
      "/home",
      "/donations",
      "/recipient",
      "/donor",
      "/organ",
      "/login",
      "/feedback",
      "/contact",
      "/hospital",
    ],
    target: "https://localhost:7194",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
