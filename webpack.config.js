const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = {
  mode: 'development',
  entry: './src/devboot.ts',
  devtool: 'inline-source-map',
  devServer: {
    static: [path.resolve(__dirname, 'dist')],
    host: '0.0.0.0',
    port: '3000'
  },
  output: {
    filename: '[name].bundle.dev.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: 'kcapeW'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'kcapeW',
      template: 'src/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.png$/i,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};

const prod = {
  mode: 'production',
  entry: './src/boot.ts',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: 'kcapeW'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'kcapeW',
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.png$/i,
        type: 'asset/resource'
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};

module.exports = env => (env.production) ? prod : dev;
