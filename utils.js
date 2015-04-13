(function() {
  'use strict';

  module.exports.completedExamples = {};

  class Utils {
    static drawHeader(text) {
      var paddedText = " " + text + " ";
      var result = "\n";
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 40; j++) {
          if (i == 1 && (j > 2 && j < (3 + paddedText.length))) {
            result += paddedText[j-3];
          } else {
            result += "*";
          }
        }
        result += "\n";
      }
      console.log(result);
    }

    static exampleSet(name, fn) {
      if (!module.exports.completedExamples[name]) {
        module.exports.completedExamples[name] = true;
        var show = false;
        for(var i = 0; i < process.argv.length; i++) {
          if (process.argv[i] === name || process.argv[i] === "all")
            show = true;
        }
        if (show) {
          this.drawHeader(name);
          fn();
          this.drawHeader("/" + name);
        }
      }
    }
  }

  module.exports.drawHeader =  Utils.drawHeader;
  module.exports.exampleSet =  Utils.exampleSet;
})()
