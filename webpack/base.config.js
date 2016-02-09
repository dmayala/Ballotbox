import path from 'path';
import writeStats from './utils/writeStats';

const JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './app/app.js'
  ],
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: 'js/app.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {test: /\.json$/, exclude: /node_modules/, loader: 'json'},
      {
        test: JS_REGEX,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {test: /\.(png|woff|woff2|eot|ttf|svg)$/, exclude: /(node_modules|bower_components)/, loader: 'url-loader?limit=100000'}
    ],
  },
  plugins: [
    function () {
      this.plugin('done', writeStats);
    }
  ],
  resolve: {
    extensions: ['', '.react.js', '.js', '.json', '.jsx', '.es6', '.babel', '.scss' ],
    modulesDirectories: ['node_modules', 'app', 'shared' ]
  }
};
