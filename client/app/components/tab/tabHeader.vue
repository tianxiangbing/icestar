<template>
<div class="tab-header">
  <div class="item" :class="{active:isActive(index)}" @click="showTab(index)" v-for="(item,index) in tabList" :key="index">{{item.title}}
    <i class="tianxiangbing txb-close"></i>
  </div>
</div>
</template>

<script>
import store from "store/store";
import "./tab.scss";
import { SHOWTAB } from "./actionTypes";

export default {
  name: "TabHeader",
  computed: {
    tabList() {
      return store.state.tabList;
    },
    tabActive() {
      return store.state.tabActive;
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
    }
  }
};
</script>