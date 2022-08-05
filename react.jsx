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
		props.store.dispatch(
			handleAddTodoAction(
				todoRef.current.value,
				() => (todoRef.current.value = '')
			)
		);

	const removeItem = (todo) =>
		props.store.dispatch(handleDeleteTodoAction(todo));

	const toggleItem = (todo) =>
		props.store.dispatch(handleToggleTodoAction(todo));

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

function Goals(props) {
	const goalRef = React.createRef();

	const addGoal = () =>
		props.store.dispatch(
			handleAddGoalAction(
				goalRef.current.value,
				() => (goalRef.current.value = '')
			)
		);

	const removeItem = (goal) =>
		props.store.dispatch(handleDeleteGoalAction(goal));

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

const App = (props) => {
	const [state, setState] = React.useState(props.store.getState());

	React.useEffect(() => {
		props.store.dispatch(handeInitialDataLoadAction(state.loading));

		props.store.subscribe(() => {
			setState(props.store.getState());
		});
	});

	if (state.loading) {
		return <h3>Loading...</h3>;
	}

	return (
		<React.StrictMode>
			<Todos todos={state.todos} store={props.store} />
			<Goals goals={state.goals} store={props.store} />
		</React.StrictMode>
	);
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App store={store} />);
