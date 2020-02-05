/*
 * @Descripttion: 批量更新组件，可以适用在ws场景中
 * @Author: tianxiangbing
 * @Date: 2019-12-12 13:48:39
 * @LastEditTime : 2020-01-09 15:21:22
 * @github: https://github.com/tianxiangbing
 */

import React from 'react';
import {getNameValue} from '../utils/utils';
export default class BatchUpdate extends React.Component{
    componentDidMount(){
        //注册ws，
        //title根据data来拼接
        //props.titleArr[{type:'ls',name:'bankId'},{type:'data',name:'underly'},{type:'static',name:'0000'}]
        //更新的字段关系{ask:askPrice,bid:bidPrice},key为目标键值，value为ws推送的字段名称
        // titleArr.map(item=>{
        //     switch(item.type){
        //         case 'ls':{
        //             return localStorage.getItem(item.name)
        //         }
        //         case 'data':{
        //             return data[item.name]
        //         }
        //         case 'static':{
        //             return name;
        //         }
        //         default:{
        //             return item;
        //         }
        //     }
        // }).join('.')
        let {subscribe,data,updateFields} = this.props;
        subscribe&&subscribe(res=>{
            let target = {};
            for(let key in updateFields){
                target[key] = getNameValue(updateFields[key],data);
            }
            this.props.update(target,'BATCHUPDATE');
        })
    }
    render(){
        return null;
    }
}