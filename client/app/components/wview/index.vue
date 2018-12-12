<template>
    <div>
        <webview :src="src" ref="foo" autosize allowpopups></webview>
    </div>
</template>
<script>
    export default {
        name:"wview",
        props:{
            src:""
        },
        mounted(){
            const webview = this.$refs.foo;
            webview.addEventListener('event-will-navigate', (e) => {
                // debugger;
                // const protocol = require('url').parse(e.url).protocol;
                // if (protocol === 'http:' || protocol === 'https:') {
                    // webview.src = e.url;
                // }
                this.vtab.to({
                    to: "wview",
                    title: "曲线",
                    prop: { src:e.url }
                });
                e.preventDefault()
            });
            webview.addEventListener('new-window', (e) => {
                // const protocol = require('url').parse(e.url).protocol;
                // if (protocol === 'http:' || protocol === 'https:') {
                    // webview.src = e.url;
                // }
                
                this.vtab.to({
                    to: "wview",
                    title: "曲线",
                    prop: { src:e.url }
                });
                e.preventDefault()
            });
        }
    }
</script>