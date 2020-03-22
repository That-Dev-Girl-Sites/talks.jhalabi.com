const gulp = require( 'gulp' ),
      clean = require( 'gulp-clean-css' ),
      rename = require( 'gulp-rename' ),
      sass = require( 'gulp-sass' );

// CSS build task.
gulp.task( 'css', () => {
  return gulp.src( 'assets/site/source/styles.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( clean() )
    .pipe( rename( {suffix: '.min'} ) )
    .pipe( gulp.dest( 'assets/site/build' ) );
} );

// Default task.
gulp.task( 'default', gulp.series( 'css' ) );
