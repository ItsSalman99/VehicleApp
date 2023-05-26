import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BASE_URL, getUser } from '../../functions';
import { Formik } from 'formik';
import DatePicker from 'react-native-date-picker'
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AppointmentScreen = ({ navigation, route }) => {

    const { sid, name, description, price } = route.params;

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)


    const [id, setID] = useState('');
    const [user, setUser] = useState([]);

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        console.log(sid);
        const check = async () => {
            const user = await getUser();
            setUser(user)
        }
        check();
    }, [10])

    const Appoint = (date, address) => {
        setLoading(true);
        console.log(date);
        console.log(address);

        const URL = BASE_URL + "api/service/appoint/" + user.id;
        // console.log(URL);
        axios({
            method: 'post',
            responseType: 'json',
            url: URL,
            data: {
                sid,
                date,
                address
            }
        }).then((res) => {
            console.log(res.data.status);
            if (res.data.status == true) {
                ToastAndroid.show('Appointment successful!', ToastAndroid.SHORT)
                Alert.alert(
                    "Appointment successful",
                    res.data.message,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => navigation.navigate('MyAppointments') }
                    ]
                );
            }
            else {
                ToastAndroid.show(res.data.message, ToastAndroid.LONG)
                console.log(res.data.message);
            }
            setLoading(false);
        }).catch((e) => {
            console.log(e);
            setLoading(false);
        })
    }

    return (
        (isLoading == true) ? <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View> :
            <ScrollView style={styles.container}>
                <View style={styles.container1}>
                    <Text style={styles.h1}>
                        {name}
                    </Text>
                    <Text style={styles.p}>
                        {description}
                    </Text>
                </View>
                <View style={styles.container2}>
                    <Formik initialValues={{ address: '' }}
                        // validationSchema={LogInSchema}
                        onSubmit={(values, { resetForm }) => {
                            Appoint(date, values.address);
                            // resetForm();
                        }
                        }
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                            <View>
                                {errors.email && touched.email ? <Text style={{ fontSize: 12, color: 'red', top: 15, left: 8 }}>{errors.email}</Text> : null}
                                <DatePicker date={date} onDateChange={setDate}
                                    placeholderTextColor="#0000007a" textColor={'#000'}
                                    androidVariant='nativeAndroid'
                                    mode="date"
                                    minimumDate={new Date()}
                                />
                                {errors.password && touched.password ? <Text style={{ fontSize: 12, color: 'red', top: 15, left: 8 }}>{errors.password}</Text> : null}
                                <TextInput style={styles.formInput} placeholder="Address"
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                    placeholderTextColor="#0000007a"
                                />
                                {/* <View style={{ marginVertical: 15 }}>
                        <Text style={{ textAlign: 'right' }}>Forget password</Text>
                    </View> */}
                                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                    <Text style={styles.btnTxt}>Make an appointment</Text>
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
    container2: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },
    h1: {
        fontSize: 30,
        color: '#fff'
    },
    p: {
        marginVertical: 10,
        fontSize: 18,
        color: '#fff'
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#ddd',
        marginVertical: 20,
        padding: 30
    },
    boxH1: {
        fontSize: 25,
        color: '#000'
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
        height: 55,
        backgroundColor: '#eee',
        borderRadius: 20,
        padding: 10,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#ddd'
    },
    btn: {
        width: 300,
        height: 55,
        backgroundColor: '#006BFF',
        borderRadius: 18,
        textAlign: 'center',
    },
    btnTxt: {
        color: '#000',
        top: 10,
        fontSize: 22,
        textAlign: 'center',
        color: '#fff',
    },
});


export default AppointmentScreen;
