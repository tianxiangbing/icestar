

import mockAdd from "mock/add";
import mockList from "mock/list";
import mockProjectList from "mock/projectList";
import toolFilemd5 from 'tool/filemd5';
import formatJson from 'tool/formatJson';
import projectAdd from 'mock/projectAdd';
import mockConfig from 'mock/mockConfig';

export default [{
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
}
];