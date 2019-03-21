import React, { Component } from 'react';
import css from './Layout.module.css';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';

export class Layout extends Component {
	state = {
		showSidedrawer: false
	};

	toggleSidedrawererHandler = () =>
		this.setState(prevState => {
			return { showSidedrawer: !prevState.showSidedrawer };
		});

	render() {
		return (
			<Aux>
				<Toolbar
					toggleClick={this.toggleSidedrawererHandler}
					auth={this.props.isAuthenticated}
				/>
				<Sidedrawer
					auth={this.props.isAuthenticated}
					open={this.state.showSidedrawer}
					closed={this.toggleSidedrawererHandler}
				/>
				<main className={css.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
