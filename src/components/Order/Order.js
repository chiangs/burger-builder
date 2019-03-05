import React from 'react';
import css from './Order.module.css';

const Order = props => {
	const ingredients = [];
	for (let ingredientName in props.order.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.order.ingredients[ingredientName]
		});
	}

	const ingredientOutput = ingredients.map(ig => {
		return (
			<span key={ig.name}>
				{ig.name} ({ig.amount})
			</span>
		);
	});
	return (
		<div className={css.Order}>
			<p>Ingredients.: {ingredientOutput}</p>
			<p>
				Price:{' '}
				<strong>
					USD {Number.parseFloat(props.order.price).toFixed(2)}
				</strong>
			</p>
		</div>
	);
};

export default Order;
