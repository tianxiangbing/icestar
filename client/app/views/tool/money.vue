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
    // let isdev = process.env.NODE_ENV;
    // if(isdev){
    //   this.src = `http://127.0.0.1:8000/#/list`;
    // }else{
      let p = renderer.resolvePath('docs/money/docs/index.html#/list').replace(/\\/g,'/');
      this.src = `file://${p}`;
    // }
    console.log(this.src)
  }
}
</script>
