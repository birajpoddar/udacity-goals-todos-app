import todos from './todos';
import goals from './goals';
import loading from './loading';
import Redux from 'redux';

export default Redux.combineReducers({
	todos,
	goals,
	loading,
});
