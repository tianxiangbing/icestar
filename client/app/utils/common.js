import Clipboard from 'clipboard';
export default {
    formatJson(v, callback) {
        let json = v
        try {
            json = JSON.stringify(JSON.parse(v), null, "    ");
            callback && callback(true, json);
        } catch (e) {
            json = v;
            callback && callback(false, json);
        }
        return json;
    },
    _toJson(rows,json){
        if(rows.length == 0)return;
        var item = rows.shift();
        let fieldvalue= item.replace(/\:\s/,' ').split(/[\t\s]+/);
        let o = fieldvalue.shift();
        if(o !=''){
            json[o] = String(fieldvalue.join(" "));
        }
        this._toJson(rows,json);
    },
    toJson(v,callback,type=1,){
        this.formatJson(v,(isjson,json)=>{
            if(isjson){
                callback && callback(JSON.parse(json));
            }else{
                let rows = v.split('\n');
                let obj = {};
                if(v==''){
                    callback && callback('');
                }else{
                    this._toJson(rows,obj);
                    callback && callback(obj);
                }
            }
        })
    },
    copy(target,text,alert){
        var clipboard = new Clipboard(target, {
            text
        });//实例化
        //复制成功执行的回调，可选
        clipboard.on('success', function (e) {
            alert('内容已成功复制进粘贴板中，可以去其他地方粘贴了!')
        });
        //复制失败执行的回调，可选
        clipboard.on('error', function (e) {
            alert('复制失败，请按ctrl+c复制');
        });
    },
    //json转换成&url参数
    param: function (obj) {
        if (typeof obj == "string") {
            return encodeURI(obj) ;
        } else {
            var a = [];
            for (var i in obj) {
                if (typeof obj[i] == "object") {
                    a.push(i + "=" + this.param(obj[i]));
                } else
                    a.push(i + "=" + obj[i]);
            }
            return encodeURI(a.join("&"));
        }
    }
}