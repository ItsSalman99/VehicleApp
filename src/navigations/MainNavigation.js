import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardScreen from '../screens/DashBoardScreen';
import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';
import BottomTabNavigation from './BottomTabNavigation';
import DrawerScreen from '../screens/DrawerScreen';
import EstimationScreen from '../screens/EstimationScreen';
import ViewEstimate from '../screens/estimation/ViewEstimate';
import UserTypeScreen from '../screens/Registration/UserTypeScreen';
import ServiceScreen from '../screens/services/ServiceScreen';
import ViewServiceScreen from '../screens/services/ViewServiceScreen';
import MyAppointmentScreen from '../screens/appointments/MyAppointmentScreen';
import ViewAppointmentScreen from '../screens/appointments/ViewAppointmentScreen';
import ShopScreen from '../screens/shop/ShopScreen';
import ProductDetail from '../screens/shop/ProductDetail';
import VehicleScreen from '../screens/vehicles/VehicleScreen';
import VerificationScreen from '../screens/VerificationScreen';
import RewardScreen from '../screens/rewards/RewardScreen';
import FuelScreen from '../screens/fuel/FuelScreen';
import Cart from '../screens/shop/addtoCart';
import AddPoll from '../screens/AddPoll';
import PollDetailScreen from '../screens/PollDetailScreen';
import SubscriptionForm from '../screens/subscription/SubscriptionForm';
import PlaceOrder from '../screens/PlaceOrder';
import GetReward from '../screens/rewards/GetReward';
import AppointmentScreen from '../screens/appointments/AppointmentScreen';

const Stack = createNativeStackNavigator();


const MainNavigation = () => {

    const navigation = useNavigation();
    const store = useStore();

    const [user, setUser] = useState([]);

    const getUser = () => {
        if (store.getState() != undefined) {
            if (store.getState().isLoggedIn == true) {
                setUser(store.getState().user);
                console.log(user);
            }
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name='BottomTab' component={BottomTabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={LogInScreen} options={{
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#006BFF',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
            }} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Dashboard' component={DashBoardScreen} options={{
                headerShown: true,
                headerTitle: 'Hello, ' + user.name,
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerBackVisible: false,
                headerShadowVisible: false,
                headerRight: () => {
                    return (
                        <TouchableOpacity>
                            <Text>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    )
                },
            }} />
            <Stack.Screen name='Drawer' component={DrawerScreen} options={{
                headerShown: true,
                headerTitle: 'Menu',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='Estimation' component={EstimationScreen} options={{
                headerShown: true,
                headerTitle: 'Estimation',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='ViewEstimate' component={ViewEstimate} options={{
                headerShown: true,
                headerTitle: 'Estimation',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='UserType' component={UserTypeScreen} options={{
                headerShown: true,
                headerTitle: 'Account Type',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='Services' component={ServiceScreen} options={{
                headerShown: true,
                headerTitle: 'Services',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='ViewService' component={ViewServiceScreen} options={{
                headerShown: true,
                headerTitle: 'View Services',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='MyAppointments' component={MyAppointmentScreen} options={{
                headerShown: true,
                headerTitle: 'My Appointments',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='ViewAppointments' component={ViewAppointmentScreen} options={{
                headerShown: true,
                headerTitle: 'View Appointments',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='Shop' component={ShopScreen} options={{
                headerShown: true,
                headerTitle: 'Shop',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='ProductDetail' component={ProductDetail} options={{
                headerShown: true,
                headerTitle: 'Product Detail',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='Vehicles' component={VehicleScreen} options={{
                headerShown: true,
                headerTitle: 'Vehicles',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='Verification' component={VerificationScreen} options={{
                headerShown: true,
                headerTitle: 'Verification',
                headerStyle: {
                    backgroundColor: '#fff'
                },
                headerTintColor: '#000',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='Rewards' component={RewardScreen} options={{
                headerShown: true,
                headerTitle: 'Spin Wheel',
                headerStyle: {
                    backgroundColor: '#fff'
                },
                headerTintColor: '#000',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='GetReward' component={GetReward} options={{
                headerShown: true,
                headerTitle: 'Reward Recieved',
                headerStyle: {
                    backgroundColor: '#fff'
                },
                headerBackVisible:false,
                headerTintColor: '#000',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='FuelScreen' component={FuelScreen} options={{
                headerShown: true,
                headerTitle: 'Get Fuel',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='CartScreen' component={Cart} options={{
                headerShown: true,
                headerTitle: 'Your Cart Items',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='Checkout' component={PlaceOrder} options={{
                headerShown: true,
                headerTitle: 'Place Your Order',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='AddPoll' component={AddPoll} options={{
                headerShown: true,
                headerTitle: 'Create New Poll',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
            <Stack.Screen name='PollDetail' component={PollDetailScreen} options={{
                headerShown: true,
                headerTitle: 'Detail',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />

            <Stack.Screen name='Subscribe' component={SubscriptionForm} options={{
                headerShown: true,
                headerTitle: 'Subscription Form',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />

            <Stack.Screen name='AppointService' component={AppointmentScreen} options={{
                headerShown: true,
                headerTitle: 'Appoint Service',
                headerStyle: {
                    backgroundColor: '#006BFF'
                },
                headerTintColor: '#fff',
                headerShadowVisible: false,
            }} />
        </Stack.Navigator>
    );
}

export default MainNavigation;