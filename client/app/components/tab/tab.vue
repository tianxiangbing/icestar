<template>
<a @click="toTab"><slot></slot></a>
</template>

<script>
import tabs from "store/tabs";
import { OPENTAB } from "./actionTypes";
import store from "store/store";

export default {
  name: "Tab",
  props: ["to"],
  methods: {
    toTab() {
      console.log(this.to);
      store.dispatch({
        type: OPENTAB,
        to: this.to
      });
    }
  }
};
</script>