import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../PizzeriaLogo.png';
import userLogo from '../user.png';

export default function Navbar({noOfItems, amount, setCart, user, setUser}) {
    //const [user, setUser] = useState(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
        setCart(null);
    }

    useEffect(() => {
        console.log(user);
    },[navigate]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
        <div className="container-fluid pe-4">
            <span className="navbar-brand h1">Pizzeria</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link to="/"><img className="img-responsive" src={logo} alt="logo" style={{"height": 60, "width": 60}}/></Link>
                </li>
                <li className="nav-item mt-2">
                    <Link to="/order" className="nav-link">Order a Pizza</Link>
                </li>
                <li className="nav-item mt-2">
                    <Link to="/build" className="nav-link">Build Your Pizza</Link>
                </li>
            </ul>
            <div className="d-flex">
                { user ? <span className="rounded-circle bg-warning fs-3 m-auto" style={{"height": 40, "width": 40, "lineHeight": "40px"}}>{user.name[0]}</span> : <span className="bg-warning rounded-circle m-auto pt-1 me-2" style={{"height": 40, "width": 40}}><img src={userLogo} alt='...' style={{"height": 30, "width": 30}}/></span>}
                {user && <span className="nav-item text-white m-auto mx-3">{user.name}</span>}
                {user && (<div><button className="btn btn-outline-warning mt-1 mx-2" onClick={logout}>Logout</button></div>)}
                {!user && (<div>
                        <Link to="/auth">
                            <button className="btn btn-outline-warning mt-1 mx-2">Login</button>
                        </Link>
                    </div>
                )}
                <Link to="/user/cart" className="ms-3 position-relative">
                    <img className="img-responsive me-n2" src="https://t4.ftcdn.net/jpg/01/86/94/37/360_F_186943704_QJkLZaGKmymZuZLPLJrHDMUNpAwuHPjY.jpg" style={{"height": 50, "width": 50}}/>

                    {user && <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger p-1" style={{"height": 20, "width": 20}}>{noOfItems}</span>}

                    {user && <span className="position-absolute top-100 start-50 translate-middle badge rounded-pill bg-success p-1" style={{"height": 20}}>&#x20B9;{amount}</span>}
                </Link>
            </div>
        </div>
    </nav>
  )
}
