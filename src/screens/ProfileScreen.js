import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStore } from 'react-redux';

const ProfileScreen = () => {

    const store = useStore();
    const [user, setUser] = useState('');

    const getData = async () => {
        if (store.getState() != undefined) {
            if(store.getState().isLoggedIn == true)
            {
                setUser(store.getState().user);
                // console.log(user);
            }
        }
    }

    const updateData = async (name, email) => {
        // try {
        //     await AsyncStorage.setItem('username', name);
        //     await AsyncStorage.setItem('email', email);
        // } catch (e) {
        //     // saving error
        //     console.log(e);
        // }
    }

    const updateProfile = (name, email, oldpassword, password) => {
        console.log(id);
        // axios({
        //     method: 'post',
        //     responseType: 'json',
        //     url: 'http://172.15.2.113:8000/api/profile/update/' + id,
        //     data: {
        //         name,
        //         email,
        //         oldpassword,
        //         password
        //     }
        // }).then((res) => {
        //     // console.log(res.data.status);
        //     if (res.data.status == 500 || res.data.status == false) {
        //         Alert.alert(
        //             "Failed",
        //             res.data.message,
        //             [
        //                 {
        //                     text: "Cancel",
        //                     onPress: () => console.log("Cancel Pressed"),
        //                     style: "cancel"
        //                 },
        //                 { text: "OK", onPress: () => console.log("OK Pressed") }
        //             ]
        //         );
        //     }
        //     else if (res.data.status == 200) {
        //         setName(res.data.user.name);
        //         setEmail(res.data.user.email);
        //         updateData(name, email);
        //         Alert.alert(
        //             "Profile Updated",
        //             res.data.message,
        //             [
        //                 { text: "OK", onPress: () => console.log("OK Pressed") }
        //             ]
        //         );
        //     }
        // }).catch((e) => {
        //     // error reading value
        //     console.log(e);
        // });
    }

    useEffect(() => {
        getData();
    }, [100]);

    return (
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
                    <View style={{ padding: 20 }}>
                        <Image
                            style={{ width: 80, height: 80, resizeMode: 'stretch' }}
                            source={require('../assets/avatar.png')}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.container2}>
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
                                value={values.oldpassword}
                                style={styles.input} />
                            <TextInput placeholder="********"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
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