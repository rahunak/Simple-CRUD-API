import path from 'path';

interface DevConfiguration {
  mode: 'none' | 'dev' | 'prod';
  devtool: string;
  devServer: {
    open: boolean,
    host: 'localhost',
    contentBase: string;
  };
  watch: boolean;
}

export const devConfig: DevConfiguration = {
  mode: 'dev',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    host: 'localhost',
    contentBase: path.resolve(__dirname, './'),
  },
  watch: true,
};