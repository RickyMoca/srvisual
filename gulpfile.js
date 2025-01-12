const gulp = require('gulp'); // Memasukkan module gulp
const cleanCSS = require('gulp-clean-css'); // Untuk meminifikasi file CSS
const browserSync = require('browser-sync').create(); // Untuk browser live-reloading
const nunjucksRender = require('gulp-nunjucks-render'); // Untuk merender file Nunjucks (.njk)
const data = require('gulp-data'); // Untuk memuat data JSON
const fs = require('fs'); // Untuk membaca file JSON
const rename = require('gulp-rename'); // Untuk merename file, seperti menambahkan suffix

// Variabel untuk folder sumber dan tujuan
const src = 'src';  // Folder sumber
const dist = '.'; // Folder tujuan

// Task untuk meminifikasi CSS
function minifyCSS() {
  return gulp.src(`${src}/assets/css/**/*.css`) // Menentukan file CSS sumber
    .pipe(cleanCSS({ compatibility: 'ie8' })) // Meminifikasi CSS dengan kompatibilitas IE8
    .pipe(rename({ suffix: '.min' })) // Menambahkan suffix ".min" pada nama file output
    .pipe(gulp.dest(`${dist}/assets/css`)) // Menyimpan file yang sudah dimodifikasi ke folder tujuan
    .pipe(browserSync.stream()); // Menyebarkan perubahan ke browser untuk live reload
}

// Task untuk merender file Nunjucks (.njk) menjadi HTML
function nunjucks() {
  return gulp.src(`${src}/page/*.njk`) // Menentukan file Nunjucks sumber
    .pipe(data(() => JSON.parse(fs.readFileSync(`${src}/data/data.json`)))) // Memuat data dari JSON
    .pipe(nunjucksRender({ path: [`${src}/page`] })) // Merender file Nunjucks dengan path ke template
    .pipe(gulp.dest(dist)) // Menyimpan file HTML hasil render ke folder tujuan
    .pipe(browserSync.stream()); // Menyebarkan perubahan ke browser untuk live reload
}

// Task untuk menyalin file gambar dan JavaScript ke folder tujuan
function copyAssets() {
  return gulp.src([`${src}/assets/img/**/*`, `${src}/assets/js/**/*`], { base: `${src}/assets` }) // Menyalin semua gambar dan JS
    .pipe(gulp.dest(`${dist}/assets`)); // Menyimpan file yang disalin ke folder tujuan
}

// Task untuk menyalin file favicon ke folder tujuan
function copyIcon() {
  return gulp.src(`${src}/favicon.ico`) // Menentukan file favicon sumber
    .pipe(gulp.dest(dist)); // Menyimpan favicon ke folder tujuan
}

// Task untuk menginisialisasi browserSync dan memantau file untuk perubahan
function serve() {
  browserSync.init({
    server: { baseDir: dist }, // Menggunakan folder 'dist' sebagai root server
  });

  // Memantau file .njk dan .html untuk merender ulang saat ada perubahan
  gulp.watch(`${src}/page/**/*.njk`, nunjucks); 
  gulp.watch(`${src}/page/**/*.html`, nunjucks); 
  gulp.watch(`${src}/assets/css/**/*.css`, minifyCSS); // Memantau file CSS untuk minifikasi ulang
  gulp.watch([`${src}/assets/img/**/*`, `${src}/assets/js/**/*`], copyAssets); // Memantau gambar dan JS untuk penyalinan ulang
  gulp.watch(`${dist}/**/*`).on('change', browserSync.reload); // Memantau semua file di folder dist untuk reload browser
}

// Task Default yang menjalankan semua task yang telah didefinisikan
exports.default = gulp.series(minifyCSS, nunjucks, copyAssets, copyIcon, serve);
