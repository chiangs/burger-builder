import React, { Component } from 'react';
import css from './Layout.module.css';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

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
				<Toolbar toggleClick={this.toggleSidedrawererHandler} />
				<Sidedrawer
					open={this.state.showSidedrawer}
					closed={this.toggleSidedrawererHandler}
				/>
				<main className={css.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default Layout;
