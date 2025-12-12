import { useState } from "react";
import { X } from "lucide-react";
// Initial packing items
const initialItems = [
	{ id: 1, description: "Shirt", quantity: 5, packed: false },
	{ id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
	return <h1>My Travel List</h1>;
}

function Form({ handleAddItem }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();
		const item = {
			id: Date.now(),
			description: description,
			quantity: quantity,
			packed: false,
		};
		handleAddItem(item);
		setDescription("");
		setQuantity(1);
		console.log(item);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need to pack?</h3>
			<select
				name="qty"
				id="qty"
				onChange={(e) => setQuantity(parseInt(e.target.value))}
			>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>
			<input
				type="text"
				id="item"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button type="submit">Add</button>
		</form>
	);
}

function Item({
	description,
	quantity,
	packed,
	id,
	handleDeleteItem,
	handleUpdateItem,
}) {
	const [isChecked, setIsChecked] = useState(packed);
	return (
		<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
			<input
				type="checkbox"
				onChange={(e) => {
					setIsChecked(e.target.checked);
					handleUpdateItem(id, {
						id,
						description,
						quantity,
						packed: e.target.checked,
					});
				}}
			/>
			<li style={{ textDecoration: packed && "line-through" }}>
				{description} - {quantity}
			</li>
			<X onClick={() => handleDeleteItem(id)} />
		</div>
	);
}

function PackingList({ items, handleDeleteItem, handleUpdateItem }) {
	return (
		<div className="list">
			<ul>
				{items.map((item) => (
					<Item
						key={item.id}
						id={item.id}
						description={item.description}
						quantity={item.quantity}
						packed={item.packed}
						handleDeleteItem={handleDeleteItem}
						handleUpdateItem={handleUpdateItem}
					></Item>
				))}
			</ul>
		</div>
	);
}

function Stats({ items }) {
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
	const packedItems = items
		.filter((item) => item.packed)
		.reduce((sum, item) => sum + item.quantity, 0);
	const percentage =
		totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);

	return (
		<footer className="stats">
			{percentage == 100 ? (
				<em>you have everything packed!</em>
			) : (
				<em>
					You have {totalItems} items in the list. You already packed{" "}
					{packedItems} ({percentage}%).
				</em>
			)}
		</footer>
	);
}

function App() {
	const [items, setItems] = useState([]);
	function handleAddItem(item) {
		setItems((prev) => [...prev, item]);
	}
	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}
	function handleUpdateItem(id, updatedItem) {
		setItems((items) =>
			items.map((item) => (item.id === id ? updatedItem : item))
		);
	}
	return (
		<div className="app">
			<Logo />
			<Form handleAddItem={handleAddItem} />
			<PackingList
				items={items}
				handleDeleteItem={handleDeleteItem}
				handleUpdateItem={handleUpdateItem}
			/>
			<Stats items={items} />
		</div>
	);
}

export default App;
