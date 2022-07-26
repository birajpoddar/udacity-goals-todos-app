// Action Type variables
// Copied
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const RECEIVE_DATA = 'RECEIVE_DATA';

// Action Creators
// Copied
const addTodoCreator = (todo) => {
	return {
		type: ADD_TODO,
		todo,
	};
};

// Copied
const removeTodoCreator = (id) => {
	return {
		type: REMOVE_TODO,
		id,
	};
};

// Copied
const toggleTodoCreator = (id) => {
	return {
		type: TOGGLE_TODO,
		id,
	};
};

// Copied
const addGoalCreator = (goal) => {
	return {
		type: ADD_GOAL,
		goal,
	};
};

// Copied
const removeGoalCreator = (id) => {
	return {
		type: REMOVE_GOAL,
		id,
	};
};

// Copied
const receiveDataAction = (todos, goals) => {
	return {
		type: RECEIVE_DATA,
		todos,
		goals,
	};
};

// Reducer functions
// Copied
const todos = (state = [], action) => {
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

// Copied
const goals = (state = [], action) => {
	switch (action.type) {
		case ADD_GOAL:
			return state.concat(action.goal);
		case REMOVE_GOAL:
			return state.filter((g) => g.id !== action.id);
		case RECEIVE_DATA:
			return action.goals;
		default:
			return state;
	}
};

// Copied
const loading = (state = true, action) => {
	switch (action.type) {
		case RECEIVE_DATA:
			return false;
		default:
			return state;
	}
};

// Checker Middleware
// Copied
const checker = (store) => (next) => (action) => {
	if (
		action.type === ADD_TODO &&
		action.todo.name.toLowerCase().includes('bitcoin')
	) {
		return alert("Nope, that's a bad idea");
	}

	if (
		action.type === ADD_GOAL &&
		action.goal.name.toLowerCase().includes('bitcoin')
	) {
		return alert("Nope, that's a bad idea");
	}

	return next(action);
};

// Logger Middleware
// Copied
const loggger = (store) => (next) => (action) => {
	console.group(action.type);

	console.log('State before Dispatch is', store.getState());
	console.log('Current Action is', action);
	const result = next(action);
	console.log('State after Dispatch is', store.getState());

	console.groupEnd();

	return result;
};

// Create the store
// Copied
const store = Redux.createStore(
	// Copied
	Redux.combineReducers({
		todos,
		goals,
		loading,
	}),
	// Copied
	Redux.applyMiddleware(ReduxThunk, checker, loggger)
);
