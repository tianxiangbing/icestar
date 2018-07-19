<template>
    <div id="filemd5">
        <div id="holder" @dragover="ondragover" @dragleave="ondragleave" @drop="ondrop">
           <div class="file-content">
           <p class="tips">文件MD5加密,拖动文件到这里</p>
           <p v-show="tips">
            生成的MD5密钥：<span class="md5">{{tips}}</span>
            </p>
            </div>
        </div>
        <button class="btn" @click="choosefile">选择文件</button>
        <button class="btn" ref="btnCopy">复制MD5</button>
    </div>
</template>
<script>
import "./style";
import renderer from "renderer";
import common from "utils/common";

export default {
  name: "filemd5",
  data() {
    return { tips: "" };
  },
  mounted() {
    common.copy(
      this.$refs.btnCopy,
      () => {
        return this.tips;
      },
      this.valert
    );
  },
  methods: {
    ondragover() {
      console.log("ondragover");
      event.preventDefault();
    },
    ondragleave() {
      event.preventDefault();
    },
    ondrop() {
      for (let f of event.dataTransfer.files) {
        renderer.md5File(f.path, (err, hash) => {
          if (!err) {
            this.tips = hash;
          }
        });
      }
      event.preventDefault();
    },
    choosefile() {
      renderer.openFile().then(path => {
        renderer.md5File(path, (err, hash) => {
          if (!err) {
            this.tips = hash;
          }
        });
      });
    }
  }
};
</script>