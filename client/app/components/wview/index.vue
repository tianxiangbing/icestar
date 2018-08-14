<template>
    <div>
        <webview :src="src" autosize></webview>
    </div>
</template>
<script>
    export default {
        name:"wview",
        props:{
            src:""
        }
    }
</script>