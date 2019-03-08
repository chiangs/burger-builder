import React from 'react';
import css from './Input.module.css';

const Input = props => {
	let inputElement = null;

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={css.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={css.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select
					className={css.InputElement}
					value={props.value}
					onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={css.InputElement}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
	}
	return (
		<div className={css.Input}>
			<label className={css.Label} htmlFor={props.id}>
				{props.elementConfig.label}
			</label>
			{inputElement}
		</div>
	);
};

export default Input;
