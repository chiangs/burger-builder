import React from 'react';
import css from './Order.module.css';

const Order = props => {
	return (
		<div className={css.Order}>
			<p>Ingredients: (1)</p>
			<p>
				Price: <strong>USD 5.45</strong>
			</p>
		</div>
	);
};

export default Order;
