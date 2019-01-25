import React from 'react';
import css from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
	const mappedIngredients = Object.keys(props.ingredients)
		.map(ingredientKey => {
			return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
				return (
					<BurgerIngredient
						key={ingredientKey + i}
						type={ingredientKey}
					/>
				);
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);
	const ingredientsOutput =
		mappedIngredients.length === 0 ? (
			<p>Please start adding ingredients!</p>
		) : (
			mappedIngredients
		);
	return (
		<div className={css.Burger}>
			<BurgerIngredient type="breadTop" />
			{ingredientsOutput}
			<BurgerIngredient type="breadBottom" />
		</div>
	);
};

burger.propTypes = {};

export default burger;
