import path from 'path';

interface ProdConfiguration {
  mode: 'none' | 'dev' | 'prod';
  devServer: {
    open: boolean;
    host: 'localhost';
    contentBase: string;
  };
}

export const prodConfig: ProdConfiguration = {
  mode: 'prod',
  devServer: {
    open: true,
    host: 'localhost',
    contentBase: path.resolve(__dirname, '../dist'),
  },
};