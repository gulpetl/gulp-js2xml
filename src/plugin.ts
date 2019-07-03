var map = require('map-stream');
var rext = require('replace-ext');
var fs = require('fs'),
    xml2js = require('xml2js');
import Vinyl = require('vinyl')
import PluginError = require('plugin-error');
const PLUGIN_NAME = module.exports.name;


export function runXml2js(options?: any) {
  var options = options ? options : {};

  function modifyContents(file: Vinyl, cb:Function) {
    
    if (file.isNull()) return cb(null, file); 
    if (file.isStream()) return cb(new Error("gulp-xml2js: Streaming not supported")); // pass error if streaming is not supported
    let returnErr: any = null

    //Will parse the JSON into XML if the file is in buffer mode
    if (file.isBuffer()){
      let fileBuf : Buffer = (file.contents as Buffer)
      let resultHolder: any
      let lineObj: any
      let xmlResult:any
      var builder = new xml2js.Builder();
        try {
          resultHolder = fileBuf.toString('utf8')
          lineObj = JSON.parse(resultHolder)
          xmlResult = builder.buildObject(lineObj)        
    }catch(err){
      returnErr = new PluginError(PLUGIN_NAME, err);
    }
    file.contents = new Buffer(xmlResult);
    file.path = rext(file.path, '.xml');

  }
    cb(returnErr, file);
  }
  return map(modifyContents);
};
