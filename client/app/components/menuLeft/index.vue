<template>
    <div class="menus" v-bind:style="styleObject">
        <nav class="left-menu">
            <!-- <a title="首页" @click="showSubMenu('home')" :class="{active:homeActive}"><i class="tianxiangbing txb-wxbzhuye"></i></a> -->
            <a title="mock接口" @click="showSubMenu('mock',0)" :class="{active:activeIndex==0}"><i class="tianxiangbing txb-M"></i></a>
            <a title="Post请求" @click="showSubMenu('post',1)" :class="{active:activeIndex==1}"><i class="tianxiangbing txb-p"></i></a>
            <a title="工具" @click="showSubMenu('tool',2)" :class="{active:activeIndex==2}"><i class="tianxiangbing txb-iconfontwujingongju"></i></a>
            <a title="收藏" @click="showSubMenu('favor',3)" :class="{active:activeIndex==3}"><i class="tianxiangbing txb-iconfontxingxing"></i></a>
            <!-- <tab to="wview" title="智能建站" prop="{url:'https://www.baidu.com'}">111</tab> -->
            <a title="智能建站" @click="showAIweb('aiweb',4)" :class="{active:activeIndex==4}"><i class="tianxiangbing txb-chuanzhongjianzhan"></i></a>
        </nav>
        <nav class="sub-menu" v-show="isExpands">
            <div class="sub-menu-title">{{currentTitle}}</div>
            <tab v-for="item in submenu" :key="item.title" :to="item.to" :title="item.title" :prop="item.prop">{{item.title}}</tab>
        </nav>
    </div>
</template>
<script>
import "./style";
import store from "store/store";
import { TOGGLESUBMENU,OPENTAB } from "./actionTypes";
import renderer from 'utils/renderer';

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
    showAIweb(t,index){
      this.activeIndex = index;
      let src = renderer.isDev()?'http://localhost:8090/':''
       store.dispatch({
        type: OPENTAB,
        to: 'wview',
        title:t,
        prop:{
          src:src
        }
      });
    },
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
