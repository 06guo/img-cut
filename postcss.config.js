module.exports = {
  'plugins': {
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: ['html'],
      minPixelValue: 1
    }
  }
}
