import path from 'path';
import { Configuration } from 'webpack';
import { devConfig } from './webpack.dev.config';
import { prodConfig } from './webpack.prod.config';

const config = {
  target: 'node',
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  resolve: {    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [ 
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },

    ],
  },
};

export default (env: any, argv: Configuration): Configuration => {
  if (argv.mode === 'dev') {
    return {
      ...config,
      ...devConfig,
    };
  }

  if (argv.mode === 'prod') {
    return {
      ...config,
      ...prodConfig,
    };
  }

  return config;
};