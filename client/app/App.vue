<template>
<div class="container">
    <mheader/>
    <div class="body">
        <nav class="left-menu">
            <a title="首页"><i class="tianxiangbing txb-wxbzhuye"></i></a>
            <a title="mock接口"><i class="tianxiangbing txb-M"></i></a>
            <a title="模拟推送"><i class="tianxiangbing txb-W"></i></a>
            <a title="工具"><i class="tianxiangbing txb-iconfontwujingongju"></i></a>
        </nav>
        <nav class="sub-menu" v-if="expands">
          <tab to="mock">mock接口</tab>
        </nav>
        <div class="content">11212</div>
    </div>
    <footer>qq:55342775</footer>
</div>
</template>

<script>
import "./assets/style";
import tab from "./components/tab";
import mheader from 'components/header';

export default {
  name: "App",
  components: {
    tab,
    mheader
  },
  data() {
    return { expands: true ,isMax:false};
  },
  methods:{
    
  }
};
</script>
