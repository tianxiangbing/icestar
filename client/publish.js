const webpack = require('webpack');
const path = require('path');
let config = require("./webpack.config.dist.js");
console.log(config)
let compiler = webpack(config);
compiler.run((err,status)=>{
    console.log(err,status)
});