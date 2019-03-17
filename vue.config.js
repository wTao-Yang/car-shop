module.exports = {
    publicPath: './',
  
    outputDir: 'dist',
  
    assetsDir: 'static',
  
    filenameHashing: true,
  
    // When building in multi-pages mode, the webpack config will contain different plugins
    // (there will be multiple instances of html-webpack-plugin and preload-webpack-plugin).
    // Make sure to run vue inspect if you are trying to modify the options for those plugins.
  
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
  
    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,
  
    // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
    transpileDependencies: [],
  
    // 生产环境 sourceMap
    productionSourceMap: false,
  
  
    // All options for webpack-dev-server are supported
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
      open: true,
  
      host: '127.0.0.1',
  
      port: 8081,
  
      https: false,
  
      hotOnly: false,
  
      proxy: null,
  
      before: app => {
      }
    },
    // 构建时开启多进程处理 babel 编译
  
    // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
  
    // 第三方插件配置
    pluginOptions: {}
  };
  