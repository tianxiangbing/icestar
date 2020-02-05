/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2019-05-17 15:00:25
 * @LastEditTime : 2019-12-24 16:35:59
 * @github: https://github.com/tianxiangbing
 */
//同步name的reducer

const setNameValue =(obj,name,value)=>{
    let arr = name.split('.');
    // let obj = {};
    let i = 0 ;
    _setNameValue(obj ,arr,value);
    // console.log(obj);
    return obj ;
    // arr.forEach( (item,index) => {
    //      if(index === arr.length -1){
    //          obj [item]=value;
    //      }else{
    //          obj [item] = {};
    //          oj = obj[item]
    //      }
    // });
}
function _setNameValue(obj,arr,value){
    let name= arr.shift();
    if(arr.length !== 0 ){
        if( !isNaN(arr[0])){
            obj[name] = obj[name] ||[];
        }
        obj[name] = obj[name] ||{};
        _setNameValue(obj[name],arr,value)
    }else{
        obj [name] = value;
    }
}

const baseReducer = (state = {}, action) => {
    // debugger
    // return state;
    switch(action.type){
        case  "SYNC":{
            //同步字段
            let newState = Object.assign({}, state);
            setNameValue(newState,action.data.name,action.data.data)
            return newState;
        }
        break;
        case 'BATCHUPDATE':{
            //批量字段同步
            let newState = Object.assign({}, state);
            return Object.assign(newState,action.data||{});
        }break;
        case 'INIT':{
            return action.data
        }break;
        default:
        return state;
    }
}

export default baseReducer