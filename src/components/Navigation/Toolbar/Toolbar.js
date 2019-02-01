import React from 'react';
import css from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => (
	<header className={css.Toolbar}>
		<section>
			<button>SideDrawerToggle</button>
		</section>
		<section className={css.Logo}>
			<Logo />
		</section>
		<section className={css.DesktopOnly}>
			<NavigationItems />
		</section>
	</header>
);

export default toolbar;
