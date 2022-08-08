import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ConnectedApp from './components/App';
import reducers from './reducers';
import middlewares from './middlewares';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducers, middlewares);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<ConnectedApp />
	</Provider>
);
