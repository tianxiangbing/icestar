webpack = require('webpack');
WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
if(process.env.NODE_ENV =="dev"){
config.entry.app.unshift("webpack-dev-server/client?http://localhost:9090/");
}else{
config.entry.app.unshift("webpack-dev-server/client?http://192.168.40.93:8080/");
}
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {

});
if(process.env.NODE_ENV =="dev"){
	server.listen(9090);
}else{
	server.listen(8080,'127.0.0.1');
}