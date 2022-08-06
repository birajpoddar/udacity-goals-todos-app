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

const ConnectedTodos = (props) => {
	return (
		<Context.Consumer>
			{(store) => {
				const { todos } = store.getState();

				return <Todos dispatch={store.dispatch} todos={todos} />;
			}}
		</Context.Consumer>
	);
};

function Goals(props) {
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
}

const ConnectedGoals = (props) => {
	return (
		<Context.Consumer>
			{(store) => {
				const { goals } = store.getState();

				return <Goals dispatch={store.dispatch} goals={goals} />;
			}}
		</Context.Consumer>
	);
};

const App = (props) => {
	const [state, setState] = React.useState(props.store.getState());

	React.useEffect(() => {
		props.store.dispatch(handeInitialDataLoadAction());

		props.store.subscribe(() => {
			setState(props.store.getState());
		});
	}, []);

	if (state.loading) {
		return <h3>Loading...</h3>;
	}

	return (
		<React.StrictMode>
			<ConnectedTodos />
			<ConnectedGoals />
		</React.StrictMode>
	);
};

const ConnectedApp = () => {
	return (
		<Context.Consumer>
			{(store) => {
				return <App store={store} />;
			}}
		</Context.Consumer>
	);
};

const Context = React.createContext();

const Provider = (props) => {
	return (
		<Context.Provider value={props.store}>{props.children}</Context.Provider>
	);
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
	<Provider store={store}>
		<ConnectedApp />
	</Provider>
);
