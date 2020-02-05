import React,{Component} from 'react';
import ReactDOM from 'react-dom';
let parent = document.getElementsByTagName('body')[0];

export default class Js extends Component{
    constructor(props){
        super(props);
        this.script = document.createElement('script');
        this.state = {jsTpl:''}
    }
    formatJs (){
        let { source } = this.props;
        let jsTpl =`
        initComponent(
            (function(){
                ${source}
            }
            )()
            )
        `;
        return jsTpl;
    }
    componentWillReceiveProps(newProps){
        if(newProps.source != this.props.source){
            parent.removeChild(this.script);
            this.script = document.createElement('script');
            // this.script.innerHTML = this.formatJs ();
            parent.appendChild(this.script);
            // this.script.innerHTML= newProps.source;
            // ReactDOM.createPortal(this.props.children,this.script)
        }
    }
    componentWillMount(){
        parent.appendChild(this.script);
    }
    componentWillUnmount(){
        parent.removeChild(this.script);
    }
    render(){
        // console.log(jsTpl)
        // if(source){
        //     eval(jsTpl)
        // }
        // this.script.innerHTML= source;
        let { source,method,id} = this.props;
        let jsTpl =`
        ${method}(
            (function(){
                ${source}
            }
            )(),'${id}'
            )
        `;
        // console.log('jsrender',source)
        return ReactDOM.createPortal(jsTpl,this.script)
        // return null;
    }
}