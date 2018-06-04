<template>
<div>
tabView
<div v-for="(item,index) in tabList" :key="index">
  <component :is="item.name"/>
</div>
</div>
</template>
<script>
import store from "store/store";
import mockAdd from "mock/add";
import mockList from "mock/list";
import mockProjectList from "mock/projectList";

import './tab.scss';

export default {
  name: "TabView",
  components: {
    mockAdd,
    mockList,
    mockProjectList
  },
  computed: {
    tabList() {
      return store.state.tabList;
    },
    tabActive() {
      return store.state.tabActive;
    }
  }
};
</script>