const AppName = 'our-app-name';

const gulp         = require( 'gulp' ),
	sass         = require( 'gulp-sass' )( require( 'node-sass' ) ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	plumber      = require( 'gulp-plumber' ),
	concat       = require( 'gulp-concat' ),
	notify       = require( 'gulp-notify' ),
	sourcemaps   = require( 'gulp-sourcemaps' ),
	rename       = require( 'gulp-rename' ),
	ts           = require( 'gulp-typescript' ),
	uglify       = require( 'gulp-uglify' ),
	browsersync  = require( 'browser-sync' ).create();

/** SCSS Task **/
gulp.task( 'public-scss', function() {
	return gulp.src( './sass/style.scss' )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( 'style.css' ) )
		.pipe( autoprefixer( 'last 2 versions', '> 5%', 'not ie 6-9' ) )
		.pipe( sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( './' ) )
		.pipe( notify( {
			title: 'Result Gulp Task CSS:',
			message: 'Created: ./style.css',
			onLast: true
		} ) )
		.pipe( browsersync.reload( { stream: true } ) );
} );

/** TypeScript Task **/
gulp.task( 'public-ts', function() {
	return gulp.src( './ts/**/general.ts' )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( 'general.ts' ) )
		.pipe( ts( {
			noImplicitAny: true,
			strict: true,
			allowJs: true,
			target: 'ES6',
		} ) )
		.pipe( uglify() )
		.pipe( rename( { extname: '.min.js' } ) )
		.pipe( sourcemaps.write( '../maps' ) )
		.pipe( gulp.dest( './js' ) )
		.pipe( notify( {
			title: 'Result Gulp Task TS:',
			message: 'Created: ./js/general.min.js',
			onLast: true
		} ) )
		.pipe( browsersync.reload( { stream: true } ) );
} );

// Init BrowserSync.
function browserSync( done ) {
	browsersync.init( {
		proxy: 'our-website.local', // Change this value to match your local URL.
		https: true,
		socket: {
			domain: 'localhost:3000'
		}
	} );
	done();
}
//.pipe(uglify({ preserveComments: 'license' }))

gulp.task( 'watch', function() {
	// Inspect changes in all scss files.
	gulp.watch( [ './sass/**/*.scss', './ts/**/*.ts' ], gulp.parallel( [ 'public-scss', 'public-ts' ] ) );
} );

//gulp.task( 'default', gulp.parallel( 'watch', browserSync, 'public-scss', 'public-ts' ) );
gulp.task( 'default', gulp.parallel( 'watch', 'public-scss', 'public-ts' ) );
