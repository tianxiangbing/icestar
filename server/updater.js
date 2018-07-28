const { dialog, shell,app } = require('electron');
const package = require("../package.json");
const request = require('request');
const path = require('path');
const os = require('os');
const message =require('./message');

const Updater = {
    isdownload:false,
    init(win) {
        this.mainWindow = win;
        this.folderpath = path.join(os.homedir(), ".icestar");
        setInterval(() => {
            // message.send('update',{msg:'有新的版本更新，正在后台下载。123'})
            this.checkUpdate();
        }, 1000*60*60);
        this.checkUpdate();
        this.bindEvent();
    },
    returnVersion(version) {
        return Number(version.replace(/\d+/g, function ($1) {
            return String('00' + $1).substr(-2)
        }).replace(/\./g, ''));
    },
    bindEvent() {
        this.mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
            //设置文件存放位置
            let filePath = this.folderpath + `\\${item.getFilename()}`;
            this.filePath = filePath
            item.setSavePath(filePath);
            item.on('updated', (event, state) => {
                if (state === 'interrupted') {
                    this.isdownload = false;
                    console.log('Download is interrupted but can be resumed')
                } else if (state === 'progressing') {
                    if (item.isPaused()) {
                        this.isdownload = false;
                        console.log('Download is paused')
                    } else {
                        console.log(`Received bytes: ${item.getReceivedBytes()}`)
                    }
                }
            })
            item.once('done', (event, state) => {
                if (state === 'completed') {
                    console.log('Download successfully')
                    console.log(this.filePath)
                    message.send('updated',{msg:'版本下载完成，即将更新!'});
                    setTimeout(()=>{
                        this.isdownload = false;
                        shell.openExternal(this.filePath);
                        app.quit();
                    },2000)
                } else {
                    console.log(`Download failed: ${state}`)
                }
            })
        });
    },
    checkUpdate() {
        let feedUrl = 'https://api.github.com/repos/tianxiangbing/icestar/releases/latest';
        var options = {
            url: feedUrl,
            headers: {
                'User-Agent': 'tianxiangbing'
            }
        };
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log(body) // 
                let result = JSON.parse(body);
                let currVersion = this.returnVersion(package.version);
                let originVersion = this.returnVersion(result.name);
                if (originVersion > currVersion) {
                    let downloadUrl = result.assets[1].browser_download_url;
                    if(!this.isdownload){
                        this.isdownload = true;
                        message.send('update',{msg:'有新的版本更新，正在后台下载。'})
                        this.mainWindow.webContents.downloadURL(downloadUrl);
                    }
                }
            }
        })
        // $.getJSON('https://tianxiangbing.github.io/mock/checkUpdate.html', (result) => {
        //     // console.log(package.version)
        //     let currVersion = this.returnVersion(package.version);
        //     let originVersion = this.returnVersion(result.version);
        //     result.message = result.message||"修复问题";
        //     if (originVersion > currVersion) {
        //         if (result.force) {
        //             alert('有重大功能更新，请前往下载！版本更新内容：'+result.message)
        //             //强制更新
        //             shell.openExternal('https://tianxiangbing.github.io/mock/download');
        //             com.exit();
        //         } else
        //             if (confirm('有新的功能出现，是否下载体验？版本更新内容：'+result.message)) {
        //                 shell.openExternal('https://tianxiangbing.github.io/mock/download');
        //             }
        //     }
        // })

    }
}
module.exports = Updater;