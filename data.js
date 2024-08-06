function MyApp() {
  const [items, setItems] = React.useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        handleToggle={handleToggle}
        handleDeleteItem={handleDeleteItem}
        items={items}
        ms={setItems}
        setIte
      />
      <Footer items={items} />
    </div>
  );
}

function Logo() {
  /*const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(function () {
    setInterval(function () {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);*/

  const time = new Date().getHours();

  const goodMorning = 24;
  const goodAfterNoon = 20;

  const Morning = time <= goodMorning && time >= goodAfterNoon;
  return (
    <div>
      <p className="kareen">
        {Morning
          ? "Good Night Kelvin, Sleep tight... 😴"
          : "Good Day Kelvin 💞"}
      </p>
      <h1>Kelvin's goals today</h1>
    </div>
  );
}

function Form({ handleAddItems }) {
  const [description, setDesription] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItems = { quantity, description, id: Date.now(), packed: false };

    handleAddItems(newItems);

    setDesription("");
    setQuantity(1);
  }

  return (
    <div>
      <div className="kareen-div">
        <h3> Kelvin what do you need for today 😍</h3>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="add-form">
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>

        <input
          value={description}
          onChange={(e) => setDesription(e.target.value)}
          type="text"
          placeholder="Add item..."
        />

        <button>add</button>
      </form>
    </div>
  );
}

function PackingList({ handleToggle, items, handleDeleteItem, setItems }) {
  const [sortBy, setSortBy] = React.useState("input");

  let sortedItem;

  if (sortBy === "input") sortedItem = items;

  if (sortBy === "description")
    sortedItem = items

      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItem = items

      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  function handleClearList() {
    const confirmed = window.confirm(
      "Karren are sure you want to clear your list"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            handleToggle={handleToggle}
            handleDeleteItem={handleDeleteItem}
            item={item}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={"input"}>input</option>
          <option value={"description"}>description</option>
          <option value={"packed"}>packed</option>
        </select>
        <button onClick={() => handleClearList()}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ handleToggle, item, handleDeleteItem }) {
  return (
    <div>
      <li>
        <input
          onClick={() => handleToggle(item.id)}
          type="checkbox"
          value={item.id}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => handleDeleteItem(item.id)}>❌</button>
      </li>
    </div>
  );
}

function Footer({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some goals for the day 💪</em>
      </footer>
    );
  const quantity = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / quantity) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "Weldone Kelvin you reached your goal ✈"
          : `You have ${quantity} goal(s) on your list and you already achieved ${packedItems} goal(s) (${percentage}%)`}
      </em>
    </footer>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
