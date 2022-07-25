// Generate ID
const generateId = () => {
	return (
		Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
	);
};

// Action Type variables
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Action Creators
const addTodoCreator = (todo) => {
	return {
		type: ADD_TODO,
		todo: {
			id: generateId(),
			name: todo,
			completed: false,
		},
	};
};

const removeTodoCreator = (id) => {
	return {
		type: REMOVE_TODO,
		id: id,
	};
};

const toggleTodoCreator = (id) => {
	return {
		type: TOGGLE_TODO,
		id: id,
	};
};

const addGoalCreator = (goal) => {
	return {
		type: ADD_GOAL,
		goal: {
			id: generateId(),
			name: goal,
		},
	};
};

const removeGoalCreator = (id) => {
	return {
		type: REMOVE_GOAL,
		id: id,
	};
};

// Reducer functions
const todos = (state = [], action) => {
	switch (action.type) {
		case ADD_TODO:
			return state.concat(action.todo);
		case REMOVE_TODO:
			return state.filter((t) => t.id !== action.id);
		case TOGGLE_TODO:
			const toggled = state.filter((t) => t.id === action.id);
			return state.map((t) =>
				t.id !== action.id ? t : Object.assign(t, { completed: !t.completed })
			);
		default:
			return state;
	}
};

const goals = (state = [], action) => {
	switch (action.type) {
		case ADD_GOAL:
			return state.concat(action.goal);
		case REMOVE_GOAL:
			return state.filter((g) => g.id !== action.id);
		default:
			return state;
	}
};

// Checker Middleware
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

// Create the store
const store = Redux.createStore(
	Redux.combineReducers({
		todos,
		goals,
	}),
	Redux.applyMiddleware(checker)
);

// Subscribe to changes
store.subscribe(() => {
	//
	const todoList = document.getElementById('todos');
	const goalList = document.getElementById('goals');

	// Reset the UI
	todoList.innerHTML = '';
	goalList.innerHTML = '';

	// get the current state
	const { todos, goals } = store.getState();

	// Adds the todo(s) to the UI
	todos.forEach((item) => {
		const node = addTodoToDom(item);
		todoList.appendChild(node);
	});

	// Adds the goal(s) to the UI
	goals.forEach((item) => {
		const node = AddGoalToDom(item);
		goalList.appendChild(node);
	});
});

const removeButton = (onClick) => {
	// Remove Button
	const remove = document.createElement('button');
	remove.innerText = 'X';
	remove.classList.add('margin-right-10');

	//Add Event Listener for Removing todo
	remove.addEventListener('click', onClick);

	// Return the remove button
	return remove;
};

const addTodoToDom = (item) => {
	// Li node
	const node = document.createElement('li');
	node.classList.add('todo');

	// Text node
	const text = document.createTextNode(item.name);

	// Add Line-Through if completed
	if (item.completed) {
		node.classList.add('completed');
	}

	// Add Event Listener for Toggling complete
	node.addEventListener('click', () =>
		store.dispatch(toggleTodoCreator(item.id))
	);

	// Get Remove button
	const remove = removeButton(() => store.dispatch(removeTodoCreator(item.id)));

	// Addd the child nodes to the parent
	node.appendChild(remove);
	node.appendChild(text);

	// Return the node
	return node;
};

const AddGoalToDom = (item) => {
	// Li Node and Text Node
	const node = document.createElement('li');
	const text = document.createTextNode(item.name);

	// Set attributes for li node
	node.setAttribute('id', item.id);
	node.classList.add('goal');

	// Get Remove button
	const remove = removeButton(() => store.dispatch(removeGoalCreator(item.id)));

	/// Addd the child nodes to the parent
	node.appendChild(remove);
	node.appendChild(text);

	// Return the node
	return node;
};
