import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signIn = (formData,navigate, setInvalidEmailMsg, setInvalidPasswordMsg, updateCart) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log('data fetched')
    await dispatch({ type: AUTH, data });
    await updateCart(prevState => prevState + 1);
    navigate('/');
  } catch (error) {
    console.log(error.response);
    setInvalidEmailMsg('');
    setInvalidPasswordMsg('');
    error.response.status === 400? setInvalidPasswordMsg(error.response.data.message) : setInvalidEmailMsg(error.response.data.message)
  }
};

export const register = (formData, navigate, setInvalidEmailMsg, updateCart) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    await dispatch({ type: AUTH, data });
    await updateCart(prevState => prevState + 1);
    navigate('/');
  } catch (error) {
    console.log(error);
    setInvalidEmailMsg(error.response.data.message)
  }
};