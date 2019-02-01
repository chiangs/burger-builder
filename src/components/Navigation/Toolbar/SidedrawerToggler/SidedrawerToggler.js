import React from 'react';
import css from './SidedrawerToggler.module.css';

const sidedrawerToggler = props => (
	<div className={css.DrawerToggle} onClick={props.toggleHandler}>
		<div />
		<div />
		<div />
	</div>
);

export default sidedrawerToggler;
