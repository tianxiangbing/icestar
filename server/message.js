const electron = require('electron');
const ipc = electron.ipcMain;
const request = require('request');
let headers = {};
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
            headers: Object.assign({},headers, data.headers),
            method:data.method,
            encoding:'utf8',
            postData: {
                mimeType: 'application/x-www-form-urlencoded'
            }
        };
        if(data.method =='POST'){
            options.form = data.params;
        }else{
            if(options.url.indexOf('?')==-1){
                options.url+='?';
            }else{
                options.url+='&';
            }
            options.url +=data.params;
        }
        delete options["Accept-Encoding"];
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                if(response.headers.hasOwnProperty("set-cookie")){
                    this.setCookies(response.headers["set-cookie"])
                }
                sender(body);
            }else
            if(!error && response.statusCode == 302){
                if(response.headers.hasOwnProperty("set-cookie")){
                    this.setCookies(response.headers["set-cookie"])
                }
                data.url = response.headers.location;
                this.post(sender,data)
            }else{
                if(error){
                    sender(error.message);
                }else{
                    sender(response.statusCode + response.statusMessage);
                }
            }
        });
    },
    setCookies(cookies){
        if(headers.Cookie){
           let cookieArr = headers.Cookie.split(';');
           cookies.forEach(cook=>{
               let hasItem = null;
               let hasIndex = -1;
                cookieArr.forEach((item,index)=>{
                    if(item== cook){
                        hasItem = item ;
                        hasIndex = index;
                    }
                });
                if(!hasItem){
                    cookieArr.push(cook);
                }else{
                    cookieArr[hasIndex] = cook;
                }
           })
           headers.Cookie = cookieArr.join(';');
        }else{
            headers.Cookie =  cookies.join(';');
        }
    }
}
module.exports = Message;