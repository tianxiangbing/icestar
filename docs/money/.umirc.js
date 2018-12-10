
const path  = require('path');
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'money',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  history:'hash',
  exportStatic:{
    dynamicRoot:true
  },
  outputPath:'./docs',
  disableCSSModules:true,
  alias:{
    utils: path.resolve(__dirname, "src/utils"),
    components: path.resolve(__dirname, "src/components"),
  },
  "proxy": {
    "/east": {
      "target": "http://nuyd.eastmoney.com/EM_UBG_PositionChangesInterface/api",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "api" }
    }
  },
}
