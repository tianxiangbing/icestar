/*
 * @Descripttion: 
 * @Author: tianxiangbing
 * @Date: 2019-04-01 13:39:31
 * @LastEditTime: 2019-12-12 17:25:22
 * @github: https://github.com/tianxiangbing
 */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Test from './test'
import Form from './Form/components/Form'
const { Input, InterInput, LetterInput, ThousandInput, NumericInput } = require('jsx-input');

const RadioList = require('x-radio-list');
const { Div, Container, Item, Button,TextItem,NumberItem,InputItem } = require('../src/index');
const Fold = require('x-fold');
// const Test = require('./test');

require('x-fold/lib/index.css')

require('x-radio-list/lib/index.css');

import NumericItem from './components/NumericItem'
import HandNumItem from './components/HandNumItem';
import BtnRequote from  './components/BtnRequote';
import BatchUpdate from  '../src/components/BatchUpdate';
// const HandNumItem =  require('./components/HandNumItem');
// const actions ={
//     updateAmount: (hand)=>{
//         return {
//             type:'UPDATEHAND',
//             hand
//         }
//     }
// }
// const mapStateToProps = (state)=>{
//     return ({  
//         data:state
//     })
// }
// const mapDispatchToProps = (dispatch)=>{
//     return {
//         updateAmount:(data)=> dispatch( actions.updateAmount(data) )
//     }
// }
// console.log(HandNumItem)
const FormItem = Form.Item;
const RadioItem = RadioList.Radio;
const FoldItem = Fold.Panel;

class SwitchButton extends React.Component{
    render(){
        return <button onClick={this.click}>切换</button>
    }
    click =()=>{
        this.props.update('','switch');
    }
}
module.exports = {
    BatchUpdate, SwitchButton,FormItem,RadioItem,FoldItem,Input, InterInput, LetterInput, ThousandInput, NumericInput,TextItem,NumberItem,InputItem, Form, RadioList, NumericItem, HandNumItem, Fold, Test, Button,BtnRequote
}