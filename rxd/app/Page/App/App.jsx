/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com
 * User: 田想兵
 * Date: 2016-05-30
 * Time: 10:27:55
 * Contact: 55342775@qq.com
 */
import React from 'react';
import { Link } from 'react-router';
import Config from 'config';
let { Component } = React;
import Styles from './_App.scss';
import Menu from 'Component/Menu/Menu';
import SecondMenu from 'Component/SecondMenu/SecondMenu';
import Dialog from 'Component/Dialog/Dialog';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { dialog: 0 };
	}
	componentDidMount(){
		//请求ajax
		Config.ajax('/').then((result)=>{
			//处理返回结果
			this.setState({userName:"田先生"})
		}).catch(()=>{
			this.setState({dialog:{msg:'网络错误',type:'alert',show:true}});
		});
	}
	render() {
		return (
			<div>
				<Menu>首页</Menu>
				<SecondMenu />
				<p>欢迎您：{this.state.userName}</p>
				{this.state.dialog?<Dialog stage={this} {...this.state.dialog}/>:undefined}
			</div>
		)
	}
}