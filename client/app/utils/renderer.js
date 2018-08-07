let fs = require('fs');
const { BrowserWindow } = require('electron').remote;
let path = require('path');
let os = require('os');
const { shell } = require('electron');
const ipc = require('electron').ipcRenderer;
const crypto = require('crypto');//加密
const basePath = path.join(os.homedir(), ".icestar");
let wins = BrowserWindow.getAllWindows()
console.log(wins)
let win = wins.pop();
//目录不存在时创建
if (!fs.statSync(basePath).isDirectory()) {
    fs.mkdirSync(basePath);
}

let Common = {
    winArr: [],
    cachewin: [],
    getPath(type, filename) {
        let pa = '';
        switch (type) {
            case "mock": {
                pa = path.join(basePath, 'mockconfig.json');
                break;
            }
            case 'mocklist': {
                pa = path.join(basePath, filename);
                break;
            }
            case 'socket': {
                pa = path.join(basePath, 'socketconfig.json');
                break;
            }
        }
        return pa;
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
    read(type) {
        let path = this.getPath(type);
        return new Promise((resolve, reject) => {
            fs.readFile(path, { encoding: 'utf-8' }, (e, data) => {
                if (!e) {
                    resolve(JSON.parse(data));
                } else {
                    reject(e);
                }
            })
        });
    },
    save(json, type, filename) {
        let path = this.getPath(type, filename);
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(json), function (e) {
                if (e) {
                    console.error(e)
                    reject()
                } else {
                    resolve()
                }
            });
        })
    },
    parentWin: null,
    createCacheWin() {
        //缓存窗口
        let self = this;
        for (let i = 1; i; i--) {
            (function () {
                let win = new BrowserWindow({ show: false, transparent: true, backgroundColor: '#333333', resizable: false, maximizable: false });
                // callback && win.webContents.on('did-finish-load',callback);
                win.on('close', () => {
                    win = null;
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
    openDevTool() {
        win.webContents.openDevTools();
    },
    formatString(jsonstr) {
        return jsonstr.replace(/[\n\t\r]/gi, '');
    },
    close() {
        win.close();
    },
    min() {
        win.minimize()
    },
    max() {
        win.maximize()
    },
    reset() {
        win.unmaximize()
    },
    minSys() {
        win.hide();
    },
    listen(title, callback) {
        win.on(title, callback);
    },
    md5File(filename, cb) {
        if (typeof cb !== 'function') throw new TypeError('Argument cb must be a function')
        var output = crypto.createHash('md5')
        var input = fs.createReadStream(filename)

        input.on('error', function (err) {
            cb(err)
        })

        output.once('readable', function () {
            cb(null, output.read().toString('hex'))
        })
        input.pipe(output)
    },
    //openfile
    openFile() {
        let key = String(+new Date());
        ipc.send('open-file-dialog', key, '*');
        return new Promise((resolve) => {
            ipc.on(key, (e, path) => {
                resolve(path[0]);
            });
        });
    },
    getIPAdress() {
        var interfaces = os.networkInterfaces();
        let address = '127.0.0.1';
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
        return address;
    },
    openUrl(url) {
        shell.openExternal(url);
    },
    mockServer(port, start = true) {
        ipc.send("mockServer", { port, path: this.getPath('mock'), status: start });
    },
    wsServer(port, start = true) {
        ipc.send("wsServer", { port, path: this.getPath('socket'), status: start });
    },
    subscribe(title, callback) {
        ipc.send('subscribe', title);
        ipc.on(`subscribe:${title}`, (e, res) => {
            callback && callback(res);
        });
    },
    subscribeM(title,data={}, callback) {
        ipc.send('subscribeM', title,data);
        ipc.on(`subscribeM:${title}`, (e, res) => {
            callback && callback(res);
        });
    },
    send(title, data = {}) {
        ipc.send('send', title, data);
    },
    getVersion(){
        let pr= new Promise((resolve)=>{
            this.subscribeM('getVersion',(version)=>{
                resolve(version)
            });
        });
        return pr;
    },
    checkUpdate(version,url){
        this.subscribeM('checkUpdate',{version,url});
    }
}
module.exports = Common;