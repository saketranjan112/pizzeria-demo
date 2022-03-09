import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Build() {
    const [toppingData, setToppingData] = useState([]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.result);

    const handleCheck = (e, price, name) => {
        console.log(price)
        console.log(e.target.checked)
        if(e.target.checked){
            setTotalCost(totalCost + price);
            setSelectedToppings([...selectedToppings, name]);
        }else{
            setTotalCost(totalCost - price);
            const newArray = selectedToppings.filter((topping) => topping !== name);
            setSelectedToppings(newArray);
        }
        console.log(selectedToppings)
    }

    useEffect(() => {
        axios.get('http://localhost:4000/toppings')
        .then((response) => setToppingData(response.data))
        .catch((error) => console.log(error));

        setUser(JSON.parse(localStorage.getItem('user'))?.result);
    },[])

    const handleClick = () => {
        console.log(totalCost)
        console.log(selectedToppings)
        console.log(user.name, user.cartId)
        const pizzaName = "Naruto's Recipe";
        const cartId = user.cartId;
        axios.post('http://localhost:4000/cart/addCustomToCart',{ cartId: cartId, name: pizzaName, toppings: selectedToppings, price: totalCost})
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
    
  return (
    <div className="container">
        <p className="text-secondary my-2 text-center">Pizzeria now gives you options to build your own pizza. Customize your pizza by choosing ingredients from the list given below.</p>
        <table className="table table-sm table-bordered table-striped align-middle mx-auto rounded" style={{"width": "70%"}}>
            <tbody>
                {toppingData.map((topping) => {
                    return(
                        <tr key={topping.id}>
                            <td>
                                <img src={topping.image} className="card-img-top" alt="..." style={{"height": 55, "width": 55}}/>
                            </td>
                            <td>
                                <span>{topping.tname}</span>&nbsp;&nbsp; 
                                <span>(<b><sup>&#x20B9;</sup>{topping.price}.00</b>)</span>
                            </td>
                            <td>
                                <div className="form-check d-flex justify-content-center">
                                    <input className="form-check-input" type="checkbox" defaultChecked={false} onChange={(e) => handleCheck(e, topping.price, topping.tname)} />&nbsp;&nbsp;
                                    <label className="form-check-label text-warning" htmlFor="flexCheckDefault">
                                        Add
                                    </label>
                                </div>
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan="3" rowSpan="2">
                        <p className="fs-3 text-secondary text-start mt-2">
                            Total Cost : <span className="text-success"><sup>&#x20B9;</sup>{totalCost}.00</span>
                        </p>
                        <div className="d-grid">

                            { user ? selectedToppings.length < 3 && <p style={{"fontSize": 12}} className="text-danger">Please select a minimum of 3 toppings to build your pizza.</p> 
                            : <p style={{"fontSize": 12}} className="text-danger">Please Signin to build your pizza.</p>}
                            <button className="btn btn-outline-dark bg-warning" disabled={selectedToppings.length < 3} onClick={handleClick}>
                                <div>Build Pizza</div> 
                                <div style={{"fontSize": 12}}>& Add to cart</div>
                            </button>
                        </div>
                    </td>
                </tr>
                
            </tbody>
        </table>
        
    </div>
  )
}
