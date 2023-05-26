import { LOGIN, LOGOUT, ADD_TO_CART, CLEAR_CART, INCREMENT_CART, DECREMENT_CART } from "../actionTypes";
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
            if (state.cart.length > 0) {
                state.cart.map((value) => {
                    var flag = false;
                    if (action.payload.product_id == value.product_id) {
                        value.qty += 1;
                        flag = true;
                    }
                    else if (flag == false) {
                        state.cart.push(action.payload);
                    }
                })
            }
            else {
                state.cart.push(action.payload);
            }
            return state;
            break;
        case INCREMENT_CART:
            // console.log(action.payload);
            if (state.cart.length > 0) {
                state.cart.map((value) => {
                    if (action.payload == value.product_id) {
                        value.qty += 1;
                    }
                })
            }
            return state;
            break;
        case DECREMENT_CART:
            var indexToDelete = -1;

            if (state.cart.length > 0) {
                state.cart.map((value, key) => {
                    if (action.payload == value.product_id) {
                        if (value.qty == 1) {
                            if (indexToDelete !== -1) {
                                Data.splice(indexToDelete, 1);
                                // state.cart.splice(action.payload, 1);
                            }
                        }
                        else if (value.qty > 1) {
                            value.qty -= 1;
                        }
                    }
                })

            }
            return state;
            break;
        case CLEAR_CART:
            state.cart = [];
            return state;
            break;
        default:
            return state;
    }
}


export default rootreducer;