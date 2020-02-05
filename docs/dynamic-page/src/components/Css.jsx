import React,{Component} from 'react';
import ReactDOM from 'react-dom';
let parent = document.getElementsByTagName('body')[0];

export default class Css extends Component{
    constructor(props){
        super(props);
        this.style = document.createElement('style');
    }
    componentDidMount(){
        parent.appendChild(this.style);
    }
    componentWillUnmount(){
        parent.removeChild(this.style);
    }
    render(){
        let { source } = this.props;
        this.style.innerHTML= source;
        return ReactDOM.createPortal(this.props.children,this.style)
        return null;
    }
}