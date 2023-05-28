import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStore } from 'react-redux';
import { BASE_URL, getUser } from '../functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {

    const store = useStore();
    const [user, setUser] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const check = async () => {
            const user = await getUser();
            setUser(user)
        }
        check();
        // console.log(data);
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

    const updateProfile = (name, email, oldpassword, password) => {
        // console.log(id);
        setLoading(true);
        axios({
            method: 'post',
            responseType: 'json',
            url: BASE_URL + 'api/profile/update/' + user.id,
            data: {
                name,
                email,
                oldpassword,
                password
            }
        }).then((res) => {
            // console.log(res.data.status);
            if (res.data.status == 500 || res.data.status == false) {
                setLoading(false);
                Alert.alert(
                    "Failed",
                    res.data.message,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
            else if (res.data.status == 200) {
                setLoading(false);
                var id = user.id; 
                updateData(id);
                Alert.alert(
                    "Profile Updated",
                    res.data.message,
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        }).catch((e) => {
            // error reading value
            console.log(e);
        });
    }

    return (
        (isLoading == true) ? <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View> :
            <ScrollView style={styles.container}>
                <View style={styles.container1}>
                    <View style={styles.header}>
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontSize: 23, color: '#fff' }}>
                                Welcome Back,
                            </Text>
                            <Text style={{ fontSize: 23, color: '#fff' }}>
                                {user.name}!
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container2}>
                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                        <Text style={{ color: '#000' }}>
                            To make any changes you need to enter your old password correctly!
                        </Text>
                    </View>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{ name: user.name, email: user.email, oldpassword: '', password: '' }}
                        onSubmit={values => updateProfile(values.name, values.email, values.oldpassword, values.password)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                            <View style={styles.form}>
                                <TextInput onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    style={styles.input} />
                                <TextInput placeholder='email'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    style={styles.input} />
                                <TextInput placeholder="********"
                                    onChangeText={handleChange('oldpassword')}
                                    onBlur={handleBlur('oldpassword')}
                                    placeholderTextColor="#000"
                                    value={values.oldpassword}
                                    style={styles.input} />
                                <TextInput placeholder="********"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholderTextColor="#000"
                                    style={styles.input} />
                                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                    <Text style={styles.btnTxt}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container1: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#006BFF',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    container2: {
        flex: 1,
    },
    form: {
        padding: 20
    },
    input: {
        color: '#000',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#ddd',
        backgroundColor: '#eee',
        marginVertical: 10
    },
    btn: {
        marginVertical: 20,
        height: 55,
        backgroundColor: '#006BFF',
        borderRadius: 18,
        textAlign: 'center',
    },
    btnTxt: {
        top: 10,
        fontSize: 22,
        textAlign: 'center',
        color: '#fff',
    }
});

export default ProfileScreen;