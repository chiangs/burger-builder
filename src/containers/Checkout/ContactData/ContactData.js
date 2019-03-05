import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import css from './ContactData.module.css';
import Axios from '../../../axios-orders';
import { DB, ROUTES } from '../../../Constants';
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class ContactData extends Component {
	state = {
		loading: false,
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		}
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			deliveryMethod: 'fastest',
			customer: {
				name: 'Navn Navnesen',
				email: 'email@email.email',
				address: {
					street: 'Gate',
					city: 'By',
					postal: '4025',
					country: 'Norge'
				}
			}
		};
		Axios.post(DB.ORDERS, order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push(ROUTES.INDEX);
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	};

	render() {
		let form = this.state.loading ? (
			<Spinner />
		) : (
			<section className={css.ContactData}>
				<h4>Enter your contact data</h4>
				<form>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Your name"
						className={css.Input}
					/>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="Your Email"
						className={css.Input}
					/>
					<input
						type="text"
						name="street"
						id="street"
						placeholder="Street"
						className={css.Input}
					/>
					<input
						type="text"
						name="postal"
						id="postal"
						placeholder="Postal code"
						className={css.Input}
					/>
				</form>
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</section>
		);
		return form;
	}
}
