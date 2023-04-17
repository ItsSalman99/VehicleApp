import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBoardScreen from '../screens/DashBoardScreen';
import NotificationScreen from '../screens/NotificationScreen';
import BottomTabNavigation from './BottomTabNavigation';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={BottomTabNavigation} />
            <Drawer.Screen name="Notification" component={NotificationScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation;