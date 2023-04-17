import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useStore } from 'react-redux';
import { logout } from '../store/actions/actions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const store = useStore();

    const signOut = () => {
        dispatch(logout())
        if (store.getState() != undefined) {
            if (store.getState().isLoggedIn == true) {
                setUser(store.getState().user);
                console.log(user);
            }
        }
        else {
            navigation.navigate('Login')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#006BFF', }}>
            <View style={{ marginTop: 40 }}>
                <View style={{ padding: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('BottomTab') }} style={{ flexDirection: 'row' }} >
                        <AntDesign name="home" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>Dashbaord</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('MyAppointments') }} style={{ flexDirection: 'row' }}>
                        <AntDesign name="exception1" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>My Appointments</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Services') }} style={{ flexDirection: 'row' }}>
                        <AntDesign name="tool" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>Services</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Shop') }} style={{ flexDirection: 'row' }}>
                        <AntDesign name="shoppingcart" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>Shop</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Vehicles') }} style={{ flexDirection: 'row' }}>
                        <AntDesign name="car" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>Vehicles</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Estimation')}>
                        <Entypo name="price-tag" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>Estimation</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} >
                        <AntDesign name="gift" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>Get Rewards</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                        navigation.navigate('FuelScreen')
                    }}>
                        <MaterialCommunityIcons name="gas-station" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>Get Fuel</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 10, marginHorizontal: 20 }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                        signOut();
                        navigation.navigate('Welcome')
                    }}>
                        <Ionicons name="exit-outline" size={20} color="#fff" />
                        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 10 }}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DrawerScreen;