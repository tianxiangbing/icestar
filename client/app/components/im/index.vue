<style scoped lang="scss">
.im-container {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 40px;
  display:flex;
    .im-icon {
        color: #fff;
        background-color: #DA444A;
        border-radius: 3px;
        display: block;
        width: 20px;
        height: 20px;
        cursor: pointer;
        text-align: center;
    }
    .im-content{
        display: none;
    }
}
</style>
<template>
    <div class="im-container">
        <div class="im-icon iconfont icon-service"></div>
        <div class="im-content">
            <div class="im-history"></div>
            <div class="im-input">
                <textarea placeholder="输入内容"></textarea>
                <button>发送</button>
            </div>
        </div>
    </div>
</template>
