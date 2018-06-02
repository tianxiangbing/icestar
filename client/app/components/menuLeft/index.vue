<template>
    <div class="menus" v-bind:style="styleObject">
        <nav class="left-menu">
            <a title="首页" @click="showSubMenu('home')" :class="{active:homeActive}"><i class="tianxiangbing txb-wxbzhuye"></i></a>
            <a title="mock接口" @click="showSubMenu('mock')" :class="{active:mockActive}"><i class="tianxiangbing txb-M"></i></a>
            <a title="模拟推送" @click="showSubMenu('ws')" :class="{active:wsActive}"><i class="tianxiangbing txb-W"></i></a>
            <a title="工具" @click="showSubMenu('tool')" :class="{active:toolActive}"><i class="tianxiangbing txb-iconfontwujingongju"></i></a>
        </nav>
        <nav class="sub-menu" v-show="isExpands">
            <tab to="mock">mock接口</tab>
        </nav>
    </div>
</template>
<script>
import "./style";
import tab from "components/tab/tab";
import store from "store/store";
import { TOGGLESUBMENU } from "./actionTypes";

export default {
  name: "MenuLeft",
  components: {
    tab
  },
  data() {
    return {
      styleObject: "",
      currentActive: "",
      homeActive: "",
      mockActive: "",
      wsActive: "",
      toolActive: ""
    };
  },
  watch: {
    isExpands(newvalue, oldvalue) {
      if (document.querySelector(".sub-menu") && this.isExpands) {
        let width = 285;
        this.styleObject = { flex: `0 0 ${width}px` };
      } else {
        this.styleObject = { flex: `0 0 50px` };
      }
    }
  },
  computed: {
    isExpands() {
      return store.state.isExpands;
    }
  },
  methods: {
    showSubMenu(title) {
      if (title == this.currentActive) {
        store.dispatch({
          type: TOGGLESUBMENU
        });
      }
      this.currentActive = title;
      if (store.state.isExpands) {
        this[`${title}Active`] = true;
      } else {
        this.homeActive = false;
        this.mockActive = false;
        this.wsActive = false;
        this.toolActive = false;
      }
    }
  }
};
</script>
