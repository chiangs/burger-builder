import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

export default class BurgerBuilder extends Component {
	render() {
		return (
			<Aux>
				<div>
					<Burger />
				</div>
				<div>Build Controls</div>
			</Aux>
		);
	}
}
