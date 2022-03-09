import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Build from './components/Build';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Order from './components/Order';
import Cart from './components/Cart/Cart';
import Auth from './components/Auth/Auth';
import { useState, useEffect } from 'react';

function App() {
  const [cartQty, setCartQty] = useState(0);
  const [cartRefresh, setCartRefresh] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.result);
  const [pizzaData, setPizzaData] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user'))?.result);
    console.log(user)

    if(user){
      console.log(user.cartId)
      axios.get(`http://localhost:4000/cart/${user.cartId}`)
      .then((response) => {
        setCartQty(response.data.items.length)
        const total = 0;
        response.data.items.forEach((item) => {
          const price = pizzaData.find(pizza => pizza.id === item.id)?.price;
          
        })
      })
      .catch((error) => console.log(error));
    }

  },[cartRefresh])

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar noOfItems={cartQty}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/order" element={<Order updateCart={setCartRefresh}/>}/>
          <Route path="/build"element={<Build/>}/>
          <Route path="/user/cart" element={<Cart/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
