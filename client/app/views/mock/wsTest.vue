<template>
    <div class="wsTest">
        <div class="ws-Test">
            <input type="text" v-model="key" class="url_input" placeholder="请输入你要监听的url"/>
            <button class="btn bigBtn" @click="start()">监听</button>
            <button class="btn bigBtn" @click="stop()">停止</button>
        </div>
        <div class="action">
            <button class="btnCancel" ref="btnCopy">复制日志</button>
            <button class="btnCancel" @click="clear()">清空日志</button>
        </div>
        <div class="wsResult">
            <div  :class="{active:index == activeIndex}" @click="select(index)"  v-for="(item,index) in list" :key="index">
                {{item}}
            </div>
        </div>
    </div>
</template>
<script>
import common from "utils/common";
export default {
  name: "wsTest",
  data() {
    return { key: "", list: [],activeIndex:-1 };
  },
  mounted() {
    common.copy(
      this.$refs.btnCopy,
      () => {
        return this.list.join("\n");
      },
      this.valert
    );
  },
  methods: {
    select(index) {
      this.activeIndex == index
        ? (this.activeIndex = -1)
        : (this.activeIndex = index);
    },
    start() {
    let _self = this;   
      try {
        this.ws = new WebSocket(this.key);
        this.ws.onopen = function() {
          let now = new Date().toLocaleString();
          _self.list.push(now + "注册成功:" + _self.key);
        };
        this.ws.onclose = function() {
          let now = new Date().toLocaleString();
          _self.list.push(now + "链接断开.");
        };
        this.ws.onmessage = function(evt) {
          var received_msg = evt.data;
          _self.result = received_msg;
          let now = new Date().toLocaleString();
          _self.list.push(now + " " + received_msg);
          if (_self.list.length > 1000) {
            _self.list.shift();
          }
        };
      } catch (ex) {
          let now = new Date().toLocaleString();
          _self.list.push(now + " ERROR:" + ex.message);
      }
    },
    clear() {
      this.list = [];
    },
    stop() {
      this.ws && this.ws.close();
    }
  }
};
</script>