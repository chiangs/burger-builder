import React from 'react';
import css from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggler from '../Toolbar/SidedrawerToggler/SidedrawerToggler';

const toolbar = props => (
	<header className={css.Toolbar}>
		<SideDrawerToggler toggleHandler={props.toggleClick} />
		<section className={css.Logo}>
			<Logo />
		</section>
		<section className={css.DesktopOnly}>
			<NavigationItems />
		</section>
	</header>
);

export default toolbar;
