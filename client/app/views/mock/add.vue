<template>
    <div class="mockAdd">
        <div class="codeView">
            <codemirror v-model="code" :options="cmOptions"/>
        </div>
        <div class="mockFrom">
          <div class="form">
            <div class="form-row">
                <label class="from-title">标题</label>
                <span class="form-input">
                    <input type="text"  ref="title" v-model="title"/>
                </span>
            </div>
            <div class="form-row">
                <label class="from-title">URL</label>
                <span class="form-input">
                    <input type="text" ref="url"  v-model="url"/>
                </span>
            </div>
            <div class="form-row">
                <label class="from-title">请求方式</label>
                <span class="form-input">
                    <label><input type="checkbox"  ref="method" value="POST" v-model="methods"/>POST</label>
                    <label><input type="checkbox"  ref="method" value="GET" v-model="methods"/>GET</label>
                    <label><input type="checkbox"  ref="method" value="PUT" v-model="methods"/>PUT</label>
                    <label><input type="checkbox"  ref="method" value="DELETE" v-model="methods"/>DELETE</label>
                </span>
            </div>
            <div class="form-action">
                <button class="btn bigBtn" @click="formatJson()">格式化</button>
                <button class="btn bigBtn" @click="save()">保存</button>
            </div>
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
import common from "utils/common";
import store from "store/store";
import { MOCK_ADD, MOCK_UPDATE } from "./actionTypes";
// component
export default {
  name: "add",
  props: ["prop"],
  created() {
    console.log(this.$props.prop);
    this.pid = this.$props.prop.pid;
    let index = this.$props.prop.index;
    if (index >= 0) {
      let obj = store.state.mock.projectList[this.pid].list[index];
      this.url = obj.url;
      this.id = obj.id;
      this.title = obj.title;
      this.methods = obj.methods;
      this.code = obj.content;
    }
  },
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
      id: -1,
      url: "/",
      title: "",
      methods: [],
      pid: this.$props.prop.pid
    };
  },
  methods: {
    formatJson() {
      common.formatJson(this.code, (state, json) => {
        if (state) {
          this.code = json;
        }
      });
    },
    save() {
      if (this.id == -1) {
        store.dispatch({
          type: MOCK_ADD,
          data: {
            title: this.title,
            content: this.code,
            url: this.url,
            methods: this.methods,
            pid: this.pid,
            callback: () => {
              this.valert({ content: "添加成功！" });
              this.vtab.close();
            }
          }
        });
      } else {
        store.dispatch({
          type: MOCK_UPDATE,
          data: {
            id: this.id,
            title: this.title,
            content: this.code,
            url: this.url,
            methods: this.methods,
            pid: this.pid,
            callback: () => {
              this.valert({ content: "修改成功！" });
              this.vtab.close();
            }
          }
        });
      }
    }
  },
  components: {
    codemirror
  }
};
</script>
