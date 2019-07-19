import React from 'react';
let {Component} = React;
import Menu from 'Component/Menu/Menu';
import SecondMenu from 'Component/SecondMenu/SecondMenu';

export default class List extends Component{
    constructor(props){
		super(props);
    }
    render(){
        return (
        <div>
				<Menu>记录</Menu>
				<SecondMenu/>
        </div>
        )
    }
} 