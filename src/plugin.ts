var map = require('map-stream');
var rext = require('replace-ext');
var fs = require('fs');
import Vinyl = require('vinyl')
import PluginError = require('plugin-error');
const PLUGIN_NAME = module.exports.name;
var convert = require('xml-js');

export function runXml2js(options?: any) {
  var options = options ? options : {};

  function modifyContents(file: Vinyl, cb:Function) {
    var json = fs.readFileSync(file.path, 'utf8');
    if (file.isNull()) return cb(null, file); 
    if (file.isStream()) return cb(new Error("gulp-xml2js: Streaming not supported")); // pass error if streaming is not supported
    let returnErr: any = null

    //Will parse the JSON into XML if the file is in
    if (file.isBuffer()){
      //let fileBuf : Buffer = (json.contents as Buffer)
      let xmlResult:any
        try {
         /* resultHolder = fileBuf.toString('utf8')
          lineObj = JSON.parse(resultHolder)
          xmlResult = builder.buildObject(lineObj)*/
          var options = {compact: true, ignoreComment: true, spaces: 4};
          xmlResult = convert.json2xml(json, options);
          
          
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
