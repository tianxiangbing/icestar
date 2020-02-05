import React,{Component} from 'react';

const { Div, Container, Item, Button,WrapFormItem } = require('../../src/index');
const { Input, InterInput, LetterInput, ThousandInput, NumericInput } = require('jsx-input');

class HandNumItem extends Component {
    change = (v) => {
        let { update } = this.props;
        console.log(this.props)
        // let {price,quality} = this.props.data;
        // updateAmount(v);
        // debugger
        // update(v, 'UPDATEHAND')
        this.props.onChange && this.props.onChange(v);
        this.props.onLoad && this.props.onLoad(this)
    }
    // componentWillReceiveProps(newProps) {
    //     console.log(newProps, this.props, 1111)
    //     debugger
    // }
    componentWillUnmount(){
        console.log(3333);
    }
    componentDidMount(){
        // setTimeout(e=>{
            // this.change(this.props.value);
        // },1000)
    }
    validate(){
        alert(1)
    }
    render() {
        let { className, label, value, decimals ,title} = this.props;
        return (
            <Div className={className} title={title}>
                <Div value={label}></Div>
                <Input decimals={decimals} value={value} className="" onChange={this.change} />
            </Div>
        )
    }
}
export default  WrapFormItem(HandNumItem);