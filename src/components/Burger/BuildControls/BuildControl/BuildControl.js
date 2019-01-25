import React from 'react';
import css from './BuildControl.module.css';

const BuildControl = props => (
	<div className={css.BuildControl}>
		<div className={css.Label}>{props.label}</div>
		<button className={css.Less} onClick={props.removed}>Less</button>
		<button className={css.More} onClick={props.added}>
			More
		</button>
	</div>
);

export default BuildControl;
