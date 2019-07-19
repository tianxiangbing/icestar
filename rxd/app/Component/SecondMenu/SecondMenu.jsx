import React from 'react';
let {Component} = React;
import Styles from './_SecondMenu.scss';
import {Link} from 'react-router';
import Dialog from 'Component/Dialog/Dialog';
export default class SecondMenu extends Component{
	constructor(props){
		super(props);
		this.state={dialog:0};
	}
    checkLogin(){
		this.setState({dialog:{msg:'请先登录',type:'alert',show:true}});
		return false;
    }
	renderDialog(){
		console.log(this.state.dialog)
		return <Dialog stage={this} {...this.state.dialog}/>
	}
    render(){
        return (
            <div className="menu-list">
                <Link to="/"><i className="iconfont icon-shouye"/>首页</Link>
                <Link to="shop" onClick={this.checkLogin.bind(this)}><i className="iconfont icon-shouye2"/>商城</Link>
                <Link to="list"><i className="iconfont icon-caidan"/>记录</Link>
                {this.state.dialog?this.renderDialog():undefined}
            </div>
        )
    }
}