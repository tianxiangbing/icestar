const electron = require('electron');
const ipc = electron.ipcMain;
const Message = {
    list:{},
    init() {
        ipc.on('send',(event,key,data)=>{
            this.send(key,data)
        });
    },
    subscribe(key,callback){
        ipc.on('subscribe', (event, key) => {
            this.list[key]= this.list[key]||{};
            this.list[key].callbacks =this.list[key].callbacks|| [];
            this.list[key].sender = event.sender;
            callback && this.list[key].callbacks.push(callback);
        });
    },
    send(key,data){
        if(this.list.hasOwnProperty(key)){
            let obj = this.list[key];
            obj.sender.send(key,data);
            obj.callbacks.forEach(callback => {
                callback(data);
            })
        }
    }
}
module.exports = Message;