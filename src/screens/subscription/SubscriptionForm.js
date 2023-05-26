import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Line from "../../components/Line";
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useStore } from "react-redux";
import { BASE_URL, getUser, updateUser } from "../../functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SubscriptionForm = ({ navigation }) => {

    const CardScheme = Yup.object().shape({
        card: Yup.string().required('Please enter card number!'),
        name: Yup.string().required('Please enter your name!'),
        exp_month: Yup.string().required('Please enter your expiry month!'),
        exp_year: Yup.string().required('Please enter your expiry year!'),
        cvv: Yup.string().required('Please enter your cvv!').min(3).max(4),
        // terms: Yup.bool() // use bool instead of boolean
        //     .oneOf([true], "You must accept the terms and conditions")
    });

    const store = useStore();

    const [user, setUser] = useState([]);
    const [updateuser, setUpdateUser] = useState([]);

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

    const [isLoading, setLoading] = useState(false);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        getData();
        console.log('done');
        setIsRefreshing(true);
        await handleFetchPalettes();
        setIsRefreshing(false);
    }, [10]);

    const updateData = async (id) => {
        try {
            let response = await fetch(
                BASE_URL + 'api/getLoggedIn/user/' + id
            );
            let json = await response.json();
            // console.log(json.data);

            await AsyncStorage.setItem('user', JSON.stringify(json.data));
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
            setUser(json.data);
        } catch (error) {
            console.error(error);
        }
    }


    const subscribe = (card_no, name, exp_month, exp_year, cvv) => {
        setLoading(true);
        console.log(exp_year);
        const total = '1500';
        const user_id = user.id;
        axios({
            method: 'post',
            responseType: 'json',
            url: BASE_URL + "api/subscribe",
            data: {
                card_no,
                exp_month,
                exp_year,
                cvv,
                total,
                user_id
            }
        }).then((res) => {
            if (res.data.status == false) {
                ToastAndroid.show(res.data.msg, ToastAndroid.SHORT)
                setLoading(false);
            }
            else if (res.data.status == true) {
                // console.log(auth);
                // console.log(name);
                // user = useSelector(state => state.user);
                updateData(user_id)
                ToastAndroid.show('YOU HAVE SUBSCRIBED!', ToastAndroid.SHORT)
                setLoading(false);
                updateUser(user_id)
                navigation.navigate('BottomTab')
            }
        }).catch((e) => {
            console.log(e);
        })

    }

    return (
        (isLoading == true) ? <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View> :
            <ScrollView
                horizontal={false}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => { handleRefresh }} />}
                style={styles.container1}>
                <View style={{ padding: 20 }}>
                    <TouchableOpacity style={{ alignItems: 'center', marginBottom: 40 }}>
                        <Text>
                            <Ionicons name="card" size={180} color="#000" />
                        </Text>
                    </TouchableOpacity>
                    <Line />
                    <Formik initialValues={{ card: '4242 4242 4242 4242', name: 'Salman', exp_month: '02', exp_year: '2029', cvv: '123' }}
                        validationSchema={CardScheme}
                        onSubmit={(values, { resetForm }) => {
                            subscribe(values.card, values.name, values.exp_month, values.exp_year, values.cvv)

                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                            <View>
                                {errors.card && touched.card ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.card}</Text> : null}
                                <TextInput style={styles.formInput} placeholder="Card Number"
                                    placeholderTextColor={'#000'}
                                    onChangeText={handleChange('card')}
                                    onBlur={handleBlur('card')}
                                    value={values.card}
                                />
                                {errors.name && touched.name ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.name}</Text> : null}
                                <TextInput style={styles.formInput} placeholder="Name"
                                    onChangeText={handleChange('name')}
                                    placeholderTextColor={'#000'}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />

                                {errors.cvv && touched.cvv ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.exp_month}</Text> : null}
                                <TextInput style={styles.formInput} placeholder="Expiry Month"
                                    onChangeText={handleChange('exp_month')}
                                    placeholderTextColor={'#000'}
                                    onBlur={handleBlur('exp_month')}
                                    value={values.exp_month}
                                />

                                {errors.cvv && touched.cvv ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.exp_year}</Text> : null}
                                <TextInput style={styles.formInput} placeholder="Expiry Year"
                                    onChangeText={handleChange('exp_year')}
                                    placeholderTextColor={'#000'}
                                    onBlur={handleBlur('exp_year')}
                                    value={values.exp_year}
                                />
                                {errors.cvv && touched.cvv ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.cvv}</Text> : null}
                                <TextInput style={styles.formInput} placeholder="cvv"
                                    onChangeText={handleChange('cvv')}
                                    placeholderTextColor={'#000'}
                                    onBlur={handleBlur('cvv')}
                                    value={values.cvv}
                                />
                                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                    <Text style={styles.btnTxt}>Subscribe</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container1: {
        flex: 1
    },
    formInput: {
        height: 55,
        color: '#000',
        borderWidth: 1,
        borderColor: '#9A9797',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    },
    btn: {
        width: '100%',
        height: 59,
        backgroundColor: '#006BFF',
        borderRadius: 18,
        textAlign: 'center',
    },
    btnTxt: {
        top: 10,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default SubscriptionForm;