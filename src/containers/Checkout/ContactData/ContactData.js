import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import css from './ContactData.module.css';
import Axios from '../../../axios-orders';
import { DB, ROUTES } from '../../../Constants';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label:
						'Name of the lucky bastard this delicious burger is for?'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					label: 'What email should the order confirmation go to?'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label: 'What is the name of the street being delivered to?'
				},
				value: ''
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label: 'Only available in Stavanger',
					disabled: true
				},
				value: 'Stavanger'
			},
			postal: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label: 'Only available in 4025',
					disabled: true
				},
				value: '4025'
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					label: 'Only available in Norway',
					disabled: true
				},
				value: 'Norway'
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					type: '',
					label: 'How do you want it delivered?',
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: 'fastest'
			}
		},
		loading: false
	};

	orderHandler = event => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = this.transformFormData(this.state.orderForm);
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
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

	transformFormData = formDataObj => {
		const formData = {};
		for (let formElementIdentifier in formDataObj) {
			formData[formElementIdentifier] =
				formDataObj[formElementIdentifier].value;
		}
		return formData;
	};

	inputChangeHandler = (event, inputIdentifier) => {
		const formDataToUpdate = { ...this.state.orderForm };
		const formElementToUpdate = { ...formDataToUpdate[inputIdentifier] };
		formElementToUpdate.value = event.target.value;
		formDataToUpdate[inputIdentifier] = formElementToUpdate;
		this.setState({ orderForm: formDataToUpdate });
	};

	render() {
		const inputs = [];
		for (let key in this.state.orderForm) {
			inputs.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = this.state.loading ? (
			<Spinner />
		) : (
			<section className={css.ContactData}>
				<h4>Enter your contact data</h4>
				<form>
					{inputs.map(input => (
						<Input
							key={input.id}
							elementType={input.config.elementType}
							elementConfig={input.config.elementConfig}
							value={input.config.value}
							changed={e => this.inputChangeHandler(e, input.id)}
						/>
					))}
				</form>
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</section>
		);
		return form;
	}
}
