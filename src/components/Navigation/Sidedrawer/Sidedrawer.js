import React from 'react';
import css from './Sidedrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidedrawer = props => {
	const attachClasses = props.open
		? [css.Sidedrawer, css.Open]
		: [css.Sidedrawer, css.Close];

	return (
		<Aux>
			<Backdrop show={props.open} backdropClicked={props.closed} />
			<section className={attachClasses.join(' ')}>
				<section className={css.Logo}>
					<Logo />
				</section>
				<NavigationItems />
			</section>
		</Aux>
	);
};

export default sidedrawer;
