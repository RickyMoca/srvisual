// Menggunakan require() untuk modul CommonJS lainnya
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const fs = require('fs');
const rename = require('gulp-rename');



// Task lainnya (CSS, Nunjucks, dll.)
function minifyCSS() {
  return gulp.src('public/src/assets/css/**/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/dist/assets/css'))
    .pipe(browserSync.stream());
}

function nunjucks() {
  return gulp.src('public/src/page/index.njk')
    .pipe(data(function () {
      return JSON.parse(fs.readFileSync('public/src/data/data.json'));
    }))
    .pipe(nunjucksRender({ path: ['public/src/page'] }))
    .pipe(gulp.dest('public/dist'))
    .pipe(browserSync.stream());
}


function copyAssets() {
  return gulp.src([
    'public/src/assets/img/**/*',    // Semua file dalam folder img dan subfoldernya
    'public/src/assets/js/**/*',     // Semua file dalam folder js dan subfoldernya
    'public/src/assets/musik.mp3',    // File musik mp3
  ], { base: 'public/src/assets' })  // Menentukan base path yang digunakan saat menyalin
  .pipe(gulp.dest('public/dist/assets'));  // Menyimpan ke public/dist/assets
}

function copyIcon() {
  return gulp.src(['public/src/favicon.ico'])
    .pipe(gulp.dest('public/dist'));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './public/dist',
    },
  });

  gulp.watch('public/src/page/**/*.njk|html', nunjucks);
  gulp.watch('public/src/assets/css/**/*.css', minifyCSS);
  gulp.watch('public/src/assets/**/*', copyAssets);
  gulp.watch('public/src/**/*.css').on('change', browserSync.reload);
  gulp.watch('public/dist/**/*.html').on('change', browserSync.reload);
  gulp.watch('public/dist/**/*.css').on('change', browserSync.reload);
}

// Menentukan task default
exports.default = gulp.series(minifyCSS, nunjucks, copyAssets, copyIcon, serve);
