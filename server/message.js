const electron = require('electron');
const ipc = electron.ipcMain;
const request = require('request');
const Message = {
    list:{},
    init(updater) {
        this.updater = updater;
        ipc.on('send',(event,key,data)=>{
            this.send(key,data)
        });
        ipc.on('subscribe', (event, key) =>{
            this.list[key]= this.list[key]||{};
            this.list[key].sender = event.sender;
        });
        //单向主进程通信
        ipc.on('subscribeM',(event,key,data)=>{
            if(this.hasOwnProperty(key)){
                let sender = function(){
                    return function(data){
                        event.sender.send(`subscribeM:${key}`,data);
                    }
                }
               this[key](sender(),data);
            }
        })
    },
    subscribe(title, callback) {
        ipc.on(`subscribe`, (e, key) => {
            if(key ==title){
                callback && callback(res);
            }
        });
    },
    send(key,data){
        if(this.list.hasOwnProperty(key)){
            let obj = this.list[key];
            // obj.sender.send(key,data);
            obj.sender.send(`subscribe:${key}`,data);
        }
    },
    //获取版本号
    getVersion(sender){
        let pkg = require("../package.json");
        sender(pkg.version);
    },
    checkUpdate(sender,data){
        let {version,url} =data;
        this.updater.update(version,url);
    },
    post(sender,data){
        var options = {
            url: data.url,
            headers: data.headers||{},
            method:data.method,
            postData: {
                mimeType: 'application/x-www-form-urlencoded',
                params:JSON.parse(data.params)||[]
            }
        };
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                sender(body);
            }else{
                sender(error.message|| response.statusCode + response.statusMessage);
            }
        });
    }
}
module.exports = Message;