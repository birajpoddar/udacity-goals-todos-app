// Todo Thunks
const handleAddTodoAction = (name, callback) => {
	return (dispatch) => {
		API.saveTodo(name)
			.then(() => {
				dispatch(addTodoCreator({ id: generateId(), complete: false, name }));
				callback();
			})
			.catch(() => {
				alert('Something went wrong, please try again');
			});
	};
};

const handleDeleteTodoAction = (todo) => {
	return (dispatch) => {
		dispatch(removeTodoCreator(todo.id));

		API.deleteTodo(todo.id).catch(() => {
			alert('Something went wrong, please try again');
			dispatch(addTodoCreator(todo));
		});
	};
};

const handleToggleTodoAction = (todo) => {
	return (dispatch) => {
		dispatch(toggleTodoCreator(todo.id));

		API.saveTodoToggle(todo.id).catch(() => {
			alert('Something went wrong, please try again');
			dispatch(toggleTodoCreator(todo.id));
		});
	};
};

// Goal Thunks
const handleAddGoalAction = (name, callback) => {
	return (dispatch) => {
		API.saveGoal(name)
			.then(() => {
				dispatch(addGoalCreator({ id: generateId(), name }));
				callback();
			})
			.catch(() => {
				alert('Something went wrong, please try again');
			});
	};
};

const handleDeleteGoalAction = (goal) => {
	return (dispatch) => {
		dispatch(removeGoalCreator(goal.id));

		API.deleteGoal(goal.id).catch(() => {
			alert('Something went wrong, please try again');
			dispatch(addGoalCreator(goal));
		});
	};
};

// Initial Data Load
const handeInitialDataLoadAction = (flag) => {
	return (dispatch) => {
		if (flag) {
			Promise.all([API.fetchTodos(), API.fetchGoals()]).then(
				([todoList, goalList]) => {
					dispatch(receiveDataAction(todoList, goalList));
				}
			);
		}
	};
};
