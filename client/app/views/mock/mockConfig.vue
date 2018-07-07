<template>
<div class="mockConfig">
    <div class="form">
        <div class="form-row">
            <label class="from-title">端口号</label>
            <span class="form-input">
                    <input type="text" v-model="port"/>
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
                    <button class="btnCancel" @click="preview()">预览</button>
                    <button class="btnCancel" ref="btnCopy" @click="copy()">复制</button>
                </span>
        </div>
        <div class="form-action">
            <button class="btn bigBtn" @click="start()">{{!this.status?"开启":"停止"}}</button>
        </div>
    </div>
</div>
</template>

<script>
import store from "store/store";
import renderer from 'renderer';
import common from 'utils/common';

export default {
    name: "mockConfig",
    data() {
        return {
            status: false
        };
    },
    computed: {
        port() {
            return store.state.mock.port;
        },
        url() {
            return this.address + ":" + this.port;
        },
        address() {
            return renderer.getIPAdress();
        }
    },
    methods: {
        start() {

        },
        preview() {
            renderer.openUrl()
        },
        copy() {
            common.copy(this.refs.btnCopy,this.url);
        }
    }
};
</script>
