import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as api from '../api/index';

export default function Order({updateCart}) {
    const [pizzaData, setPizzaData] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.result);

    useEffect(() => {
        axios.get('http://localhost:4000/pizzas')
        .then((response) => setPizzaData(response.data))
        .catch((error) => console.log(error));

        setUser(JSON.parse(localStorage.getItem('user'))?.result);
    }, [])

    const addToCartHandler = async (pizza, cartId) => {
        
        await api.addToCart(pizza, cartId);


        updateCart((prevState) => {
            console.log('updateCart called');
            return prevState + 1;
        });
    }
    
  return (
      <div className="container">
        <div className="row justify-content-center">
            {pizzaData.map((pizza) => {
                return(
                    <div className="card col-5 mt-3 pt-2 mx-2" key={pizza.id}>
                        <div className="row">
                            <div className="col-3">
                                <h5 className="card-title">{pizza.name}</h5>
                                <div className={pizza.type === 'veg' ? 'border border-2 border-success mx-auto' : 'border border-2 border-danger mx-auto'} style={{"height": 20, "width": 20}}>
                                    <div className={pizza.type === 'veg' ? 'bg-success rounded-circle mx-auto mt-1' : 'bg-danger rounded-circle mx-auto mt-1'} style={{"height": 10, "width": 10}}></div>
                                </div>
                                <p className="card-text mt-4"><b><sup>&#x20B9;</sup>{pizza.price}.00</b></p>
                            </div>
                            <div className="col-5 text-start" style={{"fontSize": "12px"}}>
                                <p>{pizza.description}</p>
                                <p><b>Ingredients:</b> {pizza.ingredients.map((ingredient, index) => <span key={index}>{ingredient},&nbsp;</span>)}</p>
                                <p><b>Toppings:</b> {pizza.topping.map((topping, index) => <span key={index}>{topping},&nbsp;</span>)}</p>
                            </div>
                            <div className="col-4">
                                <img src={pizza.image} className="card-img-top" alt="..." style={{"height": 140, "width": 140}}/>
                                <br/><br/>
                                <button href="#" className="btn btn-warning text-white" disabled={!user} onClick={() => addToCartHandler(pizza, user.cartId)}>Add to Cart</button>
                                {!user && <p className='text-danger' style={{"fontSize": "8px"}}>Sign in for adding items to cart.</p>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
  )
}