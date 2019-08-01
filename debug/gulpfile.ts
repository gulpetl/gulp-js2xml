let gulp = require('gulp')
import { jsontoxml } from '../src/plugin'
import { xmltojson } from 'gulp-xmltojson'
import * as loglevel from 'loglevel'
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as loglevel.LogLevelDesc)

require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;

//the plugin will be called here
export function calljsontoxml(callback: any) {
  gulp.src('../testdata/*.json')
    .pipe(jsontoxml({ compact: true, spaces: 4 }))
    .on('data', function (file: any) {
      console.log('Done creating ' + file.basename)
    })
    .pipe(gulp.dest('../testdata/processed'))
  callback();
}

//the roundtrip back to json using our companion plugin gulp-xmltojson
export function callxmltojson(callback: any) {
  gulp.src('../testdata/processed/*.xml')
    .pipe(xmltojson({ compact: true, spaces: 4 }))
    .on('data', function (file: any) {
      console.log('Done creating ' + file.basename)
    })
    .pipe(gulp.dest('../testdata/processed/round trip'))
    .on('end', function () {
      log.info('gulp task complete')
    })
  callback();
};


exports.default = gulp.series(calljsontoxml)
exports.roundtrip = gulp.series(calljsontoxml, callxmltojson)