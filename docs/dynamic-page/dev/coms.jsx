import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Coms extends Component {
    value = ''
    state = {
        js: `
        var TestArr = {}
        function Test1(){
          return React.createElement("div", null,"123456111")
        }
        TestArr.Test1=Test1;
        function Test2(){
          return React.createElement("div", null,"aaaaaaa")
        }
        TestArr.Test2=Test2;
        TestArr.name="TestArr"
        return TestArr`,
        format: `
        function format(data){
          data.name="杭州银行"
          return  data;
        }
        return format;`
    }
    constructor(props) {
        super(props);
        this.componetUrl = React.createRef();
    }
    componentDidMount() {
        this.value = this.state.js;
    }
    componentWillUnmount() {
    }
    //添加组件引用的Js路径
    addUrlHandle = () => {
        console.log(this.componetUrl)
        fetch(this.componetUrl.value)
        .then((response) =>{
            return response.text().then((text)=> {
            //   console.log(text) ;
            this.value +=text;
            });
          })
            .catch(error => console.error(error))
    }
    onChange(e) {
        this.setState({ js: e.target.value });
    }
    render() {
        return (
            <div>
                <input className="input_componentUrl" type="text" defaultValue="http://192.168.1.8:8080/demo/getjs" ref={ref => this.componetUrl = ref} /><button onClick={this.addUrlHandle}>添加</button>
                <textarea onChange={this.onChange.bind(this)} defaultValue={this.state.js}></textarea>
            </div>
        )
    }
}