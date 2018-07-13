
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
var app = express();
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
let httpserver = {
    port: 8080,
    config: {},
    init(param) {
        let { port, path, status } = param;
        this.mockpath = path;
        this.port = port;
        this.bindConfig();
        this.server = require('http').createServer(app);
        this.server.listen(port, () => {
            var host = this.server.address().address;
            var port = this.server.address().port;
        });
        return this.server;
    },
    showtip: (text) => {
        $('#tips').html(text);
        setTimeout(() => {
            $('#tips').html('');
        }, 1000)
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
                        alert(err);
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
                                    let method = u.method || [];
                                    if (`/${prefix}${u.url}` == url && method.indexOf(req.method) > -1) {
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