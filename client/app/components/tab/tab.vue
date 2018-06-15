<template>
<a @click="toTab"><slot></slot></a>
</template>

<script>
import { OPENTAB } from "./actionTypes";
import store from "store/store";

export default {
  name: "Tab",
  props: ["to","title","prop"],
  methods: {
    toTab() {
      console.log(this.to);
      store.dispatch({
        type: OPENTAB,
        to: this.to,
        title:this.title,
        prop:this.prop
      });
    }
  }
};
</script>