<template>
    <div class="post">
        <div class="form">
            <div class="form-row">
                <span class="form-input">
                    <select ref="method">
                        <option value="POST">POST</option>
                        <option value="GET">GET</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </span>
                <span class="form-input url">
                    <input type="text" placeholder="请输入要请求的url地址 ，例如：https://www.baidu.com/" ref="url"/>
                </span>
                <button class="btn bigBtn" @click="sendRequest()">发起请求</button>
            </div>
            <div class="form-row">
                <label class="from-title">请求头:</label>
                <span class="form-input codeView">
                    <codemirror v-model="headers" :options="cmOptions"/>
                </span>
            </div>
            <div class="form-row">
                <label class="from-title">请求参数:</label>
                <span class="form-input codeView">
                    <codemirror v-model="params" :options="cmOptions"/>
                </span>
            </div>
            <div class="form-row">
                 <span class="form-input codeView">
                    <codemirror v-model="result" :options="cmOptions"/>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { codemirror } from "vue-codemirror";

import "./style";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/seti.css";
import common from "utils/common";
import renderer from 'renderer';

export default {
  name: "post",
  components: {
    codemirror
  },
  data() {
    return {
      headers: "{}",
      params:'[]',
      result:'',
      cmOptions: {
        tabSize: 4,
        mode: "javascript",
        theme: "seti",
        lineNumbers: true,
        line: true
      }
    };
  },
  methods: {
    sendRequest() {
        let ops = {
            url:this.$refs.url.value,
            method:this.$refs.method.value,
            headers:this.headers,
            params:this.params
        }
        renderer.subscribeM('post',ops,(res)=>{
            this.result = res;
            this.formatJson();
        })
    },
    formatJson() {
      common.formatJson(this.result, (state, json) => {
        if (state) {
          this.code = json;
        }
      });
    }
  }
};
</script>