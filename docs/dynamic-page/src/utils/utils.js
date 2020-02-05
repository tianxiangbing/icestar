/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2019-04-01 10:42:29
 * @LastEditTime : 2020-01-13 19:07:08
 * @github: https://github.com/tianxiangbing
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Formatter from './formatter';
// const { Input, InterInput, LetterInput, ThousandInput, NumericInput } = require('jsx-input');
// const Form = require('xui-form');
// const Div = require('./Div.jsx');
// const Container = require('./Container');

export const reg = (components, id) => {
    window.__txb = window.__txb || {};
    window.__txb[id] = { components: components };
}
window.initComponent = (com, id) => {
    let name = com && com.name;
    if (name) {
        window.__txb[id].components[name] = com;
    }
}
window.jsFormat = (method, id) => {
    let name = method && method.name;
    if (name) {
        window.__txb[id].method = window.__txb[id].method || {};
        window.__txb[id].method[name] = method;
    }
}
//数据处理
export const formatData = (data, id) => {
    if (window.__txb[id].method && window.__txb[id].method['format']) {
        return window.__txb[id].method['format'](data);
    } else {
        return data;
    }
}
// const getComponent = (type,id)=>{
//     let components = window.__txb[id].components = Object.assign({}, window, window.__txb[id].components);
// }
const ProxyComponent = (WrappedComponnet) => class extends Component {
    static displayName = 'ProxyComponent'
    changeHandle = (e) => {
        let value = typeof e == 'object' ? e.target.value : e;
        this.props.onChange && this.props.onChange.call(this.props, value);
    }
    render() {
        return <WrappedComponnet {...this.props} onChange={this.changeHandle} />
    }
}
export const getType = (type, isRedux, id, proxyChange = false) => {
    // if(type=='Button')debugger
    // if(type=='HandNumItem')debugger;
    let components = window.__txb[id].components = Object.assign({}, window, window.__txb[id].components);
    let t = '';
    // eval(`t=${components[type]}`);
    if (type.indexOf('.') > -1) {
        let names = type.split('.');
        t = components[names[0]] && components[names[0]][names[1]];
    } else {
        t = components[type];
    }
    if (proxyChange) {
        t = ProxyComponent(t);
    }
    // console.log(t,type)
    if (isRedux) {
        let cn = `C${type}`;
        if (!components.hasOwnProperty(cn)) {
            components[cn] = connect(mapStateToProps, mapDispatchToProps)(t);
        }
        t = components[cn];
    }
    // if(type ==="Form"){
    //     // debugger
    //     let cn = `CForm`;
    //     if(!components.hasOwnProperty(cn)){
    //         components[cn] = t.create({})(FormContainer);
    //     }
    //     t = components[cn] ;
    // }
    if (!t) t = type;
    return t;
}

// class FormContainer extends Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return <Form>{this.children}</Form>
//     }
// }

const mapStateToProps = (state) => {
    return ({
        data: state
    })
}
const actions = {
    update: (data, title) => {
        return {
            type: title,
            data
        }
    },
    sync: (data, title) => {
        return {
            type: title,
            data
        }
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        update: (data, title) => {
            return dispatch(actions.update(data, title));
        },
        batchUpdate:(data)=>{
            return dispatch(actions.update(data, 'BATCHUPDATE'));
        },
        sync: (data, name) => {
            return dispatch(actions.sync({ data, name }, 'SYNC'));
        }
    }
}

function getValue(d, na) {
    if (na.length === 0) {
        return d;
    }
    let n = na.shift();
    if (typeof d === 'undefined') return '';
    let obj = d[n];
    return getValue(obj, na)
}
export const getI18n = (key, d) => {
    if (!isNaN(key)) {
        return key;
    }
    let na = String(key).split('.');
    let value = getValue(d, na);
    if (typeof value === 'undefined' || value=="") {
        return key;
    } else {
        return value;
    }
}
export  function getNameValue(name, data) {
    let na = String(name).split('.');
    return getValue(data, na);
}
export const renderBox = (tpl, otherArgs) => {
    let { data = {}, enableRedux, form, id, locale, checkPermission, formatter, components } = otherArgs;
    // console.log(555555)
    if (tpl && tpl.length) {
        let childList = tpl.map((item, key) => {
            if (item && item.$$typeof && Symbol.for('react.element') == item.$$typeof) {
                return item;
            }
            if (!item) {
                // console.log(tpl,tpl[key])
                return null;
            }
            let { children, type, isRedux, method, mparam, visible, visibleValue, readOnly=otherArgs.readOnly,readOnlyValue=otherArgs.readOnlyValue, proxyChange } = item;
            // console.log(type,readOnly,otherArgs.readOnly)
            let itemId = item.id;
            let value = {}
            let name = item.props && item.props.name || '';
            // if(name=='amount') debugger;
            // if (item.hasOwnProperty("props") && item.props.hasOwnProperty('name') && data.hasOwnProperty(item.props.name)) {
            //     value.value = data[name];
            // }
            if (name != '') {
                value.value = getNameValue(name, data);
                if (item.formatter) {
                    let args = item.formatterArgs || [];
                    let mn = item.formatter;
                    value.value = Formatter.getValue(mn, value.value, args, id, formatter);
                    // if(Formatter[mn]){
                    //     value.value = Formatter[mn].apply(null,[value.value].concat([...args]));
                    // }else{
                    //     value.value = window.__txb[id].method[mn].apply(null,[value.value].concat([...args]));
                    // }
                }
            }
            let props = { key: key, locale, ...value, ...item.props, form, formatter, components };
            if (type == 'InputNumber') {
                //删除inputnumber的formatter
                delete props["formatter"];
            }
            if (item.sync && name && isRedux) {
                let oldChange = props.onChange;
                props.onChange = function (v) {
                    // console.log(v)
                    // debugger
                    // if(v!=='CNY')
                    this.sync(v, name);
                    oldChange && oldChange(v);
                }
            }
            // console.log(props)
            try {
                if (typeof visible === 'boolean') {
                    if (visible === false) {
                        return null;
                    }
                }
                if (typeof visible === 'string') {
                    let vv = getNameValue(visible, data);
                    if (typeof visibleValue !== 'undefined') {
                        if (visibleValue != vv) {
                            return null;
                        }
                    }else{
                        if(vv===false){
                            return null;
                        }
                    }
                }
                if (typeof readOnly === 'boolean') {
                    props.readOnly = readOnly
                }
                if (typeof readOnly === 'string') {
                    let vv = getNameValue(readOnly, data);
                    if (typeof readOnlyValue !== 'undefined') {
                        props.readOnly = readOnlyValue == vv;
                    }else{
                        props.readOnly = vv
                    }
                }
                // if ( (visible && !getNameValue(visible, data)) || visible===false) {
                //     return null;
                // }
                // if ((readOnly && getNameValue(readOnly, data)) ) {
                //     // debugger
                //     props.readOnly = data[readOnly]
                // }
                if (props.decimals && isNaN(props.decimals)) {
                    let { decimals } = props;
                    props.decimals = getNameValue(decimals, data);
                }
                // console.log(type)
                let ntype = getType(type, isRedux, id, proxyChange);
                // console.log(value)
                // console.log(type)
                // console.log(key)
                //权限判断
                if (checkPermission && props.powerBit) {
                    if (checkPermission(props.powerBit)) {
                        return null;
                    }
                }
                if (typeof method !== 'undefined') {
                    // debugger
                    let components = window.__txb[id].components;
                    let cn = `mc_${name}_${itemId}`;
                    if (!components.hasOwnProperty(cn)) {
                        let getFieldDecorator = form[method];
                        // let ch = renderBox(children, data, enableRedux,form);
                        let dom = React.createElement(ntype, props, renderBox(children, Object.assign({readOnly:readOnly,readOnlyValue:readOnlyValue},otherArgs)));
                        mparam[1].value = getNameValue(mparam[0], data);
                        components[cn] = getFieldDecorator.apply(null, mparam)(dom);
                    }
                    props.value = getNameValue(mparam[0], data);
                    return React.cloneElement(components[cn], props);
                } else {
                    // console.log(props.key,type)
                    return React.createElement(ntype, props, renderBox(children,  Object.assign({readOnly:readOnly,readOnlyValue:readOnlyValue},otherArgs)));
                }
            } catch (ex) {
                // console.log(type)
                throw ex;
            }
            // return <div key={key}>1{this.renderBox(children,type)}</div>
        })
        if (childList.length === 1) {
            return childList[0];
        } else {
            return childList;
        }
    } else if (tpl && tpl.$$typeof && Symbol.for('react.element') == tpl.$$typeof) {
        return tpl;
    }
}
export const WrapFormItem = (WrappedComponnet) => class extends Component {
    render() {
        let props = this.props;
        return <span onMouseEnter={props.onMouseEnter} onFocus={props.onFocus} onClick={props.onClick} onMouseLeave={props.onMouseLeave}><WrappedComponnet {...props} /></span>;
    }
}