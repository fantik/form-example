
module.exports = {

  publicPath: process.env.NODE_ENV === 'production'
    ? '/form-example/'
    : '/',

  // Global styles to all components
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/styles/partials/_colors.scss";
          @import "@/assets/styles/partials/_media.scss";
          @import "@/assets/styles/partials/_mixins.scss";
        `
      }
    }
  },

  

  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
