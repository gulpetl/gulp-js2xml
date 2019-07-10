# gulp-json2xml #
This plugin is a wrapper for npm package 'xml-js'. To learn about 'xml-js', refer to the following link
https://www.npmjs.com/package/xml-js

The goal of this plugin is to take a JSON file and convert it to XML. The JSON files are passed through gulp.src in the gulpfile.
A sample JSON looks like 
```
{"root":{"section":[{"title":["First"],"content":["Data: buffer"]},{"title":["Second"],"content":["Data: string"]}]}}
```
The plugin currently works on buffer mode only.

# Compact vs Non Compact #
This plugin takes in both compact and non compact JSON files and the user can specify whether or not the file is in compact format by setting 'compact:true' or 'compact:false' in the options parameter. A sample image comparing compact and non compact JSON can be found in the link
https://github.com/nashwaan/xml-js/blob/master/artwork/synopsis.svg

A sample compact JSON would look like
```
{"root":{"section":[{"title":["First"],"content":["Data: buffer"]},{"title":["Second"],"content":["Data: string"]}]}}   
```
While a non compact version of the same JSON would look like 
```
{  
   "root":{  
      "section":[  
         {  
            "title":[  
               "First"
            ],
            "content":[  
               "Data: buffer"
            ]
         },
         {  
            "title":[  
               "Second"
            ],
            "content":[  
               "Data: string"
            ]
         }
      ]
   }
}
```

To learn more about the difference between Compact and Non Compact JSON refer to the following link
https://github.com/nashwaan/xml-js#compact-vs-non-compact


### Usage
**gulp-json2xml** plugin accepts a configObj as its parameter. The configObj will contain any info the plugin needs.

A sample configObj passed during the call for the json2xml plugin in the gulp file
```
var sampleConfigObj = {compact: true, ignoreDeclaration: true, spaces: 4}; // sample configObj
.pipe(runXml2js({compact: true, ignoreDeclaration: true, spaces: 4}))
```

The configObj in this situation is used for users to enter in options that the user can enter inorder to customize the resultant xml file. The table containing the options can be found in the following link 
https://github.com/nashwaan/xml-js#options-for-converting-js-object--json--xml


##### Sample gulpfile.js
```
let gulp = require('gulp')
import {runXml2js} from '../src/plugin'
var sampleConfigObj = {compact: true, ignoreDeclaration: true, spaces: 4}; // sample configObj

exports.default = function() {
    return src('data/*.json')
    // pipe the files through our json2xml plugin
    .pipe(runXml2js(sampleConfigObj))
    .pipe(gulp.dest('../testdata/processed'));
    };
```
### Quick Start
* Dependencies: 
    * [git](https://git-scm.com/downloads)
    * [nodejs](https://nodejs.org/en/download/releases/) - At least v6.3 (6.9 for Windows) required for TypeScript debugging
    * npm (installs with Node)
    * typescript - installed as a development dependency
* Clone this repo and run `npm install` to install npm packages
* Debug: with [VScode](https://code.visualstudio.com/download) use `Open Folder` to open the project folder, then hit F5 to debug. This runs without compiling to javascript using [ts-node](https://www.npmjs.com/package/ts-node)
* Test: `npm test` or `npm t`
* Compile to javascript: `npm run build`

### Testing

We are using [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) for our testing. Each of our tests are in the `test` folder.

- Run `npm test` to run the test suites



Note: This document is written in [Markdown](https://daringfireball.net/projects/markdown/). We like to use [Typora](https://typora.io/) and [Markdown Preview Plus](https://chrome.google.com/webstore/detail/markdown-preview-plus/febilkbfcbhebfnokafefeacimjdckgl?hl=en-US) for our Markdown work..
