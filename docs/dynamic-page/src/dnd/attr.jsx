/**
 * 属性配置面板
 */
import React, { Component } from 'react'
import InputItem from '../components/InputItem';
import TextItem from '../components/TextItem';
import Form from 'xui-form';
import {getType} from '../utils/utils';
 class Attr extends Component {
     json=[];
     constructor(props){
        super(props);
        let {Did,type} = props;
        this.component =getType(type,false,Did);
        console.log(this.component)
     }
    save=()=>{
        // console.log(this.props,1111);
        let {form,id,type,json} = this.props;
        let data = form.getFormData();
        if(data.mparam){
            typeof data.mparam !=='object' ?  data.mparam = JSON.parse(data.mparam):null;
        }
        if(data.props){
            typeof data.props !=='object' ?  data.props = JSON.parse(data.props):null;
        }
        let formdata =JSON.parse(JSON.stringify(data)) ;
        // let formdata={className:'abc'}
        // console.log('save',JSON.stringify(json))
        // let item = this.getObj(id,type,json);
        // Object.assign(item,formdata)
        // // console.log(item);
        // this.props.update(json);
        this.props.publisher.emit('update',id,formdata);
    }
    // getObj(id,type,data){
    //     for(let i = 0 ,l = data.length ; i <l; i++){
    //         let item= data[i];
    //         if(item.id == id){
    //             return item;
    //         }
    //         if(item.children &&item.children){
    //             this.getObj(id,type,item.children);
    //         }
    //     } 
    // }
    componentDidMount(){
        let {form,id,type,item} = this.props;
        let {setFieldsValue} = form;
        setFieldsValue(item);
    }
    // componentWillReceiveProps(newProps){
    //     console.log(JSON.stringify(newProps.json),6666)
    //     this.json = JSON.parse(JSON.stringify(newProps.json));
    //     debugger;
    // }
    componentDidUpdate(){
        // console.log(JSON.stringify(this.props.json),333);
        // console.log(JSON.stringify(this.json),333);
        let {form,id,type,item} = this.props;
        // let item = this.getObj(id,type,this.json);
        form.setFieldsValue(item);
        // let {form,id,type,data} = this.props;
        // let item = this.getObj(id,type,data);
        // form.setFieldsValue(item);
    }
    renderProps(){
        let propTypes = this.component.propsTypes;
        let arr = []
        for(let key in propTypes){
            arr.push(<Form.Item>
                {getFieldDecorator(`props.${key}`,{})(
                <InputItem className="attrItem" label={key}></InputItem>
                )}
                </Form.Item>)
        }
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        // console.log(JSON.stringify(this.props.json),2222);
        return (
            <div className="attr">
            <h1>{this.props.type} <b onClick={this.props.hideAttr}>></b></h1>
            <Form>
                { this.renderProps.bind(this)}
                <Form.Item>
                {getFieldDecorator('id',{})(
                <TextItem className="attrItem" name="id" label="ID"></TextItem>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('props.className',{})(
                <InputItem className="attrItem" label="样式class"></InputItem>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('props.label',{})(
                <InputItem className="attrItem" label="label"></InputItem>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('props.value',{})(
                <InputItem className="attrItem" label="value"></InputItem>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('readOnly',{})(
                <InputItem className="attrItem" label="只读属性"></InputItem>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('visible',{})(
                <InputItem className="attrItem" label="可见属性"></InputItem>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('method',{})(
                <InputItem className="attrItem" label="form验证"></InputItem>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('mparam',{})(
                <InputItem className="attrItem" multiple={true} label="mparam"></InputItem>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('props',{})(
                <InputItem className="attrItem" multiple={true} label="组件props"></InputItem>
                )}
                </Form.Item>
                <Form.Item>
                    <button className="btn-save" type="button" onClick={this.save}>保存</button>
                </Form.Item>
            </Form>
            </div>
        )
    }
}
export default Form.create({name:""})(Attr);