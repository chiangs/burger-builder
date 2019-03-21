import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { auth } from '../../store/actions/auth.action';
import css from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ROUTES } from '../../Constants';
import { Redirect } from 'react-router-dom';

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
		},
		isSignup: true
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
			this.state.form.password.value,
			this.state.isSignup
		);
	};

	switchAuthModeHandler = () => {
		this.setState(prevState => ({
			isSignup: !prevState.isSignup
		}));
	};

	render() {
		const inputs = [];
		for (let key in this.state.form) {
			inputs.push({
				id: key,
				config: this.state.form[key]
			});
		}
		let form = inputs.map(input => (
			<Input
				key={input.id}
				elementType={input.config.elementType}
				elementConfig={input.config.elementConfig}
				value={input.config.value}
				changed={e => this.inputChangeHandler(e, input.id)}
			/>
		));
		if (this.props.loading) form = <Spinner />;
		const errorMsg = this.props.error ? (
			<p>{this.props.error.message}</p>
		) : null;

		const authRedirect = this.props.isAuthenticated ? (
			<Redirect to={ROUTES.INDEX} />
		) : null;

		return (
			<article className={css.Auth}>
				{authRedirect}
				<h4>Sign up / Sign in</h4>
				{errorMsg}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">Submit</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					Switch to {this.state.isSignup ? 'Sign in' : 'Sign up'}
				</Button>
			</article>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.auth.loading,
	error: state.auth.error,
	isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
	onAuth: (email, password, isSignup) =>
		dispatch(auth(email, password, isSignup))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
