//Incluir Dependencias
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify'); //*
const pump = require('pump'); //*

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("./app/js/*.js", ['comprimir']); //Para minificar JS
    gulp.watch("./scss/**/*.scss", ['sass']); //Para SASS
    gulp.watch("./app/*.html").on('change', browserSync.reload); //Para HTML
    gulp.watch("./app/js/*.js").on('change', browserSync.reload); //Para JS
});

// UGLIFY COMPRIMIR JS
gulp.task('comprimir', function(cb) {
    pump([
            gulp.src('./app/js/*.js'),
            uglify(),
            gulp.dest('./app/js/dist')
        ],
        cb
    );
});

// Sass Compile
gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
});

gulp.task('observar', function() {
    gulp.watch('./scss/**/*.scss', ['sass'])
});