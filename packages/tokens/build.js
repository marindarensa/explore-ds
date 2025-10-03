import { transform } from '@babel/core';
import StyleDictionary from 'style-dictionary';

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(brand, theme) {
  return {
    source: [
      `src/brands/${brand}/*.json`,
      `src/themes/${theme}/*.json`,
      'src/global/**/*.json',
    ],
    platforms: {
      scss: {
        transformGroup: "scss",
        transforms: ["size/pxToRem"],
        buildPath: `dist/${brand}/`,
        prefix: "qn",
        files: [
          {
            destination: `${theme}.scss`,
            format: "scss/map-deep",
            options: {
                outputReferences: true,
                themeable: false,
                mapName: "qn-tokens"
              },
          },
        ],
      },
    },
    log: {
        verbosity: 'verbose'
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['edlink', 'sevima', 'siakad'].map(function (brand) {
  ['dark', 'light'].map(function (theme) {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${theme}] [${brand}]`);

    const sd = new StyleDictionary(getStyleDictionaryConfig(brand, theme));
    sd.buildAllPlatforms();
  });
});

console.log('\n==============================================');
console.log('\nBuild completed!');
