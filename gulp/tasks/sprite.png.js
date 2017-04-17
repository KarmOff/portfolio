'use strict';

module.exports = function() {
  $.gulp.task('sprite:pngif', function () {
    return  $.gulp.src('./source/images/sprite/*.{png, gif}')
    .pipe($.gp.spritesmith({
      imgName: 'sprite.png',
      padding: 5,
      cssName: 'sprite.css'
    }))
    .pipe($.gulp.dest($.config.root + '/assets/img/sprite'));
})
};
