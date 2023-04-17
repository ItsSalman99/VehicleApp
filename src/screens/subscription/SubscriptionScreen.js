import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Line from "../../components/Line";
import * as Yup from 'yup';
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";


const SubscriptionScreen = () => {

    const navigation = useNavigation();

    const TermsScheman = Yup.object().shape({
        terms: Yup.bool() // use bool instead of boolean
            .oneOf([true], "You must accept the terms and conditions")
    });

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.title}>
                    Our Monthly Subscription
                </Text>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat.
                </Text>
            </View>
            <View style={styles.container2}>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.title2}>
                        PKR. 1500/Month
                    </Text>
                    <Line />
                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        {/* <BouncyCheckbox text='I accept the terms & conditions' size={25}
                            fillColor="#ddd"
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: "black" }}
                            innerIconStyle={{ borderRadius: 0.8, borderWidth: 2, }}
                            style={{ marginVertical: 10, padding: 2 }}
                            value={false}
                        /> */}
                        <TouchableOpacity style={styles.btn} onPress={ () => { navigation.navigate('Subscribe') }}>
                            <Text style={styles.btnTxt}>
                                Subscribe Now
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container1: {
        flex: 0.4,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#006BFF'
    },
    container2: {
        flex: 0.5
    },
    title: {
        padding: 20,
        color: '#fff',
        fontSize: 25
    },
    title2: {
        alignSelf: 'center',
        padding: 20,
        color: '#000',
        fontSize: 25
    },
    text: {
        fontSize: 16,
        padding: 20,
        color: '#fff',
    },
    btn: {
        backgroundColor: '#006BFF',
        height: 55,
        borderRadius: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: 10,
    },
    btnTxt: {
        color: '#fff',
        fontSize: 20
    }
})

export default SubscriptionScreen;
