'use strict'

const codepoints = require('./codepoints.json')

module.exports = {
  inputDir: './icons',
  outputDir: './font',
  fontTypes: ['woff2', 'woff'],
  assetTypes: ['css', 'scss', 'json', 'html'],
  name: 'quantum-symbols',
  codepoints,
  prefix: 'sym',
  selector: '.sym',
  fontsUrl: './fonts',
  // Use our custom Handlebars templates
  templates: {
    css: './scripts/font/css.hbs',
    scss: './scripts/font/scss.hbs'
  },
  pathOptions: {
    woff: './font/fonts/quantum-symbols.woff',
    woff2: './font/fonts/quantum-symbols.woff2',
    json: './codepoints.json'
  }
}
