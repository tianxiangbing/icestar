/*
 * Created with Visual Studio Code.
 * github: https://github.com/tianxiangbing
 * User: 田想兵
 * Date: 2019-03-20
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Div from './Div';
import Container from './Container';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import Js from './Js';
import Css from './Css';
import baseReducer from '../utils/reducer';
import inherit from '../utils/inherit';
import {getObj,updateId} from '../utils/common';
const { renderBox, reg, formatData } = require('../utils/utils');
const Form = require('xui-form');

// const Box = (props) => {
//   let { tpl, className, data, enableRedux, reducers,form ,id} = props;
//   // console.log(props, 222)
//   console.log(66666)
//   return (
//     <div className={className}>{renderBox(tpl, data, enableRedux,form,id)}</div>
//   );
// }
class Box extends Component {
  // shouldComponentUpdate(newProps){
  //   // console.log('new:::::',newProps)
  //   // console.log(newProps.data,44443333)
  //   return true;
  // }
  // componentWillReceiveProps(newProps){
  //   // console.log(newProps.data,44443333)
  // }
  constructor(props){
    super(props);
    this.state = {tpl:this.props.tpl};
  }
  componentDidMount(){
    let {childTpl} = this.props;
    if(childTpl && childTpl.length>0){
      let tpl = this.state.tpl;
      let Inh = inherit(tpl);
      tpl = Inh(childTpl);
      this.setState({tpl})
    }
  }
  render() {
    let { childTpl, className, data, enableRedux, reducers, form, id, locale,checkPermission } = this.props;
    // console.log(locale)
    // console.log(data, 222)
    // console.log(66666)
    // console.log(newTpl);
    return (
      // <div className={className}>{renderBox(newTpl, data, enableRedux, form, id, locale,checkPermission)}</div>
      <div className={className}>{renderBox(this.state.tpl, this.props)}</div>
    );
  }
}
class DynamicPotal extends Component {
  constructor(props) {
    super(props);
    let { data, enableRedux, reducers, formName, js, css, format, id } = this.props;
    // console.log(222222)
    if (enableRedux) {
      const rootReducer = function (state, action) {
        let newState = Object.assign({}, state);
        let newS = baseReducer(newState, action);
        let newSt = reducers(newS, action);
        return Object.assign(newS, newSt);
      }
      this.store = createStore(rootReducer, data);
    }
  }
  componentWillReceiveProps({ data }) {
    if (typeof data == 'undefined') {
      data = {}
    }
    this.store.dispatch({ type: 'INIT', data });
  }
  render() {
    let { data, enableRedux, reducers, formName, js, css, format, id,isForm=false } = this.props;
    data = formatData(data, id);
    // console.log(4444,data)
    // console.log(this.store,'sssss')
    if (!enableRedux) {
      return (
        <Box {...this.props} id={id}></Box>
      )
    } else {
      const mapStateToProps = (state) => {
        return ({
          data: state
        })
      };
      let RBox = connect(mapStateToProps)(Box);
      if (formName) {
        RBox = Form.create({ name: formName })(RBox);
      }else if(isForm){
        RBox = Form.create({ })(RBox);
      }
      // console.log(data, 2221)
      // this.store.dispatch({type:'INIT',data});
      return (
        <Provider store={this.store}>
          <RBox {...this.props} id={id}></RBox>
        </Provider>
      )
    }
  }
}
class Dynamic extends Component {
  static options={}
  id = Date.now()
  constructor(props) {
    super(props)
    this.id = props.id || Date.now();
    reg(Object.assign({ Div, Container }, props.components), this.id);
  }
  render() {
    let newProps = Object.assign({},Dynamic.options,this.props);
    let { data, enableRedux, reducers, formName, js, css, format } = newProps;
    // console.log(1111,data)
    // console.log(newProps)
    return (
      <React.Fragment>
        <Js source={js} id={this.id} method="initComponent" />
        <Js source={format} id={this.id} method="jsFormat" />
        <Css source={css} />
        <DynamicPotal {...newProps} id={this.id} />
      </React.Fragment>
    )
  }
}

export default Dynamic;