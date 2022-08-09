import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import {
	handleAddTodo,
	handleRemoveTodo,
	handleToggleTodo,
} from '../actions/todos';

const Todos = (props) => {
	const todoRef = React.createRef();

	const addTodo = () =>
		props.dispatch(
			handleAddTodo(todoRef.current.value, () => (todoRef.current.value = ''))
		);

	const removeItem = (todo) => props.dispatch(handleRemoveTodo(todo));

	const toggleItem = (todo) => props.dispatch(handleToggleTodo(todo));

	return (
		<div id="todo">
			<h2>Todos</h2>
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

export default connect((state) => ({
	todos: state.todos,
}))(Todos);
