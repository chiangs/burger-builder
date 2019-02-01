import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
		return (
			<li key={igKey}>
				<span style={{ textTransform: 'capitalize' }}>{igKey}:</span>
				{props.ingredients[igKey]}
			</li>
		);
	});
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicious burger built with:</p>
			<ul>{ingredientSummary}</ul>
			<p>Continue to checkout?</p>
			<Button clicked={props.purchaseCanceled} btnType="Danger">
				CANCEL
			</Button>
			<Button clicked={props.purchaseContinue} btnType="Success">
				CONTINUE
			</Button>
		</Aux>
	);
};

OderSummary.propTypes = {};

export default OderSummary;
