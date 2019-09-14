//const pkg = require('./package')

module.exports = {
  mode: 'universal',
  
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },
  
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/main.css'
  ],
  
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  
  /*
  ** Nuxt.js dev-modules
  */
//buildModules: [
//],
  /*
  ** Nuxt.js modules
  */
  modules: [//把axios挂到vue实例上了，可以直接$axios用
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  
  axios:{
  	// See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          //loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    //这里要用false 同时删除node_modules中的.cache文件夹   
		//https://github.com/nuxt/nuxt.js/issues/3804
    cache:false
  }
//build: {
//  transpile: [/^element-ui/],
//  /*
//  ** You can extend webpack config here
//  */
//  extend (config, ctx) {
//  },
//  cache:true//增快编译速度？
//}
}
