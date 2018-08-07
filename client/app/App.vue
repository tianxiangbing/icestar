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
    <mfooter/>
</div>
</template>

<script>
import "./assets/style";
import tabView from "components/tab/tabView";
import tabHeader from "components/tab/tabHeader";
import leftMenu from 'components/menuLeft';
import mheader from 'components/header';
import mfooter from 'components/footer';
import store from "store/store";
import im from 'components/im';
import renderer from 'renderer';
import axios from 'axios';

export default {
  name: "App",
  components: {
    mheader,
    tabView,
    tabHeader,
    leftMenu,
    im,
    mfooter
  },
  mounted() {
    renderer.subscribe('update',(data)=>{
      this.valert(data.msg);
    })
    renderer.subscribe('updated',(data)=>{
      this.valert(data.msg);
      renderer.send('updating');
    });
    setTimeout(()=>{
      // renderer.checkUpdate();
      let feedUrl = 'https://api.github.com/repos/tianxiangbing/icestar/releases/latest';
      axios.get(feedUrl).then(res=>{
        let version = res.data.name;
        let url = res.data.assets[1].browser_download_url;
        // debugger;
        renderer.checkUpdate(version,url)
      })
    },10000)
  }
};
</script>
