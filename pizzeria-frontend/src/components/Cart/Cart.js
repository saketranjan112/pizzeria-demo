import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CartItem from './CartItem'

export default function Cart() {
  const [cartData, setCartData] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.result);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user'))?.result);
    console.log(user)

    if(user){
      console.log(user.cartId)
      axios.get(`http://localhost:4000/cart/${user.cartId}`)
      .then((response) => {
        console.log(response.data)
        setCartData(response.data)
      })
      .catch((error) => console.log(error));
    }

  },[total])

  console.log(cartData)
  return (
    <div className="container">
      
        
          { user && cartData ? cartData.items.length !== 0 ? (
            <div className="row mt-3">
              <div className="col-8 mx-auto">
                {cartData.items.map((item) => {
                    return(
                      <CartItem pizzaId={item.id} cartId={user.cartId} qty={item.qty} key={item.id} addToTotal={setTotal}/>
                    )
                  })
                }
              </div>
              <div className="col-4 mt-3 mx-auto">
                <div className="card">
                  <p className="my-2 fs-4 d-flex justify-content-around"><span className="text-secondary">Cart Total:</span><span className="text-primary">{total}</span></p>
                </div>
              </div>
            </div>
          ) : (
            <p className="display-4 text-center text-secondary mt-5">
              Cart is empty.
            </p>
          ) : (
            <p className="fs-4 text-center text-secondary mt-5">
              <Link to='/auth' className="btn btn-primary btn-lg">Sign In</Link> to add items in cart.
            </p>
          )}
      
    </div>
  )
}
