import React ,{Component} from 'react';
const { Div, Container, Item, Button } = require('../../src/index');
export default class BtnRequote extends Component{
    callback=res=>{
        let {update} = this.props;
        console.log(res,212)
        if(res.success){
            update(res.data.price,'REQUOTE')
        }
    }
    render(){
        return <Button {...this.props} callback={this.callback}/>
    }
} 