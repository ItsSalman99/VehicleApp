import { LOGIN, LOGOUT, ADD_TO_CART, CLEAR_CART } from "../actionTypes";

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