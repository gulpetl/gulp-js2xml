let gulp = require('gulp')
import {json2xml} from '../src/plugin'
import * as loglevel from 'loglevel'
//import { strict } from 'assert';
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as log.LogLevelDesc)
var options = {compact: true, ignoreDeclaration: true, spaces: 4};
const pkginfo = require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;

//the plugin will be called here
    export function xml () {
      gulp.src('../testdata/*.json')
        .pipe(json2xml(options))
        .pipe(gulp.dest('../testdata/processed'));
    };
    

exports.default = xml