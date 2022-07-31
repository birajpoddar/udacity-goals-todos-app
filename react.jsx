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

	const addTodo = (e) => {
		e.preventDefault();

		const newTodo = addTodoCreator(todoRef.current.value);
		props.store.dispatch(newTodo);
		todoRef.current.value = '';

		API.saveTodo(newTodo.todo.name).catch((err) => {
			alert('Something went wrong, please try again');
			console.log(newTodo);
			removeItem(newTodo.todo);
		});
	};

	const removeItem = (todo) => {
		props.store.dispatch(removeTodoCreator(todo.id));

		API.deleteTodo(todo.id).catch((err) => {
			alert('Something went wrong, please try again');
			props.store.dispatch(addTodoCreator(todo.name));
		});
	};

	const toggleItem = (todo) => {
		props.store.dispatch(toggleTodoCreator(todo.id));

		API.saveTodoToggle(todo.id).catch((err) => {
			alert('Something went wrong, please try again');
			props.store.dispatch(toggleTodoCreator(todo.id));
		});
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
			<List toggle={toggleItem} remove={removeItem} items={props.todos} />
		</div>
	);
};

const Goals = (props) => {
	const goalRef = React.createRef();

	const addGoal = (e) => {
		e.preventDefault();

		const newGoal = addGoalCreator(goalRef.current.value);
		props.store.dispatch(newGoal);
		goalRef.current.value = '';

		API.saveGoal(newGoal.goal.name).catch((err) => {
			alert('Something went wrong, please try again');
			console.log(newGoal);
			removeItem(newGoal.goal);
		});
	};

	const removeItem = (goal) => {
		props.store.dispatch(removeGoalCreator(goal.id));

		API.deleteGoal(goal.id).catch((err) => {
			alert('Something went wrong, please try again');
			props.store.dispatch(addGoalCreator(goal.name));
		});
	};

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

const App = (props) => {
	const [state, setState] = React.useState(props.store.getState());

	React.useEffect(() => {
		props.store.subscribe(() => {
			setState(props.store.getState());
		});

		if (state.loading) {
			Promise.all([API.fetchTodos(), API.fetchGoals()]).then(
				([todoList, goalList]) => {
					props.store.dispatch(receiveDataAction(todoList, goalList));
				}
			);
		}
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
