import { LOGIN, LOGOUT, ADD_TO_CART, CLEAR_CART, INCREMENT_CART, DECREMENT_CART } from "../actionTypes";

export const login = (user) => ({
    type: LOGIN,
    payload: user
})

export const logout = () => ({
    type: LOGOUT,
    payload: []
})

export const addtocart = (data) => ({
    type: ADD_TO_CART,
    payload: data
})


export const clearcart = () => ({
    type: CLEAR_CART,
    payload: data
})

export const incrementcart = (id) => ({
    type: INCREMENT_CART,
    payload: id
})

export const decrementcart = (id) => ({
    type: DECREMENT_CART,
    payload: id
})