import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Line from "../../components/Line";
import * as Yup from 'yup';
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../../functions";


const SubscriptionScreen = () => {

    const navigation = useNavigation();

    const TermsScheman = Yup.object().shape({
        terms: Yup.bool() // use bool instead of boolean
            .oneOf([true], "You must accept the terms and conditions")
    });

    const [user, setUser] = useState([]);

    useEffect(() => {
        const check = async () => {
            const user = await getUser();
            setUser(user)
            console.log(user);
            if (user == null) {
                console.log('user');
                navigation.navigate('BottomTab')
            }
        }
        check();
    }, [10])

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.title}>
                    One Time Subscription
                </Text>
                <Text style={styles.text}>
                    Our one time subscription which help you to get rid of advertisements and avail our future benefits.
                </Text>
                <Text style={styles.text}>
                    Easy one time secure payment process to get rid of our ads compaign.
                </Text>
            </View>
            <View style={styles.container2}>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.title2}>
                        PKR. 1500/Month
                    </Text>
                    <Line />
                    <View style={{ alignItems: 'center', marginTop: 30 }}>
                        {
                            user.is_sub == 1 ? <TouchableOpacity style={styles.btnsubscribe}>
                                <Text style={styles.subbtnTxt}>
                                    SUBSCRIBED
                                </Text>
                            </TouchableOpacity>
                                : <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('Subscribe') }}>
                                    <Text style={styles.btnTxt}>
                                        Subscribe Now
                                    </Text>
                                </TouchableOpacity>

                        }
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
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
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
    },
    btnsubscribe: {
        backgroundColor: '#ddd',
        height: 55,
        borderRadius: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: 10,
    },
    subbtnTxt: {
        color: '#000',
        fontSize: 20
    },
})

export default SubscriptionScreen;
