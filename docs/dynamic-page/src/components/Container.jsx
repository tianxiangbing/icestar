import React from 'react';
import {renderBox} from '../utils/utils';

const Container = (props)=>{
    return <div className={props.className}>{renderBox(props.children,props)}</div>
}
module.exports = Container;