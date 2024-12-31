const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const fs = require('fs');


const paths = {
  src: {
    json: 'public/src/data/data.json',
    pages: 'public/src/page/**/*.+(njk|html)',
  },
  dest: 'public',
};

// Task untuk memproses file Nunjucks
gulp.task('nunjucks', function () {
  return gulp
    .src(paths.src.pages)
    .pipe(
      data(function () {
        try {
          return JSON.parse(fs.readFileSync(paths.src.json));
        } catch (err) {
          console.error('Error parsing JSON:', err);
          return {};
        }
      })
    )
    .pipe(
      nunjucksRender({
        path: ['public/src/page'],
        options: {
          autoescape: true,
        },
      })
    )
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream()); // Reload browser setelah build selesai
});

// Task untuk memulai server Browser-Sync
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './public', // Lokasi folder yang akan dilayani
    },
  });

  gulp.watch(paths.src.pages, gulp.series('nunjucks')); // Watch file .njk
  gulp.watch('src/data/**/*.json', gulp.series('nunjucks')); // Watch file JSON
  gulp.watch('public/**/*.css').on('change', browserSync.reload)
  gulp.watch('public/**/*.html').on('change', browserSync.reload); // Reload browser jika file HTML berubah
});

// Default task
gulp.task('default', gulp.series('nunjucks', 'serve'));
