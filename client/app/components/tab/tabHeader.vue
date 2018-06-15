<template>
<div class="tab-header">
  <div class="item" :class="{active:isActive(index)}" @click="showTab(index)" v-for="(item,index) in tabList" :key="index">{{item.title}}
    <i class="tianxiangbing txb-close" @click="closeTab(index)"></i>
  </div>
</div>
</template>

<script>
import store from "store/store";
import "./style";
import { SHOWTAB,CLOSETAB } from "./actionTypes";

export default {
  name: "TabHeader",
  computed: {
    tabList() {
      return store.state.base.tabList;
    },
    tabActive() {
      return store.state.base.tabActive;
    }
  },
  methods: {
    isActive(index) {
      if (this.tabActive == index) {
        return true;
      } else {
        return false;
      }
    },
    showTab(index) {
      store.dispatch({
        type: SHOWTAB,
        index: index
      });
    },
    closeTab(index){
      console.log(index);
      store.dispatch({
        type: CLOSETAB,
        index: index
      });
      event.stopPropagation();
    }
  }
};
</script>