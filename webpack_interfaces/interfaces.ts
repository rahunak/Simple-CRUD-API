interface IDevConfig {
    mode: 'none' | 'dev' | 'prod';
    devtool: string;
    devServer: {
      open: boolean,
      host: 'localhost',
      contentBase: string;
    };
    watch: boolean;
  }
  interface IProdConfig {
    mode: 'none' | 'dev' | 'prod';
    devServer: {
      open: boolean;
      host: 'localhost';
      contentBase: string;
    };
  }

  export {IDevConfig, IProdConfig}