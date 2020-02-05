/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2019-03-20 10:45:51
 * @LastEditTime: 2019-12-18 15:31:40
 * @github: https://github.com/tianxiangbing
 */
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var config = require("../webpack.config.js");
config.entry={ app: [ path.resolve(__dirname, "../dev/app.js")] };
console.log(config.entry);
const process = require('child_process');
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase:'dev'
});
server.listen(8888,'127.0.0.1',()=>{
    console.log('http://localhost:8888/')
});

