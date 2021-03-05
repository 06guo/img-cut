module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry'
    }]
  ],
  plugins: [
    ['import', {
      'libraryName': 'fs-ui',
      'libraryDirectory': 'lib',
      'style': true
    }, 'fs-ui']
  ]
}
