import { LOGIN, LOGOUT, ADD_TO_CART, CLEAR_CART } from "../actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeUser, storeLogin } from "../../functions";


const initialState = {
    user: [],
    isLoggedIn: false,
    cart: []
}


const rootreducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            // const newState = [...state, action.payload];
            state.user = action.payload;
            state.isLoggedIn = true;
            storeLogin(state.user, state.isLoggedIn)
            return state;
            break;
        case LOGOUT:
            // const newState = [...state, action.payload];
            state.user = action.payload;
            state.isLoggedIn = false;
            removeUser()
            return state;
            break;
        case ADD_TO_CART:
            state.cart = action.payload;
            return state;
            break;
        case CLEAR_CART:
            state.cart = [];
            return state;
            break; 
        default:
            break;
    }
}


export default rootreducer;