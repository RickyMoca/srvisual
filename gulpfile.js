const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css'); // Plugin untuk minify CSS
const browserSync = require('browser-sync').create(); // Plugin untuk live-reloading browser
const nunjucksRender = require('gulp-nunjucks-render'); // Plugin untuk render Nunjucks
const data = require('gulp-data'); // Plugin untuk menambah data ke template
const fs = require('fs');
const rename = require('gulp-rename'); // Plugin untuk merename file

// Definisikan path sumber dan tujuan
const paths = {
  src: {
    css: 'public/src/assets/css/**/*.css', // Lokasi file CSS
    pages: 'public/src/page/index.njk', // File halaman yang ingin di-render (Nunjucks)
    json: 'public/src/data/data.json',  // Data JSON untuk Nunjucks
    assets: 'public/src/assets/**/*' // Semua file asset (CSS, JS, Images, dll)
  },
  dest: 'public/dist', // Lokasi output
};

// Task untuk minify CSS dan mengubah nama file dengan .min sebelum ekstensi
gulp.task('minify-css', function () {
  console.log('Minifying CSS...');  // Log untuk memastikan task ini dijalankan
  return gulp.src(paths.src.css) // Mengambil file CSS dari folder src/assets/css
    .pipe(cleanCSS({ compatibility: 'ie8' })) // Meminify CSS
    .pipe(rename(function (path) {
      path.basename = path.basename + '.min'; // Menambahkan .min sebelum ekstensi .css
    }))
    .pipe(gulp.dest(paths.dest + '/assets/css')) // Menyimpan hasil ke folder dist/assets/css
    .on('end', function() {
      console.log('CSS minified and renamed with .min before extension, saved to dist/assets/css');
    })
    .on('error', function(err) {
      console.error('Error during minification:', err);
    });
});

// Task untuk memproses file Nunjucks
gulp.task('nunjucks', function () {
  return gulp
    .src(paths.src.pages) // Mengambil file Nunjucks (index.njk)
    .pipe(
      data(function () {
        try {
          return JSON.parse(fs.readFileSync(paths.src.json)); // Membaca file data.json
        } catch (err) {
          console.error('Error parsing JSON:', err);
          return {};
        }
      })
    )
    .pipe(
      nunjucksRender({
        path: ['public/src/page'], // Menyediakan path untuk template Nunjucks
        options: {
          autoescape: true, // Mengaktifkan autoescape untuk mencegah XSS
        },
      })
    )
    .pipe(gulp.dest(paths.dest)) // Menyimpan hasil render Nunjucks ke folder dist
    .pipe(browserSync.stream()); // Reload browser setelah build selesai
});

// Task untuk memulai server Browser-Sync
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './public/dist', // Lokasi folder yang akan dilayani
    },
  });

  // Menonton perubahan file
  gulp.watch(paths.src.pages, gulp.series('nunjucks')); // Watch file .njk
  gulp.watch(paths.src.css, gulp.series('minify-css')); // Watch file CSS
  gulp.watch(paths.src.assets, gulp.series('copy-assets')); // Watch asset lainnya
  gulp.watch('public/dist/**/*.html').on('change', browserSync.reload); // Reload browser jika file HTML berubah
  gulp.watch('public/dist/**/*.css').on('change', browserSync.reload); // Reload browser jika file CSS berubah
});

// Task untuk menyalin asset (seperti font, JS, dll) ke folder dist
gulp.task('copy-assets', function () {
  return gulp.src([
      paths.src.assets,
      `!${paths.src.css}`,  // Mengecualikan file CSS
    ]) // Menyalin semua file dalam src/assets kecuali CSS
    .pipe(gulp.dest(paths.dest + '/assets')); // Menyimpan ke folder dist/assets
});

// Default task untuk menjalankan semua task secara bersamaan
gulp.task('default', gulp.series('minify-css', 'nunjucks', 'copy-assets', 'serve'));
