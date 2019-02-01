import React from 'react';
import Aux from '../../hoc/Auxiliary';
import css from './Layout.module.css';

const layout = props => (
	<Aux>
		<div>Toolbase, SideDrawer, Backdrop</div>
		<main className={css.Content}>{props.children}</main>
	</Aux>
);

export default layout;
