import React from 'react';
import { connect } from 'react-redux';
import { handeInitialData } from '../actions/shared';
import ConnectedTodos from './Todos';
import ConnectedGoals from './Goals';

const App = (props) => {
	React.useEffect(() => {
		props.dispatch(handeInitialData());
	}, [props]);

	if (props.loading) {
		return <h3>Loading...</h3>;
	}

	return (
		<div>
			<h2>React Todo/Goal Manager</h2>
			<hr />
			<ConnectedTodos />
			<ConnectedGoals />
		</div>
	);
};

export default connect((state) => ({
	loading: state.loading,
}))(App);
