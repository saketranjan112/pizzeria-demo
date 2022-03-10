import React, { useState, useEffect } from 'react';
import axios from 'axios';
import deleteLogo from '../../delete.png';

export default function CartItem({updateCart ,pizza, cartId, addToTotal}){
  const [quantity, setQuantity] = useState(pizza.qty);

  useEffect(() => {
    console.log('useEffect invoked')
    addToTotal((prevTotal) => prevTotal + (pizza.price * quantity));
  },[])

  const pizzaId = pizza.id; 
  const deleteFromCartHandler = () => {
    
    axios.post('http://localhost:4000/cart/deleteFromCart', {pizzaId, cartId})
    .then((response) => {
      console.log(response);
      addToTotal((prevTotal) => prevTotal - (pizza.price * quantity));
      updateCart(prevState => prevState + 1);
    })
    .catch((error) => console.log(error))
  }

  const qtyChangeHandler = (e) => {
    if(e.target.value === "+"){
      setQuantity(quantity + 1);
      addToTotal((prevTotal) => prevTotal + (pizza.price));
      axios.post('http://localhost:4000/cart/increaseQuantity', {pizzaId, cartId})
      .then((response) => {
        console.log('quantity increased')
        updateCart(prevState => prevState + 1);
      })
      .catch((error) => console.log(error))
    }else{
      setQuantity(quantity - 1);
      addToTotal((prevTotal) => prevTotal - (pizza.price));
      axios.post('http://localhost:4000/cart/decreaseQuantity', {pizzaId, cartId})
      .then((response) => {
        console.log('quantity decreased')
        updateCart(prevState => prevState + 1);
      })
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
                <div className="d-flex justify-content-start fs-5 mb-2">
                  <b>{pizza.name}</b>
                  <div className={pizza.type === 'veg' ? 'border border-2 border-success ms-3 mt-1' : 'border border-2 border-danger ms-3 mt-1'} style={{"height": 20, "width": 20}}>
                    <div className={pizza.type === 'veg' ? 'bg-success rounded-circle mx-auto mt-1' : 'bg-danger rounded-circle mx-auto mt-1'} style={{"height": 10, "width": 10}}></div>
                  </div>
                </div>
                <p style={{"fontSize": "12px"}}>with {pizza.topping.map((top, index) => <span key={index}>{top},&nbsp;</span>)}</p>
                <p className="card-text">
                  <button className="btn btn-sm btn-outline-warning" disabled={quantity === 1} value="-" onClick={qtyChangeHandler}>-</button>
                   &nbsp;&nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;
                  <button className="btn btn-sm btn-outline-warning" value="+" onClick={qtyChangeHandler}>+</button>
                  &nbsp;&nbsp;
                  <button className="btn btn-outline-light" onClick={deleteFromCartHandler}><img src={deleteLogo} alt="..." style={{"height": 20, "width": 20}}/></button> 
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
