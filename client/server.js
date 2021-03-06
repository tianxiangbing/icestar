// webpack = require('webpack');
// WebpackDevServer = require('webpack-dev-server');
// var config = require("./webpack.config.js");
// if (process.env.NODE_ENV == "development") {
//     config.entry.app.unshift("webpack-dev-server/client?http://localhost:52014/");
// } else {
//     config.entry.app.unshift("webpack-dev-server/client?http://localhost:52013/");
// }
// var compiler = webpack(config);
// var server = new WebpackDevServer(compiler, {

// });
// if (process.env.NODE_ENV == "development") {
//     server.listen(52014);
// } else {
//     server.listen(52013, '127.0.0.1');
// }
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const process = require('child_process');
const spawn = process.spawn;
const path = require('path');
let config = require("./webpack.config.js");
// config.entry.app.unshift("webpack-dev-server/client?http://localhost:52013/");
let compiler = webpack(config);
let server = new WebpackDevServer(compiler, {
    // hot:true,
    after() {
        console.log('before....')
        process.exec('electron ../main');
    }
});
// WebpackDevServer.addDevServerEntrypoints(config, {hot:true});
server.listen(52013, '127.0.0.1',()=>{
    console.log('服务启动')
});
