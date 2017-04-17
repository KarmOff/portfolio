'use strict';

module.exports = function() {
  $.gulp.task('copy:media', $.gulp.parallel (
    'copy:image',
    'copy:fonts'
  ))};
