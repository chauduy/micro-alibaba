const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  devServer: {
    port: 4300,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
    hot: true,
    writeToDisk: false,
  },
  output: {
    uniqueName: 'accountApp',
    publicPath: '/',
    scriptType: 'text/javascript',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'accountApp',
      filename: 'remoteEntry.js',
      exposes: {
        './AccountModule': './src/app/app.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      scriptLoading: 'blocking',
      chunks: ['main'],
    }),
  ],
};
