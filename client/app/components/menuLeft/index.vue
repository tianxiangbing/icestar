<template>
    <div class="menus" v-bind:style="styleObject">
        <nav class="left-menu">
            <!-- <a title="首页" @click="showSubMenu('home')" :class="{active:homeActive}"><i class="tianxiangbing txb-wxbzhuye"></i></a> -->
            <a title="mock接口" @click="showSubMenu('mock',0)" :class="{active:activeIndex==0}"><i class="tianxiangbing txb-M"></i></a>
            <a title="Post请求" @click="showSubMenu('post',1)" :class="{active:activeIndex==1}"><i class="tianxiangbing txb-p"></i></a>
            <a title="工具" @click="showSubMenu('tool',2)" :class="{active:activeIndex==2}"><i class="tianxiangbing txb-iconfontwujingongju"></i></a>
        </nav>
        <nav class="sub-menu" v-show="isExpands">
            <div class="sub-menu-title">{{currentTitle}}</div>
            <tab v-for="item in submenu" :key="item.to" :to="item.to">{{item.title}}</tab>
        </nav>
    </div>
</template>
<script>
import "./style";
import store from "store/store";
import { TOGGLESUBMENU } from "./actionTypes";

export default {
  name: "MenuLeft",
  components: {
  },
  data() {
    return {
      styleObject: "",
      activeIndex:-1,
      currentTitle:""
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
    },
    submenu(nv,ov){
    }
  },
  computed: {
    isExpands() {
      console.log(store)
      return store.state.base.isExpands;
    },
    submenu(){
      return store.state.base.submenu;
    },
    currentActive(){
      return store.state.base.currentActive;
    }
  },
  methods: {
    showSubMenu(title,index) {
      this.activeIndex = index;
      store.dispatch({
        type: TOGGLESUBMENU,
        title:title
      });
      this.currentTitle = event.currentTarget.getAttribute('title');
    }
  }
};
</script>
