import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import Target from './target';
import { DragDropContext } from 'react-dnd';
import DragComponent from './source';
import Attr from './attr';
import {EventEmitter} from 'events';
import tools from './tools';
import Tabs from 'x-fold';
import {getObj,updateId} from '../utils/common';
const publisher = new EventEmitter();
window.json = [];

class Index extends Component {
    constructor(props) {
        super(props);
        const { components ,json,id} = props;
        // console.log(components)
        // let list = [];
        // for (let key in components) {
        //     list.push(key);
        // }
        this.Did = id;
        this.updateId(json)
        // console.log(json,10000)
        this.state = { showAttr:false, list: tools,current:null ,id:null,type:'',json}
    }
    updateId(json){
        updateId(json,0);
        // this.props.update && this.props.update(json);
    }
    // checkId(json,level){
    //     if(json){
    //         for(let i = 0 ,l =json.length;i<l;i++){
    //             if(typeof json[i].id=='undefined'){
    //                 if(level ==0){
    //                     json[i].id=0;
    //                 }else{
    //                     json[i].id=Date.now()+Math.random()*100000;
    //                 }
    //                 if(json[i].children && json[i].children.length){
    //                     json[i].isContainer= true;
    //                 }
    //                 this.checkId(json[i].children,level+1)
    //             }
    //         }
    //     }
    // }
    componentWillReceiveProps(newProps){
        if(newProps.json !=this.state.json){
            this.updateId(newProps.json)
            this.setState({json:newProps.json});
        }
    }
    // getObj(id,data){
    //     let returnValue = null;
    //     for(let i = 0 ,l = data.length ; i <l; i++){
    //         let item= data[i];
    //         if(item.id == id){
    //             return item;
    //         }
    //         if(item.children &&item.children){
    //             returnValue = getObj(id,item.children);
    //             if(returnValue)return returnValue;
    //         }
    //     } 
    //     return returnValue;
    // }
   
    componentDidMount(){
        publisher.on('add',(arg)=>{
            // console.log(111111111111,arg)
            let json = this.state.json; 
            if(arg.pid ==0){
                json.push(arg);
            }else{
                let item = getObj(arg.pid,json);
                if(item.children){
                    item.children.push(arg);
                }else{
                    item.children=[arg]
                }
            }
            // console.log(JSON.stringify(json))
            this.setState({json,id:arg.id,type:arg.type,item:arg})
            this.props.update && this.props.update(json);
        });
        publisher.on('select',({id,type})=>{
            // console.log(id,this.state.json,9999)
            // console.log(getObj(id,this.state.json),888888)
            // this.setState({showAttr:true,id,type})
            this.setState({showAttr:true,id,type,item: getObj(id,this.state.json)},function(){
                // alert(JSON.stringify(this.state.json))
            })
        });
        publisher.on('update',(id,data)=>{
            let json = this.state.json; 
            let item = getObj(id,json);
            item = Object.assign(item,data);
            // alert('update')
            this.setState({json,showAttr:false},()=>{
                this.target.forceUpdate();
            });
            this.props.update && this.props.update(json);
        });
        publisher.on('delete',({id,pid})=>{
            let json = this.state.json;
            let parent = getObj(pid,json).children;
            if(pid==0){
                parent = json;
            }
            let index =0;
            parent.forEach((item,i)=>{
                if(item.id ==id){
                    index =i;
                }
            });
            parent.splice(index,1);
            this.setState({json},()=>{
                this.target.forceUpdate();
            })
            this.props.update && this.props.update(json);
        })
    }
    hideAttr=()=>{
        this.setState({showAttr:false})
    }
    renderToolsChild(list){
        let arr = [];
        for(let key in list){
            arr.push(<DragComponent key={key} type={key} item={list[key]} />)
        }
        return arr;
    }
    renderTools(){
        let arr = [];
        for(let k in this.state.list){
           arr.push(<Tabs.Panel tab={k} key={k}>{this.renderToolsChild(this.state.list[k])}</Tabs.Panel>)
        }
        // <DragComponent key={k} type={item} />
        return arr; 
    }
    render() {
        console.log(JSON.stringify(this.state.json))
        return (
            <div className="dnd-container">
                <div className="dnd-tools">
                    <Tabs defaultActive={["ui组件"]}>
                        {this.renderTools()}
                    </Tabs>
                </div>
                <Target ref={ref=>{this.target=ref}} publisher={publisher} json={this.state.json}></Target>
                {this.state.showAttr?<Attr Did={this.Did} hideAttr={this.hideAttr} item={this.state.item} publisher={publisher} id={this.state.id} type={this.state.type}></Attr>:null}
            </div>
        )
    }
}
// export default Index;
export default DragDropContext(HTML5Backend)(Index)