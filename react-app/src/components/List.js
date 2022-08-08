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
							style={{
								cursor: props.toggle ? 'pointer' : 'text',
								textDecoration: item.complete ? 'line-through' : 'none',
							}}
						>
							{item.name}
						</span>
					</li>
				))}
		</ul>
	);
};

export default List;
