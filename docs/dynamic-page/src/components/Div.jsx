import React from 'react';
import Formatter from '../utils/formatter';

import PropTypes from "prop-types";
import {getI18n} from '../utils/utils';

const Div = (props) => {
    let {value,className,formatter,id,locale} = props;
    if(formatter ){
        // value = Formatter[formatter](value)
        let args = props.formatterArgs||[];
        let mn = props.formatter;
        value = Formatter.getValue(mn,value,args,id);
    }
    if(props.readOnly){
        className +=' readOnly'
    }
    if(locale && className.indexOf('labelValue')==-1){
        value =getI18n (value,locale);
    }
    if(React.Children.count(props.children)){
        value= props.children;
    }
    return <div className={className} onMouseEnter={props.onMouseEnter} onFocus={props.onFocus} onClick={props.onClick} onMouseLeave={props.onMouseLeave}>{value}</div>
}
Div.propTypes={
    value:PropTypes.any,
    className:PropTypes.string
}
Div.defaultProps={
    className:''
}
module.exports= Div;