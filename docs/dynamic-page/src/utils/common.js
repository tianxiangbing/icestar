const axios = require('axios');
const config = {
    server: {
        ecas: 'ecas',
        biz: 'biz',
        egate: 'egate',
    },
}
let Ajax = function ({
    method = 'post',
    url = '',
    data = {},
    host = window.server === 'ecas' ? 'biz' : window.server,
    responseType = 'json',
    prefix = '',
    wrap = true
}) {
    if(!/^([http:]|[https:])/.test(url)){
        let server = config.server[host] || window.server||'/';
        url = server + '/' + url;
            
    }
    let params = {};
    if (prefix) {
        for (let key in data) {
            params[`${prefix}.${key}`] = data[key];
        }
    } else {
        params = data;
    }
    let urlparams;
    if (wrap) {
        urlparams = new URLSearchParams();
        urlparams.append('reqJson', JSON.stringify(params));
    }
    return axios({
        method: method,
        url: url,
        data: urlparams,
        responseType: responseType,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }).then(res => {
        let data = res.data;
        if (responseType === 'json') {
            if (data.success) {
                let result = data.data.result ? data.data.result : data;
                return result;
            } else {
                if (data.message === "error.user.notLogin") {
                    Router.push('/login')
                }
                return Promise.reject(data)
            }
        } else {
            return data;
        }
    }).catch(e => {
        return Promise.reject(e);
    });
}

let Post = function (url, data, callback = () => { }, errcallback = () => { }, type = 'post', dataType = 'json') {
    return Ajax({
        method: type,
        url,
        data,
        host: window.server === 'ecas' ? 'biz' : window.server
    }).then(res => {
        callback(res);
        return res;
    }).catch(e => {
        errcallback(e);
    })
}

const getObj=(id,data)=>{
    let returnValue = null;
    for(let i = 0 ,l = data.length ; i <l; i++){
        let item= data[i];
        if(item.id == id){
            return item;
        }
        if(item.children &&item.children){
            returnValue = getObj(id,item.children);
            if(returnValue)return returnValue;
        }
    } 
    return returnValue;
}

const getItem = (id,data,parent)=>{
    let returnValue = null;
    for(let i = 0 ,l = data.length ; i <l; i++){
        let item= data[i];
        if(item.id == id){
            return {item,parent, i};
        }
        if(item.children &&item.children){
            returnValue = getItem(id,item.children,item,i);
            if(returnValue)return returnValue;
        }
    } 
    return returnValue;
}

const updateId = (json,level=0)=>{
    if(json){
        for(let i = 0 ,l =json.length;i<l;i++){
            if(typeof json[i].id=='undefined'){
                if(level ==0){
                    json[i].id=0;
                }else{
                    json[i].id= String(Date.now()+Math.random()).replace('.','');
                }
            }
            if(json[i].children && json[i].children.length){
                json[i].isContainer= true;
            }
            updateId(json[i].children,level+1)
        }
    }
}
module.exports = {
    Ajax,
    Post,
    getObj,
    getItem,
    updateId
}