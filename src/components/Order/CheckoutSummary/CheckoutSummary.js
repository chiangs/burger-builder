import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import css from './CheckoutSummary.module.css';

const checkoutSummary = props => {
	return (
		<div className={css.CheckoutSummary}>
			<h1>Vi håper det smaker!</h1>
			<div style={{ width: '100%', height: '300px', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
				<Button btnType="Danger" clicked>
					Cancel
				</Button>
				<Button btnType="Success" clicked>
					Continue
				</Button>
			</div>
		</div>
	);
};

export default checkoutSummary;
