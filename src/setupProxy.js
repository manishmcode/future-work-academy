const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  // Signed library URLs use the frontend origin so browser requests carry
  // the login cookie. Mirror the production /v/ reverse proxy during npm start.
  const target = new URL(
    process.env.REACT_APP_API_URL || 'http://localhost:4000/future-work-api',
  ).origin;

  app.use(createProxyMiddleware('/v/', { target, changeOrigin: true }));
};
