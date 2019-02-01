import React from 'react';
import css from './Backdrop.module.css';

const backdrop = props =>
	props.show ? (
		<div className={css.Backdrop} onClick={props.backdropClicked} />
	) : null;

backdrop.propTypes = {};

export default backdrop;
