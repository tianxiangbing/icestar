import React,{useState} from 'react';
const {Post} = require('../utils/common');
import {getI18n} from '../utils/utils';

const onSubmit =(e,props)=>{
    e.preventDefault()
    let res ;
    if(props.onClick)  {
       res = props.onClick(e);
    }
    if(res === false)return false;
    // console.log(props)
    // console.log(props.form.getFormData());
    props.form.validateFields((res,isvalid,msg)=>{
        // console.log(res,isvalid,msg)
        // debugger
        if(isvalid){
            let param = props.form.getFormData();
            if(props.action){
                if(props.beforeSubmit){
                    props.beforeSubmit(props,(param)=>{
                        Req(props,param);
                    });
                }else{
                    Req(props,param);
                }
            }
        }
    });
}
const Req = (props,param)=>{
    Post(props.action, Object.assign(param,props.param)).then(res=>{
        props.callback && props.callback(res)
    })
}

const Button = (props) => {
    // console.log(props,333)
    let {value,locale,className} = props;
    if(locale){
        value =getI18n(value,locale);
    }
    return <button type="button" className={className} onClick={e=>onSubmit(e,props)}>{value}</button>
}
module.exports= Button;