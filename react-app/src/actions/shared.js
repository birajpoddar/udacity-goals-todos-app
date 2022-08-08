import API from 'goals-todos-api';

export const RECEIVE_DATA = 'RECEIVE_DATA';

const receiveData = (todos, goals) => {
	return {
		type: RECEIVE_DATA,
		todos,
		goals,
	};
};

// Initial Data Load
export const handeInitialData = () => {
	return (dispatch) => {
		Promise.all([API.fetchTodos(), API.fetchGoals()]).then(
			([todoList, goalList]) => {
				dispatch(receiveData(todoList, goalList));
			}
		);
	};
};
