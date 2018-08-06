
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
                        let query = req.method === 'GET' ? req.query : req.body;
                        let urlArr = url.split('/');
                        let reqPrefix = urlArr[1];
                        let ishas = false;
                        this.config.forEach(item => {
                            let prefix = item.prefix;
                            if (reqPrefix == prefix) {
                                item.list.forEach(u => {
                                    let methods = u.methods || [];
                                    if (`/${prefix}${u.url}` == url && methods.indexOf(req.method) > -1) {
                                        ishas = true;
                                        let returnvalue = u.content;
                                        res.send(returnvalue);
                                        res.end();
                                        return false;
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