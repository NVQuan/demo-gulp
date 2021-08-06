const gulp = require('gulp');
const sass = require("gulp-sass")(require("node-sass"));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const browserSync = require('browser-sync').create();
const del = require('del');
const minify = require('gulp-minify');
const zip = require('gulp-zip');

const buildName = 'test.zip';

gulp.task('clean', function (cb) {
    return del(['public/**']);
});

gulp.task('css.compile', function () {
    return gulp.src('src/assets/css/**/*.css')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(
            purgecss({
                content: ['public/**/*.html']
            })
        )
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('js.compile', function () {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('public/js'));
});

gulp.task('html.compile', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('public/'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });
});

gulp.task('zip', function () {
    var sources = [
        'public/**'
    ];
    return gulp.src('public/**')
        .pipe(zip(buildName))
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
    gulp.watch('src/assets/js/**/*.js', gulp.series('js.compile'));
    gulp.watch('src/assets/css/**/*.css', gulp.series('css.compile'));
    gulp.watch('src/**/*.html', gulp.series('html.compile')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('clean', gulp.parallel('css.compile', 'js.compile', 'html.compile', 'serve', 'watch')));
