import React from 'react';
import css from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
	<nav>
		<ul className={css.NavigationItems}>
			<NavigationItem link="/" active>
				Burger Builder
			</NavigationItem>
			<NavigationItem link="/">Checkout</NavigationItem>
		</ul>
	</nav>
);

export default navigationItems;
