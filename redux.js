// Store to save the state and its functions
const createStore = (reducer) => {
	let state;
	let listeners = [];

	const getState = () => state;

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => (listeners = listeners.filter((l) => l !== listener));
	};

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener());
	};

	return {
		getState,
		subscribe,
		dispatch,
	};
};

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
			todo: todo,
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
			goal: goal,
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
	console.log(action);
	switch (action.type) {
		case ADD_GOAL:
			return state.concat(action.goal);
		case REMOVE_GOAL:
			return state.filter((g) => g.id !== action.id);
		default:
			return state;
	}
};

const app = (state = {}, action) => {
	return {
		todos: todos(state.todos, action),
		goals: goals(state.goals, action),
	};
};

const store = createStore(app);
console.log('State after store creation', store.getState());

const unsub = store.subscribe(() =>
	console.log('Current store Item(s)', store.getState())
);

store.subscribe(() => {
	const todoList = document.getElementById('todos');
	const goalList = document.getElementById('goals');

	const { todos, goals } = store.getState();

	todoList.innerHTML = '';
	goalList.innerHTML = '';

	todos.forEach((item) => {
		const node = addTodoToDom(item);
		todoList.appendChild(node);
	});

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

	return remove;
};

const addTodoToDom = (item) => {
	// Li node
	const node = document.createElement('li');
	node.classList.add('todo');

	// Text node
	const text = document.createTextNode(item.todo);

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

	return node;
};

const AddGoalToDom = (item) => {
	// Li Node and Text Node
	const node = document.createElement('li');
	const text = document.createTextNode(item.goal);

	// Set attributes for li node
	node.setAttribute('id', item.id);
	node.classList.add('goal');

	// Get Remove button
	const remove = removeButton(() => store.dispatch(removeGoalCreator(item.id)));

	/// Addd the child nodes to the parent
	node.appendChild(remove);
	node.appendChild(text);

	return node;
};

const goal1 = addGoalCreator('Learn React');
store.dispatch(goal1);
store.dispatch(addGoalCreator('Learn Redux'));
//console.log('State after ADDING 1st Goal',store.getState());

store.dispatch(removeGoalCreator(goal1.goal.id));
//console.log('State after REMOVING 1st Goal',store.getState());

const todo1 = addTodoCreator('generate stub');
store.dispatch(todo1);
store.dispatch(toggleTodoCreator(todo1.todo.id));
// Reducer function for Goals

store.dispatch(addTodoCreator('generate stub 2'));
