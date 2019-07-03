"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map = require('map-stream');
var rext = require('replace-ext');
var fs = require('fs'), xml2js = require('xml2js');
const PluginError = require("plugin-error");
const PLUGIN_NAME = module.exports.name;
function runXml2js(options) {
    var options = options ? options : {};
    function modifyContents(file, cb) {
        if (file.isNull())
            return cb(null, file);
        if (file.isStream())
            return cb(new Error("gulp-xml2js: Streaming not supported")); // pass error if streaming is not supported
        let returnErr = null;
        if (file.isBuffer()) {
            let fileBuf = file.contents;
            let resultHolder;
            let lineObj;
            let xmlResult;
            var builder = new xml2js.Builder();
            try {
                resultHolder = fileBuf.toString('utf8');
                lineObj = JSON.parse(resultHolder);
                xmlResult = builder.buildObject(lineObj);
                var obj = { name: "Super", Surname: "Man", age: 23 };
            }
            catch (err) {
                returnErr = new PluginError(PLUGIN_NAME, err);
            }
            file.contents = new Buffer(xmlResult);
            file.path = rext(file.path, '.xml');
        }
        cb(returnErr, file);
    }
    return map(modifyContents);
}
exports.runXml2js = runXml2js;
;
//# sourceMappingURL=plugin.js.map