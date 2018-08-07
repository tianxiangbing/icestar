<template>
    <a @click="toBowser"><slot></slot></a>
</template>
<script>
import renderer from 'renderer';
    export default {
        name:"aa",
        props:['href'],
        methods:{
            toBowser(){
                renderer.openUrl(this.href)
            }
        }
    }
</script>