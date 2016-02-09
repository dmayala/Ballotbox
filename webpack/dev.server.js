import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './dev.config';

const compiler = webpack(config.webpack);

const devServer = new WebpackDevServer(compiler, config.server.options);

devServer.listen(config.server.port, 'localhost', function () {
  console.log('webpack-dev-server listen on port %s', config.server.port);
});
