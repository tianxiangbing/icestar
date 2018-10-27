<template>
    <div class="mock-list">
        <div>
            <input type="text" v-model="key" class="search_input" placeholder="请输入你要搜索的内容或url"/>
        </div>
        <div class="list">
          <div class="row title">
                <div class="index"><tab to="mockAdd" title="新增" :prop="param" class="btnCancel">新增</tab></div>
                <div class="title">标题</div>
                <div class="url">URL</div>
                <div class="action">操作</div>
            </div>
            <div class="row" :class="{active:index == activeIndex}" @click="select(index)" v-for="(item,index) in list" :key="item.id">
                <div class="index">{{index}}</div>
                <div class="title">{{item.title}}</div>
                <div class="url">{{item.url}}</div>
                <div class="action"><span class="btnCancel" @click="preview(index)">预览</span><span class="btnCancel" @click="del(index)">删除</span><span @click="edit(index)" class="btnCancel">编辑</span></div>
            </div>
        </div>
    </div>
</template>
<script>
import "./style";
import store from "store/store";
import { MOCK_DEL } from "./actionTypes";
import renderer from "renderer";

export default {
  name: "list",
  props: ["prop"],
  data() {
    return { activeIndex: -1,param:{pid:this.$props.prop},key:'' };
  },
  computed: {
    list() {
      console.log(store.state.mock.projectList[this.prop]);
      return store.state.mock.projectList.filter(item=>item.id == this.prop)[0].list.filter(item=>{
        return item.url.indexOf(this.key)>-1 || item.title.indexOf(this.key)>-1;
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
      let status = store.state.mock.status;
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
        type: MOCK_DEL,
        data: { index: index, pid: this.prop }
      });
    },
    edit(index) {
      this.vtab.to({
        to: "mockAdd",
        title: "修改",
        prop: { pid: this.prop, index: index }
      });
    }
  }
};
</script>