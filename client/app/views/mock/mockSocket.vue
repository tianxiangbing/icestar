<template>
    <div class="mock-list">
        <div>
            <input type="text" v-model="key" class="search_input" placeholder="请输入你要搜索的内容或url"/>
        </div>
        <div class="list">
          <div class="row title">
                <div class="index"><tab to="mockSocketAdd" title="新增推送" class="btnCancel">新增</tab></div>
                <div class="title">标题</div>
                <div class="frequency">频率</div>
                <div class="action">操作</div>
            </div>
            <div class="row" :class="{active:index == activeIndex}" @click="select(index)" v-for="(item,index) in list" :key="item.id">
                <div class="index">{{index}}</div>
                <div class="title">{{item.title}}</div>
                <div class="frequency">{{item.frequency}}</div>
                <div class="action"><span class="btnCancel" @click="del(index)">删除</span><span @click="edit(index)" class="btnCancel">编辑</span></div>
            </div>
        </div>
    </div>
</template>
<script>
import "./style";
import store from "store/store";
import { MOCK_WS_DEL } from "./actionTypes";
import renderer from "renderer";

export default {
  name: "list",
  props: [],
  data() {
    return { activeIndex: -1,key:'' };
  },
  computed: {
    list() {
      return store.state.mock.wsList.filter(item=>{
        return item.content.indexOf(this.key)>-1 || item.title.indexOf(this.key)>-1;
      });
    }
  },
  watch:{
    key(newvalue,oldvalue){
      console.log(oldvalue,newvalue)
    }
  },
  methods: {
    select(index) {
      this.activeIndex == index
        ? (this.activeIndex = -1)
        : (this.activeIndex = index);
    },
    preview(index) {
      let status = store.state.mock.wsStatus;
      if (!status) {
        this.valert({ content: "mock服务未启动，请到服务配置中进行开启." });
      } else {
        let url = store.state.mock.url;
        let project = store.state.mock.projectList[this.prop];
        let item = project.list[index];
        renderer.openUrl(`${url}/${project.prefix}${item.url}`);
      }
    },
    del(index) {
      store.dispatch({
        type: MOCK_WS_DEL,
        data: { index: index }
      });
    },
    edit(index) {
      this.vtab.to({
        to: "mockAdd",
        title: "修改",
        prop: {  index: index }
      });
    }
  }
};
</script>