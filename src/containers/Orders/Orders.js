import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import { loadOrders } from '../../store/actions/order.action';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	componentDidMount() {
		this.props.onGetOrders(this.props.token, this.props.userId);
	}

	render() {
		const orders =
			this.props && this.props.loading ? (
				<Spinner />
			) : (
				this.props.orders.map(order => (
					<Order key={order.id} order={order} />
				))
			);
		return <div>{orders}</div>;
	}
}

const mapStateToProps = state => ({
	orders: state.order.orders,
	loading: state.order.loading,
	token: state.auth.token,
	userId: state.auth.userId
});

const mapDispatchToState = dispatch => ({
	onGetOrders: (token, userId) => dispatch(loadOrders(token, userId))
});

export default connect(
	mapStateToProps,
	mapDispatchToState
)(withErrorHandler(Orders, Axios));
