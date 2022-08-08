export const loggger = (store) => (next) => (action) => {
	console.group(action.type);

	console.log('State before Dispatch is', store.getState());
	console.log('Current Action is', action);
	const result = next(action);
	console.log('State after Dispatch is', store.getState());

	console.groupEnd();

	return result;
};
