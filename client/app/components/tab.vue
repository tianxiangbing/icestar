<template>
<a @click="toTab"><slot></slot></a>
</template>

<script>
export default {
  name: "Tab",
  props:['to'],
  methods:{
      toTab(){

      }
  }
};
</script>