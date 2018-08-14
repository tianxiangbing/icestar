<template>
<div>
  <wview :src="prop.src"/>
</div>
</template>
<script>
import Vue from 'vue'
export default {
  name:'viewpage',
  props:[
    "prop"
  ]
}
</script>
