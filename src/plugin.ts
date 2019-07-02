var map = require('map-stream');
var rext = require('replace-ext');
//var xml2js = require('xml2js');
var fs = require('fs'),
    xml2js = require('xml2js');


import Vinyl = require('vinyl')


export function runXml2js(options?: any) {
  var options = options ? options : {};

  function modifyContents(file: Vinyl, cb:Function) {
    
    if (file.isNull()) return cb(null, file);
    if (file.isStream()) return cb(new Error("gulp-xml2js: Streaming not supported")); // pass error if streaming is not supported
 
    let fileBuf : Buffer = (file.contents as Buffer)
    xml2js(fileBuf.toString('utf8'), options, function(err:any, result:any) {
      if (err) cb(new Error(err));
      var builder = new xml2js.Builder();
      var xml = builder.buildObject(result)
      file.contents = new Buffer(xml);
      file.path = rext(file.path, '.js');
    });
    
    cb(null, file);
  }

  return map(modifyContents);
};
