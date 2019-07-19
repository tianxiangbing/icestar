import React from 'react';
import Style from './_Dialog.scss';
//
let {Component} = React;

export default class Dialog extends Component{
	constructor(props){
		super(props);
		this.state ={show:props.show,msg:props.msg}
	}
	componentDidMount(){
		if(this.props.timer||this.props.type == "alert"){
			this.timer = setTimeout(()=>{
				this.setState({show:false});
				this.props.stage.setState({dialog:0})
			},this.props.timer||2000)
		}
	}
	hide(){
		this.props.hide();
	}
	render(){
		let d = "";
		if(this.state.show){
			d = (
				<div>
					<div className={"dialog " +this.props.type}>
						<div>{this.props.msg}</div>
						{this.props.buttons}
					</div>
					{this.props.mask?<div className="dialog-mask" onClick={this.hide.bind(this)}/>:undefined}
				</div>
				)
		}
		return (
				<div>
				{d}
				</div>
			)
	}
}