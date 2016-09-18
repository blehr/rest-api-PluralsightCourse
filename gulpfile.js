const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');
const env = require('gulp-env');
const supertest = require('supertest');

gulp.task('default', () => {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8081
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', () => {
        console.log('Restarting...');
    });
});

gulp.task('test', function() {
    env({vars: {ENV: 'Test'}});
    gulp.src('tests/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'nyan'}));
});