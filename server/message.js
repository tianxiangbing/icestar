const electron = require('electron');
const ipc = electron.ipcMain;
const Message = {
    list:{},
    init() {
        ipc.on('send',(event,key,data)=>{
            this.send(key,data)
        });
        ipc.on('subscribe', (event, key) =>{
            this.list[key]= this.list[key]||{};
            this.list[key].sender = event.sender;
        });
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
    }
}
module.exports = Message;