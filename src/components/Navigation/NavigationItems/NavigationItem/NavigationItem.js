import React from 'react';
import css from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => (
	<li className={css.NavigationItem}>
		<NavLink to={props.link} activeClassName={css.active} exact>
			{props.children}
		</NavLink>
	</li>
);

export default NavigationItem;
