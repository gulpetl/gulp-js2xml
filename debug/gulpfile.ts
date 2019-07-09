let gulp = require('gulp')
import {runXml2js} from '../src/plugin'
import * as loglevel from 'loglevel'
import { strict } from 'assert';
const log = loglevel.getLogger('gulpfile')
log.setLevel((process.env.DEBUG_LEVEL || 'warn') as log.LogLevelDesc)

const pkginfo = require('pkginfo')(module); // project package.json info into module.exports
const PLUGIN_NAME = module.exports.name;

//the plugin will be called here
    export function xml () {
      gulp.src('../testdata/*.json')
        .pipe(runXml2js())
        .pipe(gulp.dest('../testdata/processed'));
    };
    

exports.default = xml