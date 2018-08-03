<template>
<div class="mockConfig">
    <div class="form">
        <div class="form-row">
            <label class="from-title">端口号</label>
            <span class="form-input">
                    <input type="text" v-model="vport"/>
                </span>
        </div>
        <div class="form-row">
            <label class="from-title">服务状态</label>
            <span class="form-input">
                    {{this.status?"开启":"停止"}}
                </span>
        </div>
        <div class="form-row">
            <label class="from-title">http地址</label>
            <span class="form-input">
                    {{this.url}}
                    <button class="btnCancel" @click="preview()">测试</button>
                    <button class="btnCancel" ref="btnCopy">复制</button>
                </span>
        </div>
        <div class="form-action">
            <button class="btn bigBtn" @click="start()">{{!this.status?"开启":"停止"}}</button>
        </div>
    </div>
    <pre>
      const ws = new WebSocket({{this.url}});
        // 建立 web socket 连接成功触发事件
        ws.onopen = function() {
          console.log('连接成功!')
        };

        // 接收服务端数据时触发事件
        ws.onmessage = function(evt) {
          var received_msg = evt.data;
          console.log(received_msg);
        };
    </pre>
    <div class="wsResult">{{result}}</div>
</div>
</template>

<script>
import store from "store/store";
import renderer from "renderer";
import common from "utils/common";
import { MOCK_WS_START } from "./actionTypes";

export default {
  name: "mockSocketConfig",
  data() {
    return {
      vport: store.state.mock.wsPort,
      result: ""
    };
  },
  computed: {
    port() {
      return store.state.mock.wsPort;
    },
    url() {
      return "ws://" + this.address + ":" + this.vport + "/ws";
    },
    address() {
      return renderer.getIPAdress();
    },
    status() {
      return store.state.mock.wsStatus;
    }
  },
  mounted() {
    common.copy(
      this.$refs.btnCopy,
      () => {
        return this.url;
      },
      this.valert
    );
  },
  methods: {
    start() {
      store.dispatch({
        type: MOCK_WS_START,
        data: {
          port: this.vport,
          url: this.url,
          status: store.state.mock.wsStatus
        }
      });
    },
    preview() {
      let status = store.state.mock.wsStatus;
      let _self = this;
      if (!status) {
        this.valert({ content: "mock服务未启动，请开启服务后预览." });
      } else {
        const ws = new WebSocket(this.url);
        // 建立 web socket 连接成功触发事件
        ws.onopen = function() {
          // 使用 send() 方法发送数据
          _self.result = '连接成功!'
        };

        // 接收服务端数据时触发事件
        ws.onmessage = function(evt) {
          var received_msg = evt.data;
          _self.result =received_msg
        };
      }
    }
  }
};
</script>
