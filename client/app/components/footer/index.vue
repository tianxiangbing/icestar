<template>
    <footer>
        <tab to="mockConfig">
            mock状态：{{this.status?"开启":"停止"}}
        </tab>
        <tab to="wsConfig">
            ws状态：{{this.wsStatus?"开启":"停止"}}
        </tab>
        <span>当前版本：{{this.version}}</span>
    </footer>
</template>
<script>
 
import store from "store/store";
import './style';
import renderer from 'renderer';

export default {
    name:"mfooter",
    data(){
        return {version:'' };  
    },
    mounted() {
         renderer.getVersion().then(version=>{
             this.version = version;
         });
    },
    computed:{
        status(){
            return store.state.mock.status;
        },
        wsStatus(){
            return store.state.mock.wsStatus;
        }
    }
}

</script>