'use strict';

import config from './_gulp/config.json';
import vendors from './source/_conf/vendors.json';

import gulp from 'gulp';
import inject from 'gulp-inject';
import es from 'event-stream';
import path from 'path';
import folderSize from 'get-folder-size';
import rename from 'gulp-rename';
import open from 'gulp-open';
import replace from 'gulp-replace';
import {getDirectories} from './_gulp/helpers';

import scripts from './_gulp/scripts';
import styles from './_gulp/styles';
import './_gulp/images';
import './_gulp/global';

function getClicktag() {
  return vendors[config.vendor].clicktag.html;
}

/**
* Build html files.
*/
gulp.task('build:html', function() {
  return gulp.src(config.html.source)
    .pipe(replace('<!-- clicktag -->', getClicktag()))
    .pipe(
      inject(es.merge(scripts, styles), {
        starttag: '<!-- inject:{{ext}} -->',
        transform: function(filePath, file, i, len, target) {
          if (!config.multiBanner || file.dirname.split(path.sep).pop() === target.stem) {
            // return file contents as string
            return file.contents.toString('utf8');
          }
        },
        removeTags: true,
      })
    )
    .pipe(rename(function(file) {
      if (config.multiBanner) {
        file.dirname = path.join(file.dirname, file.basename);
        file.basename = 'index';
      }
    }))
    .pipe(gulp.dest(config.html.dest));
});

/**
 * Open build banners.
 */
gulp.task('open', function() {
  return gulp.src('./build/**/*.html')
    .pipe(open());
});

/**
 * Print size of build banners.
 * @param  {Function} done Callback function.
 * @TODO Print size on disk.
 */
function printBuildSize(done) {
  let buildPath = './build/';
  let directories = getDirectories(buildPath);
  for (let i = 0; i < directories.length; i++) {
    folderSize(path.join(buildPath, directories[i]), function(err, size) {
      if (err) { throw err; }

      console.log(directories[i].replace(/\b\w/g, function(l) { return l.toUpperCase(); }) + ': ' + (size / 1024).toFixed(2) + ' kb');
    });
  }

  done();
}

/**
 * Watch task.
 * @param  {Function} done Callback function.
 * @FIXME Currently not working. Fix this.
 */
function watch(done) {
  gulp.watch(config.html.source).on('change', gulp.series('build:html'));
  gulp.watch(config.css.source).on('change', gulp.series('build:html'));
  gulp.watch(config.js.source).on('change', gulp.series('build:html'));
  gulp.watch(config.images.source).on('change', gulp.series('copy:images'));
  gulp.watch(config.globalFiles.source).on('change', gulp.series('copy:global'));
}

/**
* Build all.
*/
gulp.task('build', gulp.series('build:html', 'copy:images', 'copy:global', printBuildSize));

/**
* Build all and start watch task.
*/
gulp.task('watch', gulp.series('build', watch));
