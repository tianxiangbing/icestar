<template>
<div>
  <wview :src="src"/>
</div>
</template>
<script>
import Vue from 'vue';
import renderer from 'renderer';

export default {
  name:'home',
  data(){
    return {src:"/"}
  },
  created() {
    console.log(this.src)
    let p = renderer.resolvePath('docs/index.html').replace(/\\/g,'/');
    this.src = `file://${p}`;
    console.log(this.src)
  }
}
</script>
