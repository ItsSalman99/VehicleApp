import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


const WelcomeScreen = ({ navigation }) => {

    
    // const checkPage = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('username');
            
    //         if (value !== null) {

    //             navigation.navigate('BottomTab');
    //         }
    //         // console.log(value);
    //     } catch (e) {
    //         // error reading value
    //     }
    // }

    // checkPage()


    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={require('../assets/vehicle.png')}
                    style={styles.logo} />
            </View>
            <View style={styles.container2}>
                <Text style={styles.h1}>Vehicle Alliance</Text>
                <Text style={styles.p}>
                    To continue using this applicaction create an account or please login to your existing one.
                </Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('Login') }}>
                        <Text style={styles.btnTxt}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('Register', {
                        type: 'buyer'
                    }) }}>
                        <Text style={styles.btnTxt}>Sign Up</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('Verification') }}>
                        <Text style={styles.btnTxt}>Verification</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: '60%',
        height: '60%',
        position: 'absolute',
        top: 100,
        resizeMode: 'center'
    },
    container2: {
        flex: 1,
        backgroundColor: '#006BFF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    h1: {
        color: '#fff',
        fontSize: 40,
        marginHorizontal: 30,
        marginVertical: 10
    },
    p: {
        color: '#fff',
        marginHorizontal: 30,
        marginVertical: 10
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#fff',
        width: 150,
        height: 55,
        borderRadius: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
        margin: 10,
    },
    btnTxt: {
        color: '#000',
        fontSize: 20
    }
});


export default WelcomeScreen;