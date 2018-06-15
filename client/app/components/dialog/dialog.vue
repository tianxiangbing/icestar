<template>
    <div class="dialog">
        <div class="dialog-title" v-if="title">{{title}}<i class="tianxiangbing txb-close dialog-close" @click="close()"></i></div>
        <div class="dialog-content">
            <temp ref="content" :params="params"></temp>
        </div>
        <div class="dialog-action">
            <button class="submit" @click="submitHandle()">确定</button>
            <button class="cancel" @click="close()">取消</button>
        </div>
    </div>
</template>

<script type="text/babel">
import "./style";

export default {
  props: {
    title: String,
    callback: Function,
    cancel: Function,
    content:Object,
    params:Object
  },
  methods: {
      submitHandle(){
          this.callback(this)
      }
  }
};
</script>