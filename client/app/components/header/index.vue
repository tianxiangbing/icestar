<template>
    <header class="top-menu">
        <tab to="home"><i class="tianxiangbing txb-wxbzhuye"></i><span>首页</span></tab>
        <a @click="openHelp()" class="help"><i class="tianxiangbing txb-help" :class="{active:clickHelp}"></i><span>帮助</span>
          <ul class="help-sub" v-show="clickHelp">
              <li @click="openDevTool()">开发人员工具</li>
          </ul>
        </a>
        <span class="win-act">
        <i @click="minSys" class="tianxiangbing txb-tuopantray17" title="托盘"></i>
        <i @click="min" class="tianxiangbing txb-minus1" title="最小化"></i>
        <i @click="reset" class="tianxiangbing txb-huanyuan" v-if="isMax" title="还原"></i>
        <i @click="max" class="tianxiangbing txb-maximise" v-else title="最大化"></i>
        <i @click="close" class="tianxiangbing txb-close1" title="关闭"></i>
        </span>
    </header>
</template>

<script>
import "./style";
import renderer from "renderer";
import tab from "components/tab/tab";
import store from "store/store";
import { MAX, RESET } from "store/actionTypes";

export default {
  name: "Header",
  data() {
    return { clickHelp: false };
  },
  components: {
    tab
  },
  computed: {
    isMax() {
      return store.state.winStatus;
    }
  },
  created: function() {
    renderer.listen("maximize", () => {
      this.max();
    });
    renderer.listen("unmaximize", () => {
      this.reset();
    });
  },
  methods: {
    openHelp() {
      this.clickHelp = !this.clickHelp;
    },
    min() {
      renderer.min();
    },
    reset() {
      store.dispatch({
        type: RESET
      });
    },
    max() {
      store.dispatch({
        type: MAX
      });
    },
    close() {
      renderer.close();
    },
    minSys() {
      //托盘
      renderer.minSys();
    },
    openDevTool(){
      renderer.openDevTool();
    }
  }
};
</script>
