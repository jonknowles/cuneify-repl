const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
  },
};