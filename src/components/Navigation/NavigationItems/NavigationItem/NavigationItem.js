import React from 'react';
import css from './NavigationItem.module.css';

const NavigationItem = props => (
	<li className={css.NavigationItem}>
		<a href={props.link} className={props.active ? css.active : null}>
			{props.children}
		</a>
	</li>
);

export default NavigationItem;
