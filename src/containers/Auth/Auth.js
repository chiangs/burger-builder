import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { auth } from '../../store/actions/auth.action';
import css from './Auth.module.css';

class Auth extends Component {
	state = {
		form: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					label: 'What email would you like to receive your receipts?'
				},
				value: ''
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					label: 'Please set a password to login with'
				},
				value: ''
			}
		}
	};

	inputChangeHandler = (event, inputIdentifier) => {
		const formDataToUpdate = { ...this.state.form };
		const formElementToUpdate = { ...formDataToUpdate[inputIdentifier] };
		formElementToUpdate.value = event.target.value;
		formDataToUpdate[inputIdentifier] = formElementToUpdate;
		this.setState({ form: formDataToUpdate });
	};

	submitHandler = event => {
		event.preventDefault();
		this.props.onAuth(
			this.state.form.email.value,
			this.state.form.password.value
		);
	};

	render() {
		const inputs = [];
		for (let key in this.state.form) {
			inputs.push({
				id: key,
				config: this.state.form[key]
			});
		}
		const form = inputs.map(input => (
			<Input
				key={input.id}
				elementType={input.config.elementType}
				elementConfig={input.config.elementConfig}
				value={input.config.value}
				changed={e => this.inputChangeHandler(e, input.id)}
			/>
		));
		return (
			<article className={css.Auth}>
				<h4>Sign up / Sign in</h4>
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">Submit</Button>
				</form>
			</article>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onAuth: (email, password) => dispatch(auth(email, password))
});

export default connect(
	null,
	mapDispatchToProps
)(Auth);
