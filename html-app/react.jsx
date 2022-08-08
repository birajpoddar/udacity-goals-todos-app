// Copied
const List = (props) => {
	return (
		<ul>
			{props.items &&
				props.items.map((item) => (
					<li key={item.id}>
						<button
							onClick={() => props.remove(item)}
							className="margin-right-10"
						>
							X
						</button>
						<span
							onClick={() => props.toggle && props.toggle(item)}
							className={item.complete ? 'completed' : null}
							style={{
								cursor: props.toggle ? 'pointer' : 'text',
							}}
						>
							{item.name}
						</span>
					</li>
				))}
		</ul>
	);
};

// Copied
const Todos = (props) => {
	const todoRef = React.createRef();

	const addTodo = () =>
		props.dispatch(
			handleAddTodoAction(
				todoRef.current.value,
				() => (todoRef.current.value = '')
			)
		);

	const removeItem = (todo) => props.dispatch(handleDeleteTodoAction(todo));

	const toggleItem = (todo) => props.dispatch(handleToggleTodoAction(todo));

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
			<List toggle={toggleItem} remove={removeItem} items={props.todos} />
		</div>
	);
};

// Copied
const ConnectedTodos = ReactRedux.connect((state) => ({ todos: state.todos }))(
	Todos
);

// Copied
const Goals = (props) => {
	const goalRef = React.createRef();

	const addGoal = () =>
		props.dispatch(
			handleAddGoalAction(
				goalRef.current.value,
				() => (goalRef.current.value = '')
			)
		);

	const removeItem = (goal) => props.dispatch(handleDeleteGoalAction(goal));

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

// Copied
const ConnectedGoals = ReactRedux.connect((state) => ({ goals: state.goals }))(
	Goals
);

// Copied
const App = (props) => {
	React.useEffect(() => {
		props.dispatch(handeInitialDataLoadAction());
	}, []);

	if (props.loading) {
		return <h3>Loading...</h3>;
	}

	return (
		<React.StrictMode>
			<ConnectedTodos />
			<ConnectedGoals />
		</React.StrictMode>
	);
};

// Copied
const ConnectedApp = ReactRedux.connect((state) => ({
	loading: state.loading,
}))(App);

// Copied
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
	<ReactRedux.Provider store={store}>
		<ConnectedApp />
	</ReactRedux.Provider>
);
