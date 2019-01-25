import React from 'react';
import css from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
	return (
		<div className={css.Burger}>
			<BurgerIngredient type="breadTop" />
			<BurgerIngredient type="cheese" />
			<BurgerIngredient type="meat" />
			<BurgerIngredient type="breadBottom" />
		</div>
	);
};

burger.propTypes = {};

export default burger;
