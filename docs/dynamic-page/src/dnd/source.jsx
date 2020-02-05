import React, { Component } from 'react';
import { DragSource, DragDropContext } from 'react-dnd';
function Card({ isDragging, dragSource, item,type }) {
    const opacity = isDragging ? 0.5 : 1;
    return dragSource(<div style={{ opacity }} className="dragSource">
    <div className="dragHandle">{item.title||type}</div>
    </div>);
}
const cardSource = {
    beginDrag: props => ({ type: props.type,id:Date.now(),item:props.item }),
    endDrag:props=>{
        // console.log(props)
    }
}
function collect(connect, monitor) {
    return {
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}
export default DragSource('abc', cardSource, collect)(Card);