import React, { Component } from 'react';

import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../atoms/Backdrop';

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.modalOpened !== this.props.modalOpened || nextProps.children !== this.props.children;
    }
    
    render () {
        return (
            <Aux>
                <Backdrop modalOpened={this.props.modalOpened} modalClosed={this.props.modalClosed} />
                <div
                    style={{
                        transform: this.props.modalOpened ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.modalOpened ? '1' : '0',
                        position: 'fixed'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;