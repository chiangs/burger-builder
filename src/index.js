import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder.reducer';
import orderReducer from './store/reducers/order.reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	burger: burgerBuilderReducer,
	order: orderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const reduxDevToolExt =
// 	window.__REDUX_DEVTOOLS_EXTENSION__ &&
// 	window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
// or for simple stores
// const store = createStore(reducer, reduxDevToolExt);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
