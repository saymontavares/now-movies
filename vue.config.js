module.exports = {
  publicPath: process.env.VUE_PUBLIC_PATH,
  pages: {
      index: {
        entry: 'src/main.js',
        title: process.env.VUE_APP_TITLE,
      }
  }
}