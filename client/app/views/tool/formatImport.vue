<template>
    <div class="formatImport">
        <div class="form">
                <div class="form-row">
                    <label class="from-title">外层结构:</label>
                    <span class="form-input codeView ">
                        <codemirror v-model="preCode" class="preCode" :options="cmOptions"/>
                    </span>
                </div>
                <div class="form-row">
                    <label class="from-title">接口数据:</label>
                    <span class="form-input codeView importContent">
                        <codemirror v-model="importContent" :options="cmOptions"/>
                    </span>
                </div>
                <div class="form-action">
                    <button class="btn bigBtn" @click="formatJson()">生成JSON</button>
                </div>
                <div class="form-row" v-show="isResult">
                    <label class="from-title">结果:</label>
                    <span class="form-input codeView importContent">
                        <codemirror v-model="json" :options="cmOptions"/>
                    </span>
                </div>
        </div>
    </div>
</template>
<script>
import { codemirror } from "vue-codemirror";
import "./style";
import "codemirror/mode/javascript/javascript.js";
import common from "utils/common";
    export default {
        name:"formatImport",
        components:{codemirror},
        data() {
            return {
                preCode:'{"result":@json}',
                importContent:'',
                json: "{}",
                isResult:false,
                cmOptions: {
                    tabSize: 4,
                    mode: "javascript",
                    theme: "seti",
                    lineNumbers: true,
                    line: true
                },
                result: ""
            };
        },
        methods:{
            formatJson(){
                this.isResult= true;
                let str = this.importContent;
                let json = {};
                this.toJson(str,json);
                console.log(json)
                let wrap = this.preCode
                let output =''
                if(wrap.indexOf('@json')>-1){
                    output = wrap .replace( '@json',JSON.stringify(json));
                }else{
                    output = JSON.stringify(json);
                }
                wrap.replace()
                
                common.formatJson(output, (state, json) => {
                    if (state) {
                        this.json = json;
                    }
                });
            }
            ,_toJson(rows,json){
                if(rows.length == 0) return;
                var item = rows.shift();
                let fieldvalue= item.split(/[\t\s]+/);
                    console.log(fieldvalue);
                    if(fieldvalue[1]){
                        switch( fieldvalue[1].toUpperCase()){
                            case 'INT':
                            case 'NUMBER':{
                                json[fieldvalue[0]] = Math.round(Math.random()*100) ;
                                break;
                            }
                            case 'FLOAT':
                            case 'DOUBLE':{
                                json[fieldvalue[0]] = (Math.random()*100).toFixed(2) ;
                                break;
                            }
                            case 'LIST':
                            case 'ARRAY':{
                                json[fieldvalue[0]]=[];
                                let js  = {}
                                this._toJson(rows,js);
                                json[fieldvalue[0]].push(js);
                                break;
                            }
                            default:{
                                json[fieldvalue[0]] = '';
                                break;
                            }
                        }
                    }else{
                        json[fieldvalue[0]] = '';
                    }
                this._toJson(rows,json)
            }
            ,toJson(str,json){
                let rows = str.split('\n');
                this._toJson(rows,json)
            }
        }
    }
</script>