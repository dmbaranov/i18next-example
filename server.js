const http = require('http');
const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const host = process.env.npm_config_host;
const port = process.env.npm_config_port;

 console.log({ host: process.env.npm_config_host });
 console.log({ port: process.env.npm_config_port });

(function initWebpack() {

  const webpack = require('webpack');
  const webpackConfig = require('./webpack/webpack.config');
  const compiler = webpack(webpackConfig);

  app.use('/api', proxy(`${host}:${port}/`, {
    forwardPath: function(req, res) {
      return require('url').parse(req.url).path;
    }
  }));

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));
})();

app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
server.listen(3001, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
