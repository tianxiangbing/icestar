// import {Component} from 'react';
import React from 'react';
let {Component} = React;
import Styles from './_Menu.scss';

export default class Menu extends Component{
    render(){
        return (
        <div className="menu">
            <i className="iconfont icon-203 foward" onClick={()=>history.back()}/>
            {this.props.children}
            <i className="iconfont icon-caidan1 more"/>
        </div>
        )
    }
}