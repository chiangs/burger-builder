import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import css from './Logo.module.css';

const logo = props => (
	<section className={css.Logo}>
		<img src={burgerLogo} alt="Burger Logo" />
	</section>
);

export default logo;
