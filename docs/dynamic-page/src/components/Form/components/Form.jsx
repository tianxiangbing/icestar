/*
 * Created with Visual Studio Code.
 * github: https://github.com/React-xui/x-seed
 * User: 田想兵
 * Date: 2017-05-14
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import FormItem from './FormItem';
// import { EventEmitter } from 'events';
import Tooltip from 'antd/lib/tooltip';
// import 'antd/lib/tooltip/style/css';

function getValue(d, na) {
  if (na.length === 0) {
    return d;
  }
  let n = na.shift();
  if (typeof d === 'undefined') return '';
  let obj = d[n];
  return getValue(obj, na)
}
const getI18n = (key, d = {}) => {
  let na = String(key).split('.');
  let value = getValue(d, na);
  if (typeof value === 'undefined') {
    return key;
  } else {
    return value;
  }
}
export default class Form extends Component {
  static methods = {};//自定义的规则
  static addMethod(rule, callback) {
    Form.methods[rule] = callback;
  }
  componentDidMount(){
    // document.body.focus();
    // if(document.querySelectorAll('input').length ){
    //   let dom = document.querySelectorAll('input')[0]
    //   dom.focus();
    //   dom.blur();
    // } 
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(event);
  }
  render() {
    // console.log(this.props)
    let cls = (this.props.className || "") + ' x-form';
    return (
      <form className={cls} {...this.props} onSubmit={this.onSubmit} />
    );
  }
}
Form.Item = FormItem;


function setValue(v, na, formData) {
  // if(na.length===0){
  //     return d;
  // }
  let n = na.shift();
  // if(typeof formData[n]=='undefined'){
  if (na.length === 0) {
    formData[n] = v
  } else {
    formData[n] = formData[n] || {};
  }
  // }
  if (na.length > 0) {
    return setValue(v, na, formData[n])
  }
}
Form.create = (param = {}) => {
  let prefix = param.name;
  const FormContext = React.createContext(prefix);
  let form = {
    formData: {},
    formControl: {},
    validator: {},
    getFieldDecorator(name, obj) {
      let triggerName = obj.trigger || "onChange";
      let validateTrigger = obj.validateTrigger || "onChange";
      let self = this;
      // console.log(this)
      let formData = this.formData;
      return (WrapComponent) => {
        let cname = prefix ? prefix + '.' + name : name;
        class Cls extends Component {
          // return hoistNonReactStatics(WrapComponent,<Item/>)
          setFormData(name, v) {
            let na = name.split('.');
            setValue(v, na, formData);
          }
          constructor(props) {
            super(props)
            let v = typeof obj.value === 'undefined' ? '' : obj.value;
            this.state = { v, validateStatus: true };
            // console.log(self)
            // formData[cname] = v;
            this.setFormData(name, v);
            self.formControl[cname] = this;
          }
          componentDidMount() {
            // self.formControl[cname].on('setValue', v => {
            //   this.setState({ v });
            // });
            // self.formControl[cname].on('validate', (callback) => {
            //   this.validate(this.state.v);
            //   callback(self.validator[cname]);
            // });
          }
          setValue(v) {
            this.setState({ v })
          }
          componentWillReceiveProps(newProps) {
            let nv = newProps.value;
            if (typeof nv === 'undefined') {
              nv = ''
            }
            if (newProps.value != this.state.v) {
              this.setState({ v: newProps.value })
            }
          }
          validateValue() {
            this.validate(this.state.v);
          }
          validate(v) {
            let rules = obj.rules || [];
            // let v = this.state.v;
            v = typeof v === 'undefined' ? '' : String(v);
            let isvalid = true, msg = ''
            for (let i = 0, l = rules.length; i < l; i++) {
              let r = rules[i];
              for (let k in r) {
                switch (k) {
                  case 'required': {
                    if (v.length === 0) {
                      isvalid = false;
                      msg = r.message;
                    }
                  }
                    break;
                  case 'minLength':
                    if (v.length < r.minLength) {
                      isvalid = false;
                      msg = r.message;
                    }
                    break;
                  case 'maxLength':
                    if (v.length > r.maxLength) {
                      isvalid = false;
                      msg = r.message;
                    }
                    break;
                  case 'min':
                    if (v < r.min) {
                      isvalid = false;
                      msg = r.message;
                    }
                    break;
                  case 'max':
                    if (v > r.max) {
                      isvalid = false;
                      msg = r.message;
                    }
                    break;
                  case 'pattern': {
                    let reg = r.pattern;
                    if (!reg.test(v)) {
                      isvalid = false;
                      msg = r.message;
                    }
                  } break;
                  case 'custom': {
                    let m = r.custom || 'validate';
                    let res = this.ref[m](v);
                    if (typeof res === 'object' && !res.success) {
                      msg = res.message;
                      isvalid = false;
                    } else
                    if (!res) {
                      isvalid = false;
                      msg = r.message;
                    }
                    break;
                  }
                  case 'async': {
                    let m = r.async || 'asyncValidate';
                    this.ref[m](v).then(() => {
                      if (isvalid) {
                        self.validator[cname] = { validateStatus: true };
                        this.setState({ validateStatus: true });
                      }
                    }).catch((res) => {
                      isvalid = false;
                      msg = res || r.message;
                      self.validator[cname] = { validateStatus: false, msg };
                      this.setState({ validateStatus: false, msg })
                    });
                    break;
                  }
                  default: {
                    //取全局定义的验证规则
                    if (Form.methods[k]) {
                      // debugger
                      let res = Form.methods[k](v, this.props, self.getFormData());
                      if (typeof res === 'object' && !res.success) {
                        msg = res.message;
                        isvalid = false;
                      } else
                        if (!res) {
                          isvalid = false;
                          msg = r.message;
                        }
                    }
                    break;
                  }
                }
              }
            }
            if (isvalid) {
              self.validator[cname] = { validateStatus: true };
              this.setState({ validateStatus: true });
            } else {
              self.validator[cname] = { validateStatus: false, msg };
              this.setState({ validateStatus: false, msg })
            }
          }
          render() {
            let override = {
              value: this.state.v
            };
            // formData[cname] = this.state.v;
            this.setFormData(name, this.state.v);
            let className = '', title = '';
            if (!this.state.validateStatus) {
              className = 'validate-error';
              title = this.state.msg;
            }
            override["className"] = className;
            // override["title"] = title;
            // console.log(WrapComponent)
            //对trigger进行合并，先执行内部的change方法
            let _this = this;
            override[triggerName] = function (v) {
              WrapComponent.props.hasOwnProperty(triggerName) ? WrapComponent.props[triggerName].call(this, v) : null;
              // formData[cname] = v;
              _this.setFormData(name, v);
              // if(triggerName==='onChange'){
              // debugger;
              if (typeof v === 'object' && v.constructor.name === 'SyntheticEvent') {
                v = v.currentTarget.value;
              }
              _this.setState({ v });
              // }
              if (triggerName === validateTrigger) {
                _this.validate(v);
              }
            }
            if (validateTrigger !== 'onChange') {
              override[validateTrigger] = (v) => {
                _this.validate(v);
              }
            }
            let mergeprops = Object.assign({ autoFocus: true }, _this.props, override);
            // if(!_this.state.validateStatus){
              mergeprops.autoFocus = false;
            // }
            if (typeof _this.props.className !== 'undefined' && typeof override.className !== 'undefined') {
              mergeprops.className = _this.props.className + ' ' + override.className;
            }
            // this.ref = React.createRef();
            // mergeprops.ref = this.ref;
            mergeprops.onLoad = ref => {
              _this.ref = ref;
            }

            let newdom = React.cloneElement(WrapComponent, mergeprops);
            // if (!_this.state.validateStatus) {
              getI18n(title, mergeprops.locale)
              // newdom = React.cloneElement(WrapComponent, Object.assign(mergeprops,{autoFocus:true}));
              // console.log(1111,title,!_this.state.validateStatus)
              newdom = React.createElement(Tooltip, { title, trigger: 'focus|hover' }, newdom);
            // }
            return newdom;
          }
        }
        // let props = this.formControl[name];
        Cls.displayName = 'formItem';
        // this.formControl[cname] = new EventEmitter();
        return <Cls />;
        // return <Cls {...props}/>
      }
    },
    getFormData() {
      if (prefix) {
        let newData = {};
        for (let k in this.formData) {
          newData[`${prefix}.${k}`] = this.formData[k];
        }
        return newData;
      }
      return this.formData;
    },
    setFieldsValue(param) {
      // for (let k in param) {
      //   // this.formControl[k] = {value : param[k]};
      //   this.formControl[k].emit('setValue', param[k]);
      // }
      this.setv(param, [])
      // console.log(this.formData)
    },
    setv(obj, path) {
      for (let k in obj) {
        if (k === 'children') continue;
        path.push(k)
        if (typeof obj[k] === 'object') {
          this.setv(obj[k], path)
        } else {
          // console.log(path.join('.') + ':' + obj[k])
          // let eventer = this.formControl[path.join('.')];
          // eventer && eventer.emit('setValue', obj[k]);
          // this.formData[path.join('.')] = obj[k];
          // setValue(obj[k],path.join('.').split('.'),this.formData);
          this.formControl[path.join('.')] && this.formControl[path.join('.')].setValue(obj[k]);
          path.pop()
        }
      }
      path.splice(0, path.length)
    },
    //验证form
    validateFields(fields = [], callback = () => { }) {
      if (typeof fields === 'function') {
        callback = fields;
        fields = [];
      }
      let result = {};
      let promiseArr = [];
      if (fields.length == 0) {
        for (let k in this.formControl) {
          promiseArr.push(new Promise(resolve => {
            if (this.formControl[k]) {
              this.formControl[k].validateValue()
              result[k] = this.validator[k];
              resolve(result);
            } else {
              resolve({});
            }
            // this.formControl[k].emit('validate', res => {
            //   result[k] = res;
            //   resolve(result)
            // });
          }))
        }
      } else {
        for (let k in fields) {
          promiseArr.push(new Promise(resolve => {
            if (this.formControl[fields[k]]) {
              result[fields[k]] = this.validator[fields[k]];
              resolve(result)
            } else {
              resolve({});
            }
            // this.formControl[fields[k]].emit('validate', res => {
            //   result[fields[k]] = res;
            //   resolve(result)
            // });
          }))
        }
      }
      Promise.all(promiseArr).then(() => {
        let isvalid = true, msg = [], errors = [];
        for (let k in result) {
          if (result[k] && result[k].validateStatus === false) {
            isvalid = false;
            msg.push(result[k].msg);
            errors[k] = result[k];
          }
        }
        callback(errors, isvalid, msg)
      })
    }
  }
  form.getFieldDecorator = form.getFieldDecorator.bind(form);
  form.getFormData = form.getFormData.bind(form);
  form.setFieldsValue = form.setFieldsValue.bind(form);
  form.validateFields = form.validateFields.bind(form);
  return WrapComponent => class extends Component {
    constructor(props) {
      super(props)
      // form.getFieldDecorator('a',{})
    }
    render() {
      // console.log(form)
      // console.log(WrapComponent)
      return <WrapComponent {...this.props} form={form} ></WrapComponent>
    }
  }
} 