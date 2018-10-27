<template>
    <div class="mockAdd formatJson">
        <div class="codeView">
            <codemirror ref="editor" v-model="code" :options="cmOptions"/>
        </div>
        <div class="mockFrom">
          <div class="form">
            <div class="form-action">
                <button class="btn bigBtn" @click="formatJson()">JSON验证</button>
            </div>
          </div>
            <div class="result">
                {{result}}
            </div>
        </div>
    </div>
</template>
<script>
// require component
import { codemirror } from "vue-codemirror";

import "./style";
import "codemirror/mode/javascript/javascript.js";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/seti.css";
import jsl from "utils/validateJson";
// component
export default {
  name: "formatJson",
  data() {
    return {
      code: "{}",
      cmOptions: {
        tabSize: 4,
        mode: "javascript",
        theme: "seti",
        lineNumbers: true,
        line: true
      },
      result: ""
    };
  },
  methods: {
    formatJson() {
      var lineNum, lineMatches, lineStart, lineEnd, jsonVal, result;
      jsonVal = this.code;
      try {
        result = jsl.parser.parse(jsonVal);
        if (result) {
          this.result = "Valid JSON";
        } else {
          alert("An unknown error occurred. Please contact Arc90.");
        }
      } catch (parseException) {
        try {
          jsonVal = jsl.format.formatJson(jsonVal);
          this.code = jsonVal;
          result = jsl.parser.parse(jsonVal);
        } catch (e) {
          parseException = e;
        }
        lineMatches = parseException.message.match(/line ([0-9]*)/);
        if (
          lineMatches &&
          typeof lineMatches === "object" &&
          lineMatches.length > 1
        ) {
          lineNum = parseInt(lineMatches[1], 10);
          if (lineNum === 1) {
            lineStart = 0;
          } else {
            lineStart = getNthPos(jsonVal, "\n", lineNum - 1);
          }
          lineEnd = jsonVal.indexOf("\n", lineStart);
          if (lineEnd < 0) {
            lineEnd = jsonVal.length;
          }
          // $('#json_input').focus().caret(lineStart, lineEnd)
        //   this.$refs.editor.$el.focus().caret(lineStart, lineEnd);
        }
        this.result = parseException.message;
      }
    }
  },
  components: {
    codemirror
  }
};
function getNthPos(searchStr, char, pos) {
  var i,
    charCount = 0,
    strArr = searchStr.split(char);
  if (pos === 0) {
    return 0;
  }
  for (i = 0; i < pos; i++) {
    if (i >= strArr.length) {
      return -1;
    }
    charCount += strArr[i].length + char.length;
  }
  return charCount;
}
</script>
