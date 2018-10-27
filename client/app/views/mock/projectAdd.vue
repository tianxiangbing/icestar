<template>
    <div id="mock-projectAdd">
        <div class="form">
            <div class="form-row">
                <label class="from-title">标题</label>
                <span class="form-input">
                    <input type="text"  ref="title" :value="title"/>
                </span>
            </div>
            <div class="form-row">
                <label class="from-title">前置url</label>
                <span class="form-input">
                    <input type="text" ref="prefix" :value="prefix"/>
                </span>
            </div>
            <div class="form-row">
                <label class="from-title">描述</label>
                <span class="form-input">
                    <textarea ref="desc" :value="desc">
                    </textarea>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {title:'',prefix:'',desc:'',list:[]};
        },
        name:"projectAdd",
        props:["params"],
        watch:{
            params(){
                console.log(this.params)
                this.title = this.params.title;
                this.prefix = this.params.prefix;
                this.desc = this.params.desc;
                this.list = this.params.list;
            }
        },
        beforeUpdate(){
            console.log(arguments)
        }
    }
</script>