<template>
<div>
<a @click="toTab"><slot></slot></a>
tabHeader
</div>
</template>

<script>
export default {
  name: "TabHeader",
  props:['to'],
  methods:{
      toTab(){

      }
  }
};
</script>