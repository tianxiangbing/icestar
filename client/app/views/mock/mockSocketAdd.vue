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
                <label class="from-title">频率/s</label>
                <span class="form-input">
                    <input type="text" ref="frequency" value="1" v-model="frequency"/>
                </span>
            </div>
            <div class="form-row">
                <label class="from-title">随机规则</label>
                <span class="form-input">
                    <input type="text" ref="rule"   v-model="rule"/>
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
import "codemirror/lib/codemirror.css";
import "codemirror/theme/seti.css";
import common from "utils/common";
import store from "store/store";
import { MOCK_WS_ADD, MOCK_WS_UPDATE } from "./actionTypes";
// component
export default {
  name: "wsadd",
  props: ["prop"],
  created() {
    let index = this.$props.prop.index;
    if (index >= 0) {
      let obj = store.state.mock.wsList[index];
      this.frequency = obj.frequency;
      this.id = obj.id;
      this.title = obj.title;
      this.rule = obj.rule;
      this.code = obj.content;
    }
  },
  data() {
    return {
      code: "{\"random\":@random}",
      cmOptions: {
        tabSize: 4,
        mode: "javascript",
        theme: "seti",
        lineNumbers: true,
        line: true
      },
      frequency:1,
      id: -1,
      title: "",
      rule:"(Math.random()*10).toFixed(2)"
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
          type: MOCK_WS_ADD,
          data: {
            title: this.title,
            content: this.code,
            rule: this.rule,
            frequency: this.frequency,
            callback: () => {
              this.valert({ content: "添加成功！" });
              this.vtab.close();
            }
          }
        });
      } else {
        store.dispatch({
          type: MOCK_WS_UPDATE,
          data: {
            id: this.id,
            title: this.title,
            content: this.code,
            rule: this.rule,
            frequency: this.frequency,
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
