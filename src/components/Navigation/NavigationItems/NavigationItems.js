import React from 'react';
import css from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
	<nav>
		<ul className={css.NavigationItems}>
			<NavigationItem link="/">Burger Builder</NavigationItem>
			<NavigationItem link="/Orders">Orders</NavigationItem>
			<NavigationItem link="/Auth">Authenticate</NavigationItem>
		</ul>
	</nav>
);

export default navigationItems;
