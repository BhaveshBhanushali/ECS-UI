const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api', // Specify the API endpoint you want to proxy
    createProxyMiddleware({
      target: 'https://zalexinc.azure-api.net', // Specify the target URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the "/api" prefix from the request path
      },
    }),
  )
}
