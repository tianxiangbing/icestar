
import React, { Component } from 'react';
export default class FormItem extends Component {
    render () {
        // console.log(this.props.children)
        return (
            <React.Fragment>{this.props.children}</React.Fragment>
        );
    }
  }
  