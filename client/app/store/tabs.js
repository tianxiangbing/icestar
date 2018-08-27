

import mockAdd from "mock/add";
import mockList from "mock/list";
import mockProjectList from "mock/projectList";
import toolFilemd5 from 'tool/filemd5';
import formatJson from 'tool/formatJson';
import projectAdd from 'mock/projectAdd';
import mockConfig from 'mock/mockConfig';
import mockSocket from 'mock/mockSocket';
import mockSocketAdd from 'mock/mockSocketAdd';
import mockSocketConfig from 'mock/mockSocketConfig';
import home from 'home';
import viewpage from 'viewpage';
import post from 'post/index';

export default [{
    title: "首页",
    name:'home',
    component:home,
    props:[]
},{
    title: "",
    name:'wview',
    component:viewpage,
    props:[]
},{
    title: "添加接口",
    name:'mockAdd',
    component:mockAdd,
    props:[]
},{
    title: "服务配置",
    name:'mockConfig',
    component:mockConfig,
    props:[]
},{
    title: "项目列表",
    name:'mockProjectList',
    props:[],
    component:mockProjectList
},{
    title: "接口列表",
    name:'mockList',
    props:[],
    component:mockList
},{
    title: "文件MD5加密",
    name:'filemd5',
    props:[],
    component:toolFilemd5
},{
    title:"新增项目",
    name:"projectAdd",
    props:[],
    component:projectAdd
},{
    title:"Json格式验证",
    name:"formatJson",
    props:[],
    component:formatJson
},{
    title:"模拟推送",
    name:"mockSocket",
    props:[],
    component:mockSocket
},{
    title:"添加推送",
    name:"mockSocketAdd",
    props:[],
    component:mockSocketAdd
},{
    title:"推送服务配置",
    name:"wsConfig",
    props:[],
    component:mockSocketConfig
},{
    title:"请求测试",
    name:"post",
    props:[],
    component:post
}];