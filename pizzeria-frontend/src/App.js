import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Build from './components/Build';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Order from './components/Order';
import Cart from './components/Cart/Cart';
import Auth from './components/Auth/Auth';
import { useState, useEffect } from 'react';
import * as api from './api/index.js';

function App() {
  const [cartQty, setCartQty] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartRefresh, setCartRefresh] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.result);
  const [pizzaData, setPizzaData] = useState([]);
  const [cartData, setCartData] = useState();

  useEffect(async () => {
    const getUser = async () => {
      const data = await JSON.parse(localStorage.getItem('user'))?.result;
      setUser(data);
    };
    await getUser();
    console.log(user);

    const getPizza = async () => {
      const {data} = await api.fetchPizzas();
      setPizzaData(data);
    };
    await getPizza();    

    
      //console.log(user.cartId)
    const getCart = async () => {
      const {data} = await api.fetchCart(user?.cartId);
      console.log(data);
      setCartData(data);
      setCartQty(data ? data?.items?.length : 0);
      let total = 0;
      if(pizzaData && data){
        data.items.forEach((item) => {
          total += item.price * item.qty;
        })
      }
      setCartTotal(total);
    };
    await getCart();
    

  },[cartRefresh, cartTotal])

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar noOfItems={cartQty} amount={cartTotal} setCart={setCartData} user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home updateCart={setCartRefresh}/>}/>
          <Route path="/order" element={<Order updateCart={setCartRefresh}/>}/>
          <Route path="/build"element={<Build updateCart={setCartRefresh}/>}/>
          <Route path="/user/cart" element={<Cart updateCart={setCartRefresh}/>}/>
          <Route path="/auth" element={<Auth updateCart={setCartRefresh}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
