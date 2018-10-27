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
                <button class="btn bigBtn" @click="setHeader()">设置头</button>
                <button class="btn bigBtn" @click="setParams()">请求参数</button>
            </div>
            <div class="history" v-show="history.length">
              历史请求:<span class="btnSmall" @click="select(index)" v-for="(item,index) in history" :key="index">{{index}}</span>
              <span class="btnSmall" @click="clear()">清空</span>
            </div>
            <div class="form-row" v-if="isheader">
                <label class="from-title">请求头:</label>
                <span class="form-input codeView headerEdit">
                    <codemirror v-model="headers" :options="cmOptions"/>
                </span>
            </div>
            <div class="form-row" v-if="isparams">
                <label class="from-title">请求参数:</label>
                <span class="form-input codeView paramsEdit">
                    <codemirror v-model="params" :options="cmOptions"/>
                </span>
            </div>
            <div class="form-row">
                <label class="from-title">返回结果:</label>
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
import renderer from "renderer";


export default {
  name: "post",
  components: {
    codemirror
  },
  data() {
    return {
      history:[],
      isheader: false,
      isparams: false,
      headers: "",
      params: "",
      result: "",
      cmOptions: {
        tabSize: 4,
        mode: "javascript",
        theme: "seti",
        lineNumbers: true,
        line: true
      }
    };
  },
  mounted() {
    this.history = JSON.parse(localStorage.getItem('postHistory')||'[]') ;
  },
  methods: {
    clear(){
      this.history=[];
    },
    select(index){
      let item = this.history[index];
      this.$refs.url.value = item.url;
      this.$refs.method.value= item.method;
      // this.headers = JSON.stringify( item.headers);
      common.formatJson(item.headers, (state, json) => {
        if (state) {
          this.headers = json;
        }
      });
      this.params = item.params;
      this.isparams = item.isparams;
      this.isheader = this.isheader;
    },
    setHeader() {
      this.isheader = !this.isheader;
    },
    setParams() {
      this.isparams = !this.isparams;
    },
    sendRequest() {
       common.toJson(this.headers,(res)=>{
        let result =res;
        if(result){
          this.headers = JSON.stringify(result);
        }else{
          this.headers = '';
        }
        common.formatJson(this.headers, (state, json) => {
          if (state) {
            this.headers = json;
          }
        });
        let ops = {
          url: this.$refs.url.value,
          method: this.$refs.method.value,
          headers: result,
          params: this.params
        };
        if(/^\{/.test(ops.params)){
          //是json格式转化成url
          ops.params = common.param(JSON.parse(ops.params))
        }
        this.result = '';
        this.history.push(Object.assign(ops,{isheader:this.isheader,isparams:this.isparams}));
        localStorage.setItem('postHistory',JSON.stringify(this.history));
        renderer.subscribeM("post", ops, res => {
          this.result = res;
          this.formatJson();
        });
      });
    },
    formatJson() {
      common.formatJson(this.result, (state, json) => {
        if (state) {
          this.result = json;
        }
      });
    }
  }
};
</script>