import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './BurgerIngredient.module.css';

class BurgerIngredient extends Component {
	render() {
		const burgerIngredients = {
			breadBottom: <div className={css.BreadBottom} />,
			breadTop: (
				<div className={css.BreadTop}>
					<div className={css.Seeds1} />
					<div className={css.Seeds2} />
				</div>
			),
			meat: <div className={css.Meat} />,
			cheese: <div className={css.Cheese} />,
			salad: <div className={css.Salad} />,
			bacon: <div className={css.Bacon} />,
			null: <div />
		};
		return burgerIngredients[this.props.type];
	}
}

BurgerIngredient.propTypes = {
	type: PropTypes.string.isRequired
};

export default BurgerIngredient;
