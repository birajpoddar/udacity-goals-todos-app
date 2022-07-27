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
			<List state={props.store.getState().todos} />
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
			<List state={props.store.getState().goals} />
		</div>
	);
};

const App = (props) => {
	return (
		<React.StrictMode>
			<Todos store={props.store} />
			<Goals store={props.store} />
		</React.StrictMode>
	);
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App store={store} />);

store.subscribe(() => {
	root.render(<App store={store} />);
});
