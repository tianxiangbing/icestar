<template>
    <div class="formBox">
        <h1>IceStar 前端开发工具</h1>
        <p>
            版本号：{{version}}
        </p>
        <p>
            github地址：<aa href="https://github.com/tianxiangbing/icestar">https://github.com/tianxiangbing/icestar</aa>
        </p>
    </div>
</template>
<script>
import renderer from 'renderer';
    export default {
        name:"aboutModal",
        data(){
            return {version:'' };  
        },
        mounted() {
            renderer.getVersion().then(version=>{
                this.version = version;
                console.log(this.version)
            });
        }
    }
</script>