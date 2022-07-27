const List = (props) => {
	return (
		<ul>
			{props.items &&
				props.items.map((item) => (
					<li key={item.id}>
						<button className="margin-right-10">X</button>
						<span>{item.name}</span>
					</li>
				))}
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
			<input
				type="text"
				ref={todoRef}
				placeholder="Add Todo"
				className="margin-right-10"
			/>
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
			<input
				type="text"
				ref={goalRef}
				placeholder="Add Goal"
				className="margin-right-10"
			/>
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
			<Goals goals={state.goals} store={props.store} />
		</React.StrictMode>
	);
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App store={store} />);
