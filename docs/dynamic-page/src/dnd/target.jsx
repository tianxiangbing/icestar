import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from "prop-types";
const dropSpec = {
    canDrop(props) {
        return true;
    },
    drop(props, monitor, component) {
        const { id, type } = monitor.getItem();
        if (!component) return;
        const hasDroppedOnChild = monitor.didDrop();
        if (hasDroppedOnChild) {
            // console.log('hasChild........')
            return
        }
        // console.log(id,type)
        // console.warn(component.props.parent)
        component.onDrop(hasDroppedOnChild, monitor.getItem(), component.props.parent);
        // props.addJson && props.addJson(monitor.getItem());
    }
};
const eventCallback = {
    init(instance) {
        this.instance = this.instance || instance;
    },
    callback(index, type) {
        this.callback = (index, type) => {
            // console.log(index,type,999999)
            this.instance(index, type);
        }
        this.callback(index, type)
    }
}
function collect(connector, monitor) {
    return {
        connectDropTarget: connector.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
    };
}
class BoardSquare extends Component {
    static propTypes = {
        onSelect: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.id = 0;
        this.type = '';
        // console.warn(this.props.id)
        this.json = { children: [] }
        this.state = { showlist: [], retract: {} }
        // this.update = this.update.bind(this);
    }
    onDrop(hasChild, { type, id, item }, parent) {
        // console.log(item)
        // debuggerx
        // this.id = id;
        // console.log(id)
        // alert('onDrop')
        this.id = id;
        this.type = type;
        let showlist = this.state.showlist;
        let obj = { type, id, isContainer: item.isContainer, children: [], pid: parent && parent.id || 0 };
        // showlist.push(obj);
        // this.setState({ showlist});
        // this.json = obj;
        // this.props.data.push(obj)
        // console.log(JSON.stringify(this.props.data))
        // eventCallback.init(this.props.onSelect);
        // this.props.update && this.props.update(obj);
        this.props.publisher.emit('add', obj)
        // this.onSelect(id,type)
    }
    // componentWillReceiveProps(){
    //     console.log('recive')
    // }
    // shouldComponentUpdate(){
    //     console.log('should')
    //     return true;
    // }
    // update({id,type,pid}){
    //     this.props.publisher.emit('add',{id,type,pid})
    //     // console.log(JSON.stringify(data),this.props.data)
    //     // this.props.data=data
    //     // console.log(this.json)
    //     // this.json.children.push(data);
    //     // this.props.update && this.props.update(JSON.parse(JSON.stringify(this.json)));
    // }
    delete(id, parent = {}, event) {
        let pid = parent.id || 0;
        // console.log(id,pid)
        event && event.stopPropagation();
        this.props.publisher.emit('delete', { id, pid })
    }
    onSelect(id, type, event) {
        event && event.stopPropagation();
        event && event.nativeEvent.stopPropagation();
        this.props.publisher.emit('select', { id, type })
        // if(event!=0){
        //     console.log(event,index,type);
        //     event && event.stopPropagation();
        //     event && event.nativeEvent.stopPropagation();
        //     this.props.onSelect && this.props.onSelect(index,type,event);
        // }
    }
    retract(id, event) {
        this.state.retract[id] = !this.state.retract[id];
        this.setState({ retract: this.state.retract });
        event.stopPropagation();
    }
    renderBox() {
        const { connectDropTarget, isOver, canDrop, showlist, isOverCurrent, children, publisher, parent, json } = this.props;
        console.log(json)
        return (json || []).map(({ type, isContainer, children, id }, indx) => {
            console.log(isContainer, type,children)
            return (
                <div className="dragSource" key={indx}>
                    <div className="dragHandle">{type}
                        <i className="delete" onClick={this.onSelect.bind(this, id, type)}>S</i>
                        <i className="delete" onClick={this.delete.bind(this, id, parent)}>X</i>
                        {isContainer && <i className="retract" onClick={this.retract.bind(this, id)}>{!this.state.retract[id] ? "-" : "+"}</i>}
                    </div>
                    {!this.state.retract[id] && isContainer ? <DragComponent json={children} parent={{ id, type }} publisher={publisher} data={children} onSelect={this.onSelect.bind(this, id, type)} /> : null}
                </div>
            )
        });
    }
    render() {
        const { connectDropTarget, isOver, canDrop, showlist, isOverCurrent, children, publisher, parent, json } = this.props;
        // console.log(json)
        return connectDropTarget(
            <div className="targetBox" style={{ backgroundColor: isOverCurrent && 'red' }}>
                {this.renderBox()}
            </div>
        );
    }
}
const DragComponent = DropTarget('abc', dropSpec, collect)(BoardSquare);
export default DragComponent;