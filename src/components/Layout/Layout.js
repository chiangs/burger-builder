import React from 'react';
import Aux from '../../hoc/Auxiliary';
import css from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = props => (
	<Aux>
		<Toolbar />
		<main className={css.Content}>{props.children}</main>
	</Aux>
);

export default layout;
