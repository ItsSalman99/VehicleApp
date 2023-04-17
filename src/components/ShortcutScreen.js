
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const ShortcutScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { navigation.navigate('Services') }} style={styles.btn}>
                    <Text>
                        <AntDesign name="tool" size={20} color="#000" />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('MyAppointments') }} style={styles.btn}>
                    <Text>
                        <MaterialCommunityIcons name="sticker-text" size={20} style={{ marginRight: 15 }} color="#000" />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Estimation')} style={styles.btn}>
                    <Text>
                        <Entypo name="price-tag" size={20} color="#000" />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('FuelScreen')}} style={styles.btn}>
                    <Text>
                        <MaterialCommunityIcons name="gas-station" size={20} color="#000" />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                    <Text>
                        <AntDesign name="shoppingcart" size={20} color="#000" />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '89%',
        justifyContent: 'space-between',
        margin: 10
    },
    btn: {
        backgroundColor: '#DBD8D8',
        padding: 15,
        borderRadius: 10,
    }
})

export default ShortcutScreen;