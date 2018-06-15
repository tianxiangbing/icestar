<template>
<div>
<div v-for="(item,index) in tabList" :key="index">
  <component :is="item.name" v-show="tabActive==index"/>
</div>
</div>
</template>
<script>
import store from "store/store";
import tabs from 'store/tabs';
import './style';
const components = {}
tabs.forEach(item => {
  components[item.name]=item.component; 
});

export default {
  name: "TabView",
  components: components,
  data(){
    return {};
  },
  computed: {
    tabList() {
      return store.state.base.tabList;
    },
    tabActive() {
      return store.state.base.tabActive;
    }
  }
};
</script>