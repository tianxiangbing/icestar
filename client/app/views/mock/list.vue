<template>
    <div class="mock-list">
        <div>
            <input type="text" class="search_input" placeholder="请输入你要搜索的内容或url"/>
        </div>
        <div class="list">
          <div class="row title">
                <div class="index"><tab to="mockAdd" :prop="prop" class="btnCancel">新增</tab></div>
                <div class="title">标题</div>
                <div class="url">URL</div>
                <div class="action">操作</div>
            </div>
            <div class="row" :class="{active:index == activeIndex}" @click="select(index)" v-for="(item,index) in list" :key="item.id">
                <div class="index">{{index}}</div>
                <div class="title">{{item.title}}</div>
                <div class="url">{{item.url}}</div>
                <div class="action"></div>
            </div>
        </div>
    </div>
</template>
<script>
import "./style";
import store from "store/store";

export default {
  name: "list",
  props: ["prop"],
  data() {
    return {activeIndex:-1};
  },
  computed: {
    list() {
      console.log(store.state.mock.projectList[this.prop]);
      return store.state.mock.projectList[this.prop].list;
    }
  },
  methods:{
    select(index){
      this.activeIndex == index?this.activeIndex=-1:this.activeIndex = index;
    }
  }
};
</script>