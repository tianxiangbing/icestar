<template>
<div class="container">
    <mheader/>
    <div class="body">
        <left-menu/>
        <div class="content">
          <tab-header/>
          <tab-view/>
        </div>
    </div>
    <footer>qq:55342775</footer>
</div>
</template>

<script>
import "./assets/style";
import tabView from "components/tab/tabView";
import tabHeader from "components/tab/tabHeader";
import leftMenu from 'components/menuLeft';
import mheader from 'components/header';
import store from "store/store";
import im from 'components/im';
import renderer from 'renderer';
export default {
  name: "App",
  components: {
    mheader,
    tabView,
    tabHeader,
    leftMenu,
    im
  },
  mounted() {
    renderer.subscribe('update',(data)=>{
      this.valert(data.msg);
    })
    renderer.subscribe('updated',(data)=>{
      this.valert(data.msg);
      renderer.send('updating');
    })
  }
};
</script>
