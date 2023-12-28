
const {src,dest,watch,series}  = require('gulp');



const sass =require('gulp-sass')(require('sass'));

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const sourcemaps = require('gulp-sourcemaps');

const cssnano = require('cssnano');
//minify pictures
const imagemin=require('gulp-imagemin');

const babel = require('gulp-babel');
const { warn } = require('console');

/* JavaScript */

const paths ={
    src: 'src/js/**/*.js',
    dest: 'build/js'
}

/* We compile the scss files*/
function css(done){

    //Sheet csss
    src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    // compile and minify
    .pipe(sass({outputStyle:'compressed'}))
    //browser compatibility
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write())
    //Save scss files
    .pipe(dest('build/css'))



    done();


}

//compile Js
function compileJS() {
    return src(paths.src)
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(dest(paths.dest));
  }

function picture(done){
    //path picture
    src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest('build/img'))
    
    done();
}

function dev (done){

    //detects all changes to .scss files
    watch('src/scss/**/*.scss', css);
    
    watch('src/img/**/*',picture);

    watch('src/js/**/*.js',compileJS);
}
exports.css = css;
exports.dev = dev;
exports.compileJS = compileJS;
exports.picture = picture;
exports.default=series(css,compileJS,picture,dev);
