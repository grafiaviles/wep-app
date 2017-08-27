//Incluir Dependencias
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const pump = require('pump');
const htmlmin = require('gulp-htmlmin');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'javascript', 'html'], function() {

    browserSync.init({
        server: "./www"
    });

    gulp.watch("./www/js/*.js", ['javascript']).on('change', browserSync.reload); //Observa la tarea minificar JS e inyecta
    gulp.watch("./scss/**/*.scss", ['sass']); //Observa la tarea SASS
    gulp.watch("./www/*.html").on('change', browserSync.reload); //Observa la tarea html y recarga
    gulp.watch('./*.html', ['html']); //Observa la tarea minificar html
});

// MINIFICADOR HTML
gulp.task('html', function() {
    return gulp.src('./*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('www'));
});

// UGLIFY COMPRIMIR JS
gulp.task('javascript', function(cb) {
    pump([
            gulp.src('./www/js/*.js'),
            uglify(),
            gulp.dest('./www/js/dist')
        ],
        cb
    );
});

// SASS COMPILE
gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./www/css'))
        .pipe(browserSync.stream())
});