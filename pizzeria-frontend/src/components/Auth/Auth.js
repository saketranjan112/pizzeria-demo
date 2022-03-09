import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { register, signIn } from '../../actions/authActions'

const initialState = {name:'', email:'', password:''}
export default function Auth() {
    const [formData, setFormData] = useState(initialState);
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
    const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        if(isRegister) {
            dispatch(register(formData, navigate, setInvalidEmailMsg));
            setErrorMessage('Email is already registered')
        }else{
            console.log(errorMessage)
            dispatch(signIn(formData, navigate, setInvalidEmailMsg, setInvalidPasswordMsg));
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const matchPassword = (e) => {
        if(e.target.value !== formData.password){
            setErrorMessage('Passwords Mismatch');
        }else{
            setErrorMessage('');
        }
    }

    const handleSwitch = () => {
        setFormData(initialState);
        setIsRegister((prevIsRegister) => !prevIsRegister);
        setShowPassword(false);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
  return (
    <div className="row mt-5">
        <form className="p-0 col-lg-5 col-md-6 col-sm-8 m-auto border border-success rounded" onSubmit={handleSubmit}>
            <h3 className="bg-warning text-white border-bottom border-success rounded-top lh-lg">{
                isRegister ? "User Registration" : "User Login"
            }</h3>
            { isRegister && (
                <div className="mt-3 ms-3 me-3">
                    <input type="text" className="form-control" id="name" name="name" placeholder='Enter Your Name' onChange={handleChange} required/>
                </div>
            )}
            <div className="mt-3 mb-3 me-3 ms-3">
                <input type="email" className="form-control m-auto" id="email" name="email" placeholder='Enter Your Email' onChange={handleChange} required/>
                <div id="emailHelp" className="form-text text-danger">{invalidEmailMsg}</div>
            </div>
            <div className="mb-3 ms-3 me-3">
                <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" placeholder='Enter Password' onChange={handleChange} required/>
                <div id="emailHelp" className="form-text text-danger">{invalidPasswordMsg}</div>
            </div>
            { isRegister && (
                <div className="mb-3 ms-3 me-3">
                    <input type={showPassword ? "text" : "password"} className="form-control" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' onChange={matchPassword} required/>
                    <div id="emailHelp" className="form-text text-danger">{errorMessage}</div>
                </div>
            )}
            <div className="mb-3 d-flex justify-content-center form-check">
                <input type="checkbox" className="form-check-input" id="showPassword" onChange={handleShowPassword}/>&nbsp;
                <label className="form-check-label" htmlFor="showPassword">Show Password</label>
            </div>
            <div className="form-group mb-3">
                <button type="submit" className="btn btn-warning" disabled={errorMessage}>Submit</button>
            </div>
        </form>
        <div className="row">
            <div className="d-grid col-lg-5 col-md-6 col-sm-8 mx-auto ps-4">
                <button className="btn btn-outline-warning mt-3" onClick={handleSwitch}>{ isRegister ? "Already have an account? Sign in" : "Don't have an account? Register Now" }</button>
            </div>
        </div>
    </div>
  )
}
