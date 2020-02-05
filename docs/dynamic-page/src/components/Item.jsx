import React,{Component} from 'react';

const HigherComponent = (ContainerComponent, WrappedComponnet)=> class extends Component {
    render(){
        let {label,textcls,readOnly,className,locale} = this.props;
        if(readOnly){
            className +=' readOnly'
        }
        return (
            <div className={className} onMouseEnter={this.props.onMouseEnter} onFocus={this.props.onFocus} onClick={this.props.onClick} onMouseLeave={this.props.onMouseLeave}>
                <ContainerComponent value={label} locale={locale} className="x-label">
                </ContainerComponent>
                <WrappedComponnet {...this.props} className={textcls}></WrappedComponnet>
            </div>
        )
    }
}

export default HigherComponent;