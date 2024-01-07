const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://zalexinc.azure-api.net',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
}
