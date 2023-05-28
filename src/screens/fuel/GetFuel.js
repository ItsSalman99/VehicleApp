import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { RefreshControl } from 'react-native';
import { BASE_URL, getUser } from '../../functions';
import { Formik } from 'formik';
import { useStore } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import Line from '../../components/Line';
import axios from 'axios';
import * as Yup from 'yup';

const GetFuel = ({ navigation, route }) => {

    const { id, name, price } = route.params;

    const store = useStore();

    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState([]);

    const tomorrow = new Date();

    const [date, setDate] = useState()

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        tomorrow.setDate(tomorrow.getDate() + 1);

        const options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const tomorrowFormatted = tomorrow.toLocaleString('en-US', options);

        setDate(tomorrowFormatted);
        const check = async () => {
            const user = await getUser();
            setUser(user)
            setUserName(user.name)
            console.log(userName);
            if (user == null) {
                navigation.navigate('BottomTab')
            }
        }

        check();
    }, [10])

    const requestSchema = Yup.object().shape({
        address: Yup.string().required('Make sure that the address is filled correctly!'),
        contact: Yup.string().required('Please enter correct phone').min(11).max(11)
    });

    const submitRequest = (address, contact, note) => {
        setLoading(true);
        console.log('Request Fuel Hit');
        var user_id = user.id;
        var fuel_id = id;
        axios({
            method: 'post',
            responseType: 'json',
            url: BASE_URL + "api/fuel/request/store",
            data: {
                user_id,
                fuel_id,
                address,
                contact,
                note
            }
        }).then((res) => {
            if (res.data.status == false) {
                ToastAndroid.show(res.data.msg, ToastAndroid.SHORT)
                setLoading(false);
            }
            else if (res.data.status == true) {
                ToastAndroid.show(res.data.msg, ToastAndroid.SHORT)
                setLoading(false);
            }
        }).catch((e) => {
            console.log(e);
        })


    }

    return (
        (isLoading == true) ? <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View> :
            <ScrollView style={styles.container}>
                <View style={styles.container1}>
                    <Text style={styles.h1}>
                        Request For {name}
                    </Text>
                    <Text style={styles.p}>
                        As soon as your request will be accepted, you will recieve a call from staff
                        who manage to deliver it to your doorsteps.
                    </Text>
                </View>
                <View style={styles.container2}>
                    <Formik initialValues={{ address: '', contact: '', note: '' }}
                        validationSchema={requestSchema}
                        onSubmit={(values) => {
                            submitRequest(values.address, values.contact, values.note)
                        }}>
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                            <View>
                                <Text style={{ fontSize: 20, marginVertical: 10, color: '#000' }}>
                                    Fill the details correctly!
                                </Text>
                                {errors.address && touched.address ? <Text style={{ fontSize: 12, color: 'red', top: 15, left: 8 }}>{errors.address}</Text> : null}
                                <TextInput style={styles.formInput} placeholder="Address"
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                    placeholderTextColor="#0000007a"

                                />
                                {errors.contact && touched.contact ? <Text style={{ fontSize: 12, color: 'red', top: 15, left: 8 }}>{errors.contact}</Text> : null}
                                <TextInput style={styles.formInput} placeholder="contact"
                                    onChangeText={handleChange('contact')}
                                    onBlur={handleBlur('contact')}
                                    value={values.contact}
                                    placeholderTextColor="#0000007a"

                                />
                                <TextInput style={styles.formInput} placeholder="Note"
                                    onChangeText={handleChange('note')}
                                    onBlur={handleBlur('note')}
                                    value={values.note}
                                    placeholderTextColor="#0000007a"

                                />
                                <Text style={{ marginVertical: 10, width: 300, padding: 5 }}>You would recieve it at {date}</Text>
                                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                    <Text style={styles.btnTxt}>Submit Requset</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container1: {
        flex: 0.3,
        backgroundColor: '#006BFF',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        padding: 30,

    },
    h1: {
        fontSize: 30,
        color: '#fff'
    },
    p: {
        marginVertical: 10,
        fontSize: 16,
        color: '#fff'
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center'
    },
    form: {
        marginVertical: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    formInput: {
        color: '#000',
        width: 300,
        height: 55,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000',
        padding: 10,
        marginVertical: 20
    },
    btn: {
        width: 300,
        height: 55,
        backgroundColor: '#006BFF',
        borderRadius: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    btnTxt: {
        color: '#000',
        top: 10,
        fontSize: 22,
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


export default GetFuel;
