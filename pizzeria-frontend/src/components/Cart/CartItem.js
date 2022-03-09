import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CartItem({pizzaId, cartId, qty, addToTotal}){
  const [pizza, setPizza] = useState(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(qty);

  useEffect(() => {
    console.log('useEffect invoked')
    console.log(cartId)
    axios.get(`http://localhost:4000/pizzas/${pizzaId}`)
    .then((response) => {
      console.log(response.data[0]);
      setPizza(response.data[0]);
      addToTotal((prevTotal) => prevTotal + (response.data[0].price * quantity));
    })
    .catch((error) => console.log(error))
  },[])

  const deleteFromCartHandler = () => {
    
    axios.post('http://localhost:4000/cart/deleteFromCart', {pizzaId, cartId})
    .then((response) => {
      console.log(response);
      addToTotal((prevTotal) => prevTotal - (pizza.price * quantity));
    })
    .catch((error) => console.log(error))
  }

  const qtyChangeHandler = (e) => {
    if(e.target.value === "+"){
      setQuantity(quantity + 1);
      addToTotal((prevTotal) => prevTotal + (pizza.price));
      axios.post('http://localhost:4000/cart/increaseQuantity', {pizzaId, cartId})
      .then((response) => console.log('quantity increased'))
      .catch((error) => console.log(error))
    }else{
      setQuantity(quantity - 1);
      addToTotal((prevTotal) => prevTotal - (pizza.price));
      axios.post('http://localhost:4000/cart/decreaseQuantity', {pizzaId, cartId})
      .then((response) => console.log('quantity decreased'))
      .catch((error) => console.log(error))
    }
  }

  return (
    <div className="card mt-3 p-2 mx-auto">
      { !pizza ? (<p className="fs-3">Loading...</p>)
      : (
          <div className="row">
            <div className="col-4 mx-auto">
              <img src={pizza.image} className="card-img-top" alt="..." style={{"height": 200, "width": 200}}/>
            </div>
            <div className="col-5 mx-auto text-start pe-4">
                <div className="d-flex justify-content-start fs-5 mb-2"><b>{pizza.name}</b><span className={ pizza.type === 'veg' ? 'rounded-circle bg-success mt-2 ms-2' : 'rounded-circle bg-danger mt-2 ms-2'} style={{"height": 12, "width": 12}}></span></div>
                <p style={{"fontSize": "12px"}}>with {pizza.topping.map((topping, index) => <span key={index}>{topping},&nbsp;</span>)}</p>
                <p className="card-text">
                  <button className="btn btn-sm btn-outline-warning" disabled={quantity === 1} value="-" onClick={qtyChangeHandler}>-</button>
                   &nbsp;&nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;
                  <button className="btn btn-sm btn-outline-warning" value="+" onClick={qtyChangeHandler}>+</button>
                  &nbsp;&nbsp;
                  <button className="btn btn-outline-light" onClick={deleteFromCartHandler}><img src="https://cdn-icons.flaticon.com/png/512/3405/premium/3405234.png?token=exp=1645347244~hmac=53ad20e67585105eeac52992d3568ef8" alt="..." style={{"height": 20, "width": 20}}/></button> 
                </p>
            </div>
            <div className="col-3 mx-auto pe-4" style={{"fontSize": 14}}>
                <div className="d-flex justify-content-between"><span>Price:</span><span><sup>&#x20B9;</sup>{pizza.price}.00</span></div>
                <div className="d-flex justify-content-between"><span>Quantity:</span><span>{quantity}</span></div>
                <hr></hr>
                <div className="d-flex justify-content-between">
                  <span className="mt-1">Cost:</span><span className="fs-5 text-success"><sup>&#x20B9;</sup>{pizza.price * quantity}.00</span>
                </div>          
            </div>
          </div>
      )}
    </div>
  )
}
