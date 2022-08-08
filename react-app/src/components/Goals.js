import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import { handleAddGoal, handleRemoveGoal } from '../actions/goals';

const Goals = (props) => {
	const goalRef = React.createRef();

	const addGoal = () =>
		props.dispatch(
			handleAddGoal(goalRef.current.value, () => (goalRef.current.value = ''))
		);

	const removeItem = (goal) => props.dispatch(handleRemoveGoal(goal));

	return (
		<div id="goal">
			<h1>Goals</h1>
			<input
				type="text"
				ref={goalRef}
				placeholder="Add Goal"
				className="margin-right-10"
			/>
			<button onClick={addGoal}>Add Goal</button>
			<List remove={removeItem} items={props.goals} />
		</div>
	);
};

export default connect((state) => ({
	goals: state.goals,
}))(Goals);
