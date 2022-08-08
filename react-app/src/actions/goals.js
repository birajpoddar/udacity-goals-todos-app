import API from 'goals-todos-api';

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

const addGoal = (goal) => {
	return {
		type: ADD_GOAL,
		goal,
	};
};

const removeGoal = (id) => {
	return {
		type: REMOVE_GOAL,
		id,
	};
};

// Goal Thunks
export const handleAddGoal = (name, callback) => {
	return (dispatch) => {
		API.saveGoal(name)
			.then((goal) => {
				dispatch(addGoal(goal));
				callback();
			})
			.catch(() => {
				alert('Something went wrong, please try again');
			});
	};
};

export const handleRemoveGoal = (goal) => {
	return (dispatch) => {
		dispatch(removeGoal(goal.id));

		API.deleteGoal(goal.id).catch(() => {
			alert('Something went wrong, please try again');
			dispatch(addGoal(goal));
		});
	};
};
