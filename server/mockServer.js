
/**
 * Created with Visual Studio Code
 * github: https://github.com/tianxiangbing/mock
 * homepage:http://www.lovewebgames.com/mock
 * User: 田想兵
 * Date: 2017-03-24
 * Time: 16:27:55
 * Contact: 55342775@qq.com
 * Desc: 模拟http服务
 */
var express = require('express');
var bodyParser = require("body-parser");
const WebSocket = require('ws');
var app = express();
var fs = require('fs');
var qs = require('qs');
app.use(bodyParser.urlencoded({ extended: false }));
let httpserver = {
    port: 8080,
    wsPort:8090,
    timer: {},//socket的定时器
    config: {},
    status: false,
    wsStatus:false,
    wsConfig:[],
    users:[],
    init(param) {
        let { port, path, status } = param;
        if (status && this.status) {
            //停止服务
            this.server.close((e) => {
                console.log(e)
                this.status = false;
            });
            return false;
        }
        if (!this.status) {
            this.mockpath = path;
            this.port = port;
            this.bindConfig();
            this.server = require('http').createServer(app);
            this.server.listen(port, () => {
                // var host = this.server.address().address;
                // var port = this.server.address().port;
                this.status = true;
            });

        }
        return this.server;
    },
    initWs(param){
        let { port, path, status } = param;
        if (status && this.wsStatus) {
            //停止服务
            this.ws.close((e) => {
                console.log(e)
                this.wsStatus = false;
            });
            return false;
        }
        if (!this.wsStatus) {
            this.wsPath = path;
            this.wsPort = port;
            try {
                this.ws = new WebSocket.Server({ port:this.wsPort});
                this.ws.on('connection', (ws) => {
                    this.wsStatus = true;
                    ws.on('message', function incoming(message) {
                        console.log('received: %s', message);
                        ws.send(message);
                    });
                    // this.wsObj = ws;
                    this.users.push(ws);
                });
                this.autoSocket();
            } catch (e) {
                console.log(e);
            }
        }
        return false;
    },
    //自动推送消息
    autoSocket() {
        let _self = this;
        fs.readFile(_self.wsPath, 'utf8', (err, data) => {
            if (err) {
                alert(err);
            } else {
                //清空所有的定时器
                for (let j in _self.timer) {
                    _self.timer[j] && clearInterval(_self.timer[j]);
                }
                let config = JSON.parse(data);
                for (var k in config) {
                    let v = config[k];
                    let frequency = v.frequency;
                    if (v.enable == "false") continue;
                    _self.timer[k] = setInterval(() => {
                        let content = v.content;
                        let random = v.rule;
                        content = content.replace(/@random/g, function () {
                            return eval(random);
                        })
                        console.log(content);
                        _self.users.forEach(item=>{
                            item.readyState==1 && item.send(content);
                        })
                    }, 1000 / frequency);
                }
            }
        });
    },
    bindConfig() {
        app.all('*', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
            res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
            if (req.method == 'OPTIONS') {
                res.send(200); /让options请求快速返回/
            } else {
                fs.readFile(this.mockpath, 'utf8', (err, data) => {
                    if (err) {
                        // alert(err);
                    } else {
                        this.config = JSON.parse(data);
                        let url = req.params[0];
                        let query = req.query ;
                        let formdata = req.body;
                        let urlArr = url.split('/');
                        let reqPrefix = urlArr[1];
                        let ishas = false;
                        let temp = {};
                        for (let key in query) {
                            temp[key] = query[key];
                            //存入变量中
                        }
                        for (let key in formdata) {
                            temp[key] = formdata[key];
                            //存入变量中
                        }
                        this.config.forEach(item => {
                            let prefix = item.prefix;
                            if (reqPrefix == prefix) {
                                item.list.forEach(u => {
                                    let methods = u.methods || [];
                                    if(methods.indexOf(req.method) > -1){
                                        let uri = u.url.split('?')[0];
                                        if(`/${prefix}${uri}` == url) {
                                            ishas = true;
                                            let returnvalue = '';
                                            if(typeof u.content =='string'){
                                                returnvalue = u.content;
                                                res.send(returnvalue);
                                                res.end();
                                                return false;
                                            } else{
                                                try {
                                                    //执行所有的表达式，判断满足条件的返回
                                                    for (let k in u.content) {
                                                        if (k != 'default') {
                                                            try {
                                                                with (temp) {
                                                                    if (eval(unescape(k))) {
                                                                        returnvalue = u.content[k];
                                                                        break;
                                                                    }
                                                                }
                                                            } catch (e) {
                                                                console.log(e)
                                                            }
                                                        }
                                                    }
                                                } catch (e) {
                                                    console.log(e)
                                                    returnvalue = e;
                                                }
                                                if(returnvalue===''){
                                                    returnvalue = u.content.default;
                                                }
                                                res.send(returnvalue);
                                                res.end();
                                                return false;
                                            }
                                        }
                                        // if(u.url.indexOf('?')==-1){
                                        //     if ( `/${prefix}${u.url}` == url) {
                                        //         ishas = true;
                                        //         let returnvalue = u.content;
                                        //         res.send(returnvalue);
                                        //         res.end();
                                        //         return false;
                                        //     }
                                        // } else{
                                            // let uri = u.url.split('?')[0];
                                            // if ( `/${prefix}${uri}` == url) {
                                            //     //作为参数不一样的url特殊处理判断参数
                                            //     let istrue = false;
                                            //     if(u.url.indexOf('?')!=-1){
                                            //         let params= qs.parse(u.url.split('?')[1]);
                                            //         for(var key in params){
                                            //             if(query.hasOwnProperty(key) || params[key] ==query[key]){
                                            //                 istrue=true;
                                            //             }else{
                                            //                 istrue= false;
                                            //             }
                                            //         }
                                            //     }else{
                                            //         istrue = true;
                                            //     }
                                            //     if(istrue){
                                            //         ishas = true;
                                            //         let returnvalue = u.content;
                                            //         res.send(returnvalue);
                                            //         res.end();
                                            //         return false;
                                            //     }
                                            // }
                                        // }
                                    }
                                })
                            }
                        })
                        if (!ishas) {
                            res.send(`404！您所请求的地址或方式不对，请仔细核对url:${url},method:${req.method}，非常感谢您对icestar的支持，您的支持是我前进的动力。`);
                        }
                        next();
                    }
                });
            }
        })
    }
}
module.exports = httpserver;