import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

//  Action Creators
const addTodo = (todo) => {
	return {
		type: ADD_TODO,
		todo,
	};
};

const removeTodo = (id) => {
	return {
		type: REMOVE_TODO,
		id,
	};
};

const toggleTodo = (id) => {
	return {
		type: TOGGLE_TODO,
		id,
	};
};

// Todo Thunks
export const handleAddTodo = (name, callback) => {
	return (dispatch) => {
		API.saveTodo(name)
			.then((todo) => {
				dispatch(addTodo(todo));
				callback();
			})
			.catch(() => {
				alert('Something went wrong, please try again');
			});
	};
};

export const handleRemoveTodo = (todo) => {
	return (dispatch) => {
		dispatch(removeTodo(todo.id));

		API.deleteTodo(todo.id).catch(() => {
			alert('Something went wrong, please try again');
			dispatch(addTodo(todo));
		});
	};
};

export const handleToggleTodo = (todo) => {
	return (dispatch) => {
		dispatch(toggleTodo(todo.id));

		API.saveTodoToggle(todo.id).catch(() => {
			alert('Something went wrong, please try again');
			dispatch(toggleTodo(todo.id));
		});
	};
};
