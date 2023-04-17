import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import DashBoardScreen from '../screens/DashBoardScreen';

import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PollScreen from '../screens/PollScreen';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import SubscriptionScreen from '../screens/subscription/SubscriptionScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { View } from 'react-native';
import { useStore } from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {

    const navigation = useNavigation();
    const store = useStore();

    const [cart, setCart] = useState([]);

    useEffect(() => {
        if(store.getState() != undefined)
        {
            setCart(store.getState().cart);
        }
    })

    return (
        <Tab.Navigator>
            <Tab.Screen name="DashboardScreen" component={DashBoardScreen} options={{ headerShown: false }}

                options={{
                    tabBarShowLabel: false,
                    headerStyle: {
                        backgroundColor: '#006BFF',
                    },
                    tabBarActiveBackgroundColor: '#eee',
                    headerShadowVisible: false,
                    headerTintColor: '#fff',
                    tabBarStyle: { height: 60, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                    headerTitle: 'Vehicle Alliance',
                    headerRight: () => {
                        return (
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
                                    {(cart.length > 0) ? <Ionicons name="ios-cart" size={20} style={{ marginRight: 15 }} color="#fff" /> :
                                    <Ionicons name="ios-cart-outline" size={20} style={{ marginRight: 15 }} color="#fff" />}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
                                    <Ionicons name="menu" size={20} style={{ marginRight: 15 }} color="#fff" />
                                </TouchableOpacity>

                            </View>
                        )
                    },
                    tabBarIcon: () => {
                        return (<Octicons name="home" size={25} color="#000" />);
                    },
                }}>
            </Tab.Screen>
            <Tab.Screen name="Notifications" component={NotificationScreen}
                options={{
                    tabBarShowLabel: false,
                    headerStyle: {
                        backgroundColor: '#006BFF'
                    },
                    tabBarActiveBackgroundColor: '#eee',
                    headerShadowVisible: false,
                    headerTintColor: '#fff',
                    tabBarStyle: { height: 60, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                    headerTitle: 'Notifications',
                    tabBarIcon: () => {
                        return (<MaterialIcons name="notifications-none" size={28} color="#000" />);
                    }
                }}
            ></Tab.Screen>
            <Tab.Screen name="Poll" component={PollScreen} options={{ headerShown: false }}
                options={{
                    tabBarShowLabel: false,
                    headerStyle: {
                        backgroundColor: '#006BFF'
                    },
                    tabBarActiveBackgroundColor: '#eee',
                    headerShadowVisible: false,
                    headerTintColor: '#fff',
                    tabBarStyle: { height: 60, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                    headerTitle: 'Poll',
                    tabBarIcon: () => {
                        return (<AntDesign name="plussquare" size={25} color="#000" />);
                    }
                }}
            ></Tab.Screen>
            <Tab.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: false }}
                options={{
                    tabBarShowLabel: false,
                    headerStyle: {
                        backgroundColor: '#006BFF'
                    },
                    tabBarActiveBackgroundColor: '#eee',
                    headerShadowVisible: false,
                    headerTintColor: '#fff',
                    tabBarStyle: { height: 60, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                    headerTitle: 'Subscription',
                    tabBarIcon: () => {
                        return (<MaterialIcons name="add-task" size={29} color="#000" />);
                    }
                }}></Tab.Screen>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}
                options={{
                    tabBarShowLabel: false,
                    headerStyle: {
                        backgroundColor: '#006BFF'
                    },
                    tabBarActiveBackgroundColor: '#eee',
                    headerShadowVisible: false,
                    headerTintColor: '#fff',
                    tabBarStyle: { height: 60, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
                    headerTitle: 'Profile',
                    headerRight: () => {
                        return (<Ionicons name="settings" size={20} style={{ marginRight: 15 }} color="#fff" />);
                    },
                    tabBarIcon: () => {
                        return (<MaterialIcons name="supervised-user-circle" size={29} color="#000" />);
                    }
                }}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default BottomTabNavigation;