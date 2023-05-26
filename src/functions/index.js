import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const BASE_URL = "http://192.168.0.106:8000/";

export const storeLogin = async (user, isLoggedIn) => {
    try {
        // console.log(JSON.stringify(user));
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));

    } catch (e) {
        // read error
        console.log(e)
    }

}

export const removeUser = async () => {
    try {
        // console.log(JSON.stringify(user));
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('isLoggedIn');
        console.log("logged Out");

    } catch (e) {
        // read error
        console.log(e)
    }

}

export const getUser = async () => {
    try {
        const savedUser = await AsyncStorage.getItem("user");
        const currentUser = JSON.parse(savedUser);
        // console.log('asd');
        // console.log(currentUser);
        return currentUser;
    } catch (e) {
        // read error
        console.log(e)
    }


}

export const countCart = (cart) => {
    var count = 0;
    if (cart.length > 0) {
        cart.map((x) => {
            count += x.qty;
        })
    }
    return count;
}


export const countCartTotal = (cart) => {
    var total = 0;
    if (cart.length > 0) {
        cart.map((x) => {
            total = total + parseInt(x.price);
        })
    }
    return total * parseInt(countCart(cart));
}


export const updateUser = async (user) => {
    try {
        console.log(user);
        
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        
    } catch (e) {
        // read error
        console.log(e)
    }


}
