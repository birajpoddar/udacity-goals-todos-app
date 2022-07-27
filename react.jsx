const List = (props) => {
	return (
		<ul>
			<li>LIST</li>
		</ul>
	);
};

const Todos = () => {
	return (
		<div id="todo">
			TODO
			<List />
		</div>
	);
};

const Goals = () => {
	return (
		<div id="todo">
			TODO
			<List />
		</div>
	);
};

const App = () => {
	return (
		<React.StrictMode>
			<Todos />
			<Goals />
		</React.StrictMode>
	);
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
