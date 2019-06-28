let gulp = require('gulp')
import {runXml2js} from '../src/plugin'
import * as loglevel from 'loglevel'
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as log.LogLevelDesc)
import * as rename from 'gulp-rename'
const errorHandler = require('gulp-error-handle'); // handle all errors in one handler, but still stop the stream if there are errors

import * as vinylPaths from 'vinyl-paths';
import * as del from 'del';

const pkginfo = require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;

// control the plugin's logging level separately from this 'gulpfile' logging
//const pluginLog = loglevel.getLogger(PLUGIN_NAME)
//pluginLog.setLevel('debug')


/*
function demonstrateHandlelines(callback: any) {
  log.info('gulp starting for ' + PLUGIN_NAME)
  return gulp.src('../testdata/*.ndjson',{buffer:false})
      .pipe(errorHandler(function(err:any) {
        log.error('oops: ' + err)
        callback(err)
      }))
      // call allCaps function above for each line
      .pipe(handlelines({}, { transformCallback: allCaps }))
      // call the built-in handleline callback (by passing no callbacks to override the built-in default), which adds an extra param
      .pipe(handlelines({ propsToAdd: { extraParam: 1 } }))
      .pipe(rename({
        suffix: "-fixed",
      }))      
      .pipe(gulp.dest('../testdata/processed'))
      // .pipe(vinylPaths((path) => {
      //   // experimenting with deleting files, per https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md.
      //   // This actually deletes the NEW files, not the originals! Try gulp-revert-path
      //   return del(path, {force:true})
      // }))
      .on('end', function () {
        log.info('end')
        callback()
      })
    }
*/

    export function xml () {
      gulp.src('../testdata/normal.xml')
        .pipe(runXml2js())
        .pipe(gulp.dest('../testdata/processed'));
    };
    
    export function nested () {
      gulp.src('../testdata/nested.xml')
        .pipe(runXml2js())
        .pipe(gulp.dest('../testdata/processed'));
    };    

exports.default = xml