import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as api from '../api/index';

export default function Build({updateCart}) {
    const [toppingData, setToppingData] = useState([]);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.result);

    const handleCheck = (e, price, name, id) => {
        console.log(price)
        console.log(e.target.checked)
        if(e.target.checked){
            setTotalCost(totalCost + price);
            setSelectedToppings([...selectedToppings, {name, id}]);
        }else{
            setTotalCost(totalCost - price);
            const newArray = selectedToppings.filter((topping) => topping.id !== id);
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

    const handleClick = async () => {

        const pizzaName = `${user.name}'s Recipe`;
        const cartId = user.cartId;
        let idArray = [];
        let toppings = [];
        selectedToppings.forEach((topping) => {
            toppings.push(topping.name);
            idArray.push(topping.id);
        })
        idArray = idArray.sort();
        let id = '';
        idArray.forEach(tid => {
            id += tid % 20;
        })
        const pizza = {
            id: id,
            name: pizzaName,
            image: 'https://image.shutterstock.com/z/stock-photo-top-view-with-a-sliced-pizza-primavera-on-a-blue-table-vegetarian-pizza-flat-lay-sliced-pizza-1801094347.jpg',
            topping: toppings,
            price: totalCost,
            type: idArray.includes(101) || idArray.includes(107) ? 'non-veg' : 'veg'
        }
        console.log(pizza);

        await api.addToCart(pizza, cartId);
        updateCart((prevState) => {
            console.log('updateCart called');
            return prevState + 1;
        });
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
                                <div className={topping.id === 107 || topping.id === 101? 'border border-2 border-danger me-3' : 'border border-2 border-success me-3'} style={{"height": 20, "width": 20, "float": "left"}}>
                                    <div className={topping.id === 107 || topping.id === 101? 'bg-danger rounded-circle mx-auto mt-1' : 'bg-success rounded-circle mx-auto mt-1'} style={{"height": 10, "width": 10}}></div>
                                </div>
                                <span>{topping.tname}</span>&nbsp;&nbsp; 
                                <span>(<b><sup>&#x20B9;</sup>{topping.price}.00</b>)</span>
                            </td>
                            <td>
                                <div className="form-check d-flex justify-content-center">
                                    <input className="form-check-input" type="checkbox" defaultChecked={false} onChange={(e) => handleCheck(e, topping.price, topping.tname, topping.id)} />&nbsp;&nbsp;
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
