import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../PizzeriaLogo.png';

export default function Navbar({noOfItems}) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.result);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    }

    useEffect(() => {
        console.log(user);
        setUser(JSON.parse(localStorage.getItem('user'))?.result);
    },[navigate]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
        <div className="container-fluid">
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
                <span className="nav-item text-white m-auto me-3">{user?.name}</span>
                {user && (<div><button className="btn btn-outline-warning mt-1 mx-2" onClick={logout}>Logout</button></div>)}
                {!user && (<div>
                        <Link to="/auth">
                            <button className="btn btn-outline-warning mt-1 mx-2">Login</button>
                        </Link>
                    </div>
                )}
                <Link to="/user/cart" className="ms-3 me-n3">
                    <img className="img-responsive" src="https://t4.ftcdn.net/jpg/01/86/94/37/360_F_186943704_QJkLZaGKmymZuZLPLJrHDMUNpAwuHPjY.jpg" style={{"height": 50, "width": 50}}/>
                </Link>
                {user && <sup className="text-white bg-danger rounded-circle pt-2" style={{"height": 17, "width": 17}}>{noOfItems}</sup>}
                
            </div>
        </div>
    </nav>
  )
}
