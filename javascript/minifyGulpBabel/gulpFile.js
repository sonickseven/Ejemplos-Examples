const gulp=require('gulp'),
	babel=require('gulp-babel'),
	minify=require('gulp-babel-minify'),
	fs=require('fs'),
	cssmin=require('gulp-cssmin')


//minify CSS files
gulp.task('minCss', ()=>{
	gulp.src('./Css/*.css')
	.pipe(cssmin())
	.pipe(gulp.dest('./css/'))
})

// minify JS files
gulp.task('minJs', ()=>{
	gulp.src('./Js/*.js')
	.pipe(babel({
		presets: ['env'],
		plugins: ['transform-remove-console']
	}))
	//minify js
	.pipe(minify({
		mangle:{
			keepClassName: true
		}
	}))
	.pipe(gulp.dest('./js/'))
})

function runSequencial(tasks){
	if(!tasks||!tasks.length) return;
	let task=tasks[0]
	gulp.start(task, ()=>{
		console.log(`${task} finished`)
		runSequencial(tasks.slice(1))
	})
}


//all in one task
gulp.task('default', ()=>{ runSequencial(['minJs', 'minCss']) })