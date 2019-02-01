import React from 'react';
import css from './Toolbar.module.css';

const toolbar = props => (
	<header className={css.Toolbar}>
		<section>
			<button>SideDrawerToggle</button>
		</section>
		<section>LOGO</section>
		<nav>...</nav>
	</header>
);

export default toolbar;
