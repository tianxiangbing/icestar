<template>
<div>
<a @click="toTab"><slot></slot></a>
tabView
</div>
</template>

<script>
export default {
  name: "TabView",
  props:['to'],
  methods:{
      toTab(){

      }
  }
};
</script>