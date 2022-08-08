import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/todos';
import { RECEIVE_DATA } from '../actions/shared';

export const todos = (state = [], action) => {
	switch (action.type) {
		case ADD_TODO:
			return state.concat(action.todo);
		case REMOVE_TODO:
			return state.filter((t) => t.id !== action.id);
		case TOGGLE_TODO:
			const toggled = state.filter((t) => t.id === action.id);
			return state.map((t) =>
				t.id !== action.id ? t : Object.assign(t, { complete: !t.complete })
			);
		case RECEIVE_DATA:
			return action.todos;
		default:
			return state;
	}
};
