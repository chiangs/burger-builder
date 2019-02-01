import React from 'react';
import css from './Sidedrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sidedrawer = props => {
	return (
		<section className={css.Sidedrawer}>
			<section className={css.Logo}>
				<Logo />
			</section>
			<NavigationItems />
		</section>
	);
};

export default sidedrawer;
