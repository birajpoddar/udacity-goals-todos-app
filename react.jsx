const List = (props) => {
	return (
		<ul>
			<li>LIST</li>
		</ul>
	);
};

const Todos = (props) => {
	const todoRef = React.createRef();

	const addTodo = (e) => {
		e.preventDefault();
		props.store.dispatch(addTodoCreator(todoRef.current.value));
		todoRef.current.value = '';
	};

	return (
		<div id="todo">
			<h1>Todo List</h1>
			<input type="text" ref={todoRef} placeholder="Add Todo" />
			<button onClick={addTodo}>Add Todo</button>
			<List items={props.todos} />
		</div>
	);
};

const Goals = (props) => {
	const goalRef = React.createRef();

	const addGoal = (e) => {
		e.preventDefault();
		props.store.dispatch(addGoalCreator(goalRef.current.value));
		goalRef.current.value = '';
	};

	return (
		<div id="todo">
			<h1>Goals</h1>
			<input type="text" ref={goalRef} placeholder="Add Goal" />
			<button onClick={addGoal}>Add Goal</button>
			<List items={props.goals} />
		</div>
	);
};

const App = (props) => {
	const [state, setState] = React.useState(props.store.getState());

	React.useEffect(() => {
		props.store.subscribe(() => {
			setState(props.store.getState());
		});
	});

	return (
		<React.StrictMode>
			<Todos todos={state.todos} store={props.store} />
			<Goals goals={stotre.goals} store={props.store} />
		</React.StrictMode>
	);
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App store={store} />);
