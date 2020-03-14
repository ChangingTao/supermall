module.exports = {
  configureWebpack:{
    resolve: {
      extensions: [],
      alias: {
      //  配置别名，可以直接进行引用
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',


      }
    }
  }

}