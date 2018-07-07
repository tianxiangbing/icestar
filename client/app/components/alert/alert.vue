<template>
       <div class="alert">
        <div class="alert-content">
            <i class="tianxiangbing txb-close alert-close" @click="close()"></i>
            {{this.content}}
        </div>
    </div>
</template>
<script>
import './style.scss';

    export default {
        name:"alert",
        props:{
            content:String
        }
    }
</script>