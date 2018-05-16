<template>
<div class="container">
    <header class="top-menu">
        <router-link to="/"><i class="tianxiangbing txb-wxbzhuye"></i><span>首页</span></router-link>
        <router-link to="/help"><i class="tianxiangbing txb-help"></i><span>帮助</span></router-link>
    </header>
    <div class="body">
        <nav class="left-menu">
            <a title="首页"><i class="tianxiangbing txb-wxbzhuye"></i></a>
            <a title="mock接口"><i class="tianxiangbing txb-M"></i></a>
            <a title="模拟推送"><i class="tianxiangbing txb-W"></i></a>
            <a title="工具"><i class="tianxiangbing txb-iconfontwujingongju"></i></a>
        </nav>
        <nav class="sub-menu" v-if="expands">
          <router-link to="/mock">mock接口</router-link>
        </nav>
        <router-view class="content"></router-view>
    </div>
    <footer>qq:55342775</footer>
</div>
</template>

<script>
import "./assets/style";
export default {
  name: "App",
  data() {
    return { expands: true };
  }
};
</script>
