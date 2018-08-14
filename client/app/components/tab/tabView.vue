<template>
<div class="tab-view">
<div v-if="tabList.length>0" v-for="(item,index) in tabList" :key="index" class="view-item" v-show="tabActive==index">
  <component :is="item.name" :prop="item.prop"/>
</div>
<home  v-if="tabList.length===0"/>
</div>
</template>
<script>
import store from "store/store";
import tabs from 'store/tabs';
import home from 'home';
import './style';
const components = {}
tabs.forEach(item => {
  components[item.name]=item.component; 
});
components['home'] = home;
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