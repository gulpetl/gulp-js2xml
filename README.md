# gulp-json2xml #
The goal of this plugin is to take a JSON file and convert it to XML. The JSON files are passed through gulp.src in the gulpfile
A sample JSON file looks like this 
[{"carModel":"Audi","price":10000,"color":"blue"},{"carModel":"BMW","price":15000,"color":"red"},{"carModel":"Mercedes","price":20000,"color":"yellow"},{"carModel":"Porsche","price":30000,"color":"green"}]

```
This plugin takes in both compact and non compact JSON files and the user can specify whether or not the file is in compact format by setting 'compact:true' or 'compact:false' in the options parameter. 

The basic difference between a compact and a non compact JSON is that xml tag <a/> can be resultant of compact input like {"a":{}} or a non-compact output like {"elements":[{"type":"element","name":"a"}]}.
```

### Usage
**data-etl**
--plugin accept a configObj as its first parameter. The configObj will contain any info the plugin needs.


In addition the plugin also allows the user to set different options in the options variable. Following is the table of options users can set
```
Option          	|Default	       | Description
spaces	                |0               | Number of spaces to be used for indenting XML output. Passing characters like ' ' or '\t' are also accepted.
compact		        |false             | Whether the input object is in compact form or not. By default, input is expected to be in non-compact form.
                                       | IMPORTANT: Remeber to set this option compact: true if you are supplying normal json (which is likely equivalent to compact form). Otherwise, the function assumes your json input is non-compact form and you will not get a result if it is not in that form. See Synopsis to know the difference between the two json forms
fullTagEmptyElement	|false	          | Whether to produce element without sub-elements as full tag pairs <a></a> rather than self closing tag <a/>.
indentCdata	false	                  | Whether to write CData in a new line and indent it. Will generate <a>\n <![CDATA[foo]]></a> instead of <a><![CDATA[foo]]></a>.      
indentAttributes	|false	          | Whether to print attributes across multiple lines and indent them (when spaces is not 0). See example.
ignoreDeclaration	|false	          | Whether to ignore writing declaration directives of xml. For example, <?xml?> will be ignored.
ignoreInstruction	|false	          | Whether to ignore writing processing instruction of xml. For example, <?go there?> will be ignored.
ignoreAttributes	|false	          | Whether to ignore writing attributes of the elements. For example, x="1" in <a x="1"></a> will be ignored
ignoreComment	        |false	          | Whether to ignore writing comments of the elements. That is, no <!-- --> will be generated.
ignoreCdata             |false	          | Whether to ignore writing CData of the elements. That is, no <![CDATA[ ]]> will be generated.
ignoreDoctype	        |false	          | Whether to ignore writing Doctype of the elements. That is, no <!DOCTYPE > will be generated.
ignoreText	        |false	          | Whether to ignore writing texts of the elements. For example, hi text in <a>hi</a> will be ignored.
```
```

##### Sample gulpfile.js
```
let gulp = require('gulp')
import {runXml2js} from '../src/plugin'

exports.default = function() {
    return src('data/*.json')
    // pipe the files through our json2xml plugin
    .pipe(runXml2js())
    .pipe(gulp.dest('../testdata/processed'));
    };
```

### Testing

We are using [Jest](https://facebook.github.io/jest/docs/en/getting-started.html) for our testing. Each of our tests are in the `test` folder.

- Run `npm test` to run the test suites



Note: This document is written in [Markdown](https://daringfireball.net/projects/markdown/). We like to use [Typora](https://typora.io/) and [Markdown Preview Plus](https://chrome.google.com/webstore/detail/markdown-preview-plus/febilkbfcbhebfnokafefeacimjdckgl?hl=en-US) for our Markdown work..
