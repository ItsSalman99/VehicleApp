import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = "http://192.168.0.112:8000/";

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