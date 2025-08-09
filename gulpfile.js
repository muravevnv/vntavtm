const gulp = require('gulp');
const fileInclude = require("gulp-file-include");
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

// Пути к файлам
const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist/',
    components: 'src/components/*.html'
  },
  css: {
    src: 'src/css/*.css',
    dest: 'dist/css/'
  },
  js: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  }
};

// Обработка HTML с @@include
function html() {
  return gulp
    .src(paths.html.src)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "./src/components/",
      })
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Обработка CSS с Tailwind
function css() {
  const plugins = [
    require('@tailwindcss/postcss'),
    require('autoprefixer')
  ];
  
  return gulp.src(paths.css.src)
    .pipe(postcss(plugins))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream());
}

// Копирование JS
function js() {
  return gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

function fonts() {
  return gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}


// Запуск сервера и отслеживание файлов
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch(paths.html.src, gulp.series(html, css)); // Добавлен вызов css после html
  gulp.watch(paths.html.components, gulp.series(html, css)); // Добавлен вызов css после html
  gulp.watch(paths.css.src, css);
  gulp.watch(paths.js.src, js);
  gulp.watch('tailwind.config.js', css);
}

// Сборка по умолчанию
const build = gulp.series(gulp.parallel(html, css, js));

// Экспорт задач
exports.html = html;
exports.css = css;
exports.js = js;
exports.build = build;
exports.serve = gulp.series(build, serve);
exports.default = build;