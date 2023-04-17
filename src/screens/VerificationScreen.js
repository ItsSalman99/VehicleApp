import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


const VerificationScreen = ({ navigation, route }) => {

    const { name, type } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={require('../assets/congrats.png')}
                    style={styles.logo} />
            </View>
            <View style={styles.container2}>
                <View style={styles.buttons}>
                    <Text style={styles.h1}>Congratulations</Text>
                    <Text style={styles.p}>
                        Hey {name} ! Your user account has been successfully
                        created. Please verify your email to
                        use the application features.
                    </Text>
                    <TouchableOpacity  style={styles.btn} onPress={ () => {
                        navigation.navigate('Login')
                    } }>
                        <Text style={{color: '#fff'}}>
                            Login to the application
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container1: {
        flex: 0.8,
        alignItems: 'center'
    },
    logo: {
        width: '50%',
        height: '50%',
        position: 'absolute',
        top: 100,
    },
    container2: {
        flex: 1,
    },
    h1: {
        color: '#000',
        fontSize: 40,
        marginHorizontal: 30,
        marginVertical: 10
    },
    p: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        marginHorizontal: 30,
        marginVertical: 10
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#006BFF',
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
        fontSize: 20
    }
});


export default VerificationScreen;