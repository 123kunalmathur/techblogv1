const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  input: 'src/styles/main.scss',
  output: 'dist/css/main.css',
  
  plugins: [
    autoprefixer({
      cascade: false,
      grid: true
    }),
    cssnano({
      preset: 'default'
    })
  ],
  
  sassOptions: {
    outputStyle: 'compressed',
    sourceMap: true,
    sourceMapContents: true
  }
};