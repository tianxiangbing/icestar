<template>
    <header class="top-menu">
        <tab to="index"><i class="tianxiangbing txb-wxbzhuye"></i><span>首页</span></tab>
        <tab to="help"><i class="tianxiangbing txb-help"></i><span>帮助</span></tab>
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
import './header';
import renderer from "renderer";
import tab from "components/tab";
import store from "store/store";
import { MAX, RESET } from "store/actionTypes";
export default {
  name: "Header",
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
    }
  }
};
</script>
