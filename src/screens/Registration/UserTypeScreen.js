import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const UserTypeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.h1}>Account Type</Text>
                <Text style={styles.p}>Please select account that you
                    want to create
                </Text>
            </View>
            <View style={styles.container2}>
                <TouchableOpacity onPress={ () => navigation.navigate('Register', {
                    type: 'buyer'
                }) } style={styles.box}>
                    {/* <Image source={ require('../../assets/register/1.png+') } style={{ width: 100, height: 100 }} /> */}
                    <Text style={styles.title}>
                        Buyer
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigation.navigate('Register', {
                    type: 'seller'
                }) } style={styles.box}>
                    {/* <Image source={require('.../assets/item.png')} style={{ width: 100, height: 100 }} /> */}
                    <Text style={styles.title}>
                        Seller
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    container1: {
        flex: 0.2,
        padding: 30
    },
    container2: {
        flex: 1,
        padding: 30
    },
    h1: {
        fontSize: 30,
    },
    p: {
        marginVertical: 20,
        fontSize: 17
    },
    box: {
        borderWidth: 3,
        borderColor: '#ddd',
        shadowColor: '#000',
        borderRadius: 30,
        padding: 50,
        alignItems: 'center',
        marginVertical: 20
    },
    title: {
        fontSize: 30
    }

});

export default UserTypeScreen;