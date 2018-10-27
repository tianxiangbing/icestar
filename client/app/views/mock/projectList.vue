<template>
    <div class="projectList">
        <h1>项目列表</h1>
        <tab to="mockList" :prop="item.id" :title="item.name" class="item" v-for="(item,index) in projectList" :key="item.id">
            <h2><i class="tianxiangbing txb-bianji" @click="edit(item)"></i>{{item.title}}</h2>
            <p class="desc">{{item.desc}}</p>
            <i class="tianxiangbing txb-error del" title="删除" @click="del(index)"></i>
        </tab>
        <a @click="projectAdd" class="projectAdd item"><i class="tianxiangbing txb-add1" ></i></a>
    </div>
</template>

<script>
import "./style";
import projectAdd from "./projectAdd";
import store from "store/store";
import {
  MOCK_PROJECT_ADD,
  MOCK_PROJECT_UPDATE,
  MOCK_INIT,
  MOCK_PROJECT_DEL
} from "./actionTypes";

export default {
  name: "projectList",
  data() {
    return {};
  },
  computed: {
    projectList() {
      return store.state.mock.projectList;
    }
  },
  beforeCreate() {
    //初始化state
    store.dispatch({
      type: MOCK_INIT
    });
  },
  methods: {
    del(index){
      store.dispatch({
        type: MOCK_PROJECT_DEL,
        data: { index: index }
      });
      event.stopPropagation();
    },
    projectAdd() {
      this.vdialog({
        content: projectAdd,
        title: "添加项目",
        callback: obj => {
          let $refs = obj.$refs.content.$refs;
          let title = $refs["title"].value;
          let prefix = $refs.prefix.value;
          let desc = $refs.desc.value;
          store.dispatch({
            type: MOCK_PROJECT_ADD,
            data: { title, prefix, desc }
          });
          obj.close();
        }
      });
    },
    edit(item) {
      event.stopPropagation();
      this.vdialog({
        content: projectAdd,
        title: item.title,
        params: item,
        callback: obj => {
          let $refs = obj.$refs.content.$refs;
          let title = $refs["title"].value;
          let prefix = $refs.prefix.value;
          let desc = $refs.desc.value;
          store.dispatch({
            type: MOCK_PROJECT_UPDATE,
            data: { title, prefix, desc, id: item.id }
          });
          obj.close();
        }
      });
    }
  }
};
</script>