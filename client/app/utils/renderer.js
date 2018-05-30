let fs = require('fs');
const { BrowserWindow } = require('electron').remote;
let path = require('path');
let os = require('os');
const { shell } = require('electron');
const ipc = require('electron').ipcRenderer;
let wins = BrowserWindow.getAllWindows()
let win  = wins[0]

let Common = {
    winArr :[],
    cachewin :[],
    getPath() {
        return path.join(os.homedir(), 'config.json');
    },
    getSocketPath() {
        return path.join(os.homedir(), 'socketconfig.json');
    },
    formatJson(v, callback) {
        let json = v
        try {
            json = JSON.stringify(JSON.parse(v), null, "    ");
            callback && callback(true, json);
        } catch (e) {
            json = v;
            callback && callback(false, e);
        }
        return json;
    },
    save(json, path) {
        var deferr = new $.Deferred();
        fs.writeFile(path || this.getPath(), JSON.stringify(json), function (e) {
            if (e) {
                alert(e)
                deferr.reject()
            } else {
                // window.close();
                deferr.resolve()
            }
        });
        return deferr;
    },
    parentWin: null,
    createCacheWin(){
        //缓存窗口
        let self  = this;
        for(let i =1;i;i--){
            (function(){
                let win = new BrowserWindow({show:false, transparent :true,backgroundColor:'#333333', resizable:false,maximizable :false});
                // callback && win.webContents.on('did-finish-load',callback);
                win.on('close',()=>{
                    win= null;
                });
                self.cachewin.push(win);
            })();
        }
        // console.log(this.cachewin)
    },
    openWin(url, ops) {
        let settings = $.extend({ width: screen.availWidth - 40, height: screen.availHeight - 50 }, ops);
        let iWin = new BrowserWindow(settings);
        // if (!ops || !ops.width) {
        //     this.iWin.maximize();
        // }
        iWin.loadURL(path.join('file://', __dirname, '../' + url));
        this.winArr.push(iWin);
        // iWin.webContents.openDevTools();
        return iWin;
    },
    formatString(jsonstr) {
        return jsonstr.replace(/[\n\t\r]/gi, '');
    },
    close(){
        win.close();
    },
    min(){
        win.minimize()
    },
    max(){
        win.maximize()
    },
    reset(){
        win.unmaximize()
    },
    minSys(){
        win.hide();
    },
    listen(title,callback){
        win.on(title,callback);
    }
}
module.exports = Common;