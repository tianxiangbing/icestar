<template>
    <footer>
        <tab to="mockConfig">
            mock状态：{{this.status?"开启":"停止"}}
        </tab>
    </footer>
</template>
<script>
 
import store from "store/store";
import './style';
export default {
    name:"mfooter",
    computed:{
        status(){
            return store.state.mock.status;
        }
    }
}

</script>