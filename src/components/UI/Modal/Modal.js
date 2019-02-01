import React, { Component } from 'react';
import css from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

// Converted to a class to access lifecycle hooks. This can be used to prevent the ordersummary from re-rendering when
// it's not shown because it is wrapped by the modal.

export default class Modal extends Component {
	shouldComponentUpdate(nextProps, prevState) {
		return nextProps.show !== this.props.show;
	}

	render() {
		return (
			<Aux>
				<Backdrop
					show={this.props.show}
					backdropClicked={this.props.modalClose}
				/>
				<div
					className={css.Modal}
					style={{
						transform: this.props.show
							? 'translateY(0)'
							: 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}
