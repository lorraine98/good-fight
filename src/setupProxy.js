const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/nickname",
    createProxyMiddleware({
      target: "https://nickname.hwanmoo.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    }),
  );
};
