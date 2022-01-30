import './App.css';
import React, { useEffect, useState } from 'react';
import * as api from './Api';

function App() {
  const [cart, setCart] = useState([]);
  const [cat, setCat] = useState(-1);
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState("");

  const onEmail = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value);
  }

  const onItemAdd = (id) => {
    let item = items.filter(i => i.id == id)[0];
    setCart([...cart, item]);
  }
  
  const onSelect = (id) => {
    setCat(id)
  }

  const onCancel = (id) => {
    setCart([]);
  }
  const onOrder = (id) => {
    api.order(email, cart);
    setCart([]);
  }

  useEffect(() => {
    if (cat == -1)
      api.getItems().then(res => { return setItems(res.data) })
    else
      api.getItemsInCategory(cat).then(res => { return setItems(res.data) })
  }, [cat]);

  return (
    <div className="App">
      <CategoryList onSelect={onSelect}></CategoryList>
      <ProductsList items={items} onItemAdd={onItemAdd}></ProductsList>
      <Cart cart={cart} email={onEmail} order={onOrder} cancel={onCancel} ></Cart>
    </div>
  );
}
function Cart({ cart, email, order, cancel }) {
  return (
    <div className='itemList'>
      <span><b>Your cart:</b></span>
      <div >
        <span>Name</span>
        <span>Price</span>
      </div>
      {cart.map(
        item => <CartItem item={item}></CartItem>
      )}
      <div>Total price: {cart.map(v => v.price).reduce((p, c) => p + c, 0)}</div>
      <div>
        <button onClick={cancel}>Cancel</button>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" type="text" onChange={email}></input>
        <button onClick={e => {order(e)}} >Order</button>
      </div>
    </div>
  )
}

function ProductsList({ items, onItemAdd }) {
  return (
    <div className='itemList'>
      <span><b>Available items:</b></span>
      <div >
        <span>Name</span>
        <span>Price</span>
        <span>Buy</span>
      </div>
      {items.map(
        item => <Item item={item} onAdd={onItemAdd}></Item>
      )}
    </div>
  )
}

function CategoryList({ onSelect }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.getCategories().then(res => { return setItems(res.data) })
  }, []);
  return (
    <div className='catList'>
      <div><b>Categories:</b></div>
      <Category category={{ id: -1, name: "all" }} onSelect={onSelect}></Category>
      {items.map(
        item => <Category category={item} onSelect={onSelect}></Category>
      )}
    </div>
  )
}
function Item({ item, onAdd }) {
  return (
    <div>
      <span>{item.name}</span>
      <span>{item.price}</span>
      <button onClick={e => onAdd(item.id)}>Add to cart</button>
    </div>
  )
}
function CartItem({ item }) {
  return (
    <div>
      <span>{item.name}</span>
      <span>{item.price}</span>
    </div>
  )
}
function Category({ category, onSelect }) {
  return (<div>
    <a href="" onClick={e => { e.preventDefault(); onSelect(category.id) }}>
      {category.name}
    </a>
  </div>
  )
}
export default App;
