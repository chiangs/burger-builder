import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import css from './CheckoutSummary.module.css';

const checkoutSummary = props => {
	return (
		<div className={css.CheckoutSummary}>
			<h1>Vi håper det smaker!</h1>
			<div>
				<Burger ingredients={props.ingredients} />
				<Button btnType="Danger" clicked={props.onCheckoutCancel}>
					Cancel
				</Button>
				<Button btnType="Success" clicked={props.onCheckoutContinue}>
					Continue
				</Button>
			</div>
		</div>
	);
};

export default checkoutSummary;
