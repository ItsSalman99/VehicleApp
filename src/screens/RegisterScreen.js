import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native';
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';
import * as Yup from 'yup';
import { BASE_URL } from '../functions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation, route }) => {

    const { type } = route.params;
    const [isLoading, setLoading] = useState(false);
    // console.log(type);

    const RegistterSchema = Yup.object().shape({
        fullname: Yup.string().required('Please enter your nice name!'),
        email: Yup.string().email("Invalid Email!").required('Please enter your valid email'),
        password: Yup.string().required('Please enter password'),
        cpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        // terms: Yup.bool() // use bool instead of boolean
        //     .oneOf([true], "You must accept the terms and conditions")
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const registerUser = (name, email, password, usertype) => {
        setLoading(true)
        console.log(name + ' ' + email + ' ' + password + ' ' + usertype);
        axios({
            method: 'post',
            responseType: 'json',
            url: BASE_URL + "api/register",
            data: {
                name,
                email,
                password,
                usertype
            }
        }).then((res) => {
            console.log(res.data.user);
            if (res.data.status == true) {

                ToastAndroid.show('Account created successfully!!', ToastAndroid.SHORT)
                navigation.navigate('Verification', {
                    name: res.data.user.name,
                    type: usertype
                });
            } else if (res.data.status == false) {
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
            }
            setLoading(false)
        }).catch((e) => {
            console.log(e);
        });

    }

    return (
        (isLoading == true) ? <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View> :
            <ScrollView style={{ backgroundColor: '#fff', height: '100%' }}>

                <View style={styles.header}>
                    <Text style={styles.toptext}>Sign Up</Text>
                    <Text style={styles.topmsg}>Create a new account to access the features!</Text>


                </View>
                <View style={styles.form}>
                    <Formik initialValues={{ fullname: '', email: '', password: '', cpassword: '', terms: false }}
                        validationSchema={RegistterSchema}
                        onSubmit={(values, { resetForm }) => {
                            registerUser(values.fullname, values.email, values.password, type)
                            
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                            <View>
                                {errors.fullname && touched.fullname ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.fullname}</Text> : null}
                                <TextInput style={styles.formInput} placeholderTextColor="#000" placeholder="Full Name"
                                    onChangeText={handleChange('fullname')}
                                    onBlur={handleBlur('fullname')}
                                    value={values.fullname}
                                />
                                {errors.email && touched.email ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.email}</Text> : null}
                                <TextInput style={styles.formInput} placeholderTextColor="#000" placeholder="Email"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {errors.password && touched.password ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.password}</Text> : null}
                                <TextInput style={styles.formInput} placeholderTextColor="#000" placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={!isPasswordVisible}
                                />
                                {errors.cpassword && touched.cpassword ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.cpassword}</Text> : null}
                                <TextInput style={styles.formInput} placeholderTextColor="#000" placeholder="Confirm Password"
                                    onChangeText={handleChange('cpassword')}
                                    onBlur={handleBlur('cpassword')}
                                    value={values.cpassword}
                                    secureTextEntry={!isPasswordVisible}
                                />
                                {errors.terms && touched.terms ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.terms}</Text> : null}

                                <TouchableOpacity
                                    style={{ marginBottom: 10 }}
                                    onPress={togglePasswordVisibility}
                                >
                                    {isPasswordVisible ? (
                                        <Text>Hide Password</Text>
                                    ) : (
                                        <Text>Show Password</Text>
                                    )}
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                    <Text style={styles.btnTxt}>Sign Up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { navigation.navigate('Login') }} style={{ marginVertical: 50, textAlign: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'dodgerblue' }}>Already have an account!</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 220,
        backgroundColor: '#006BFF',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    toptext: {
        color: '#fff',
        position: 'absolute',
        width: 200,
        top: 50,
        left: 20,
        fontSize: 45,
        fontWeight: 'normal',
        lineHeight: 67,
        letterSpacing: -0.017,
        display: 'flex',
        alignItems: 'center'
    },
    topmsg: {
        color: '#fff',
        top: 130,
        left: 20,
        fontSize: 20,
        fontWeight: 'normal',
        letterSpacing: -0.017,
        display: 'flex',
        alignItems: 'center'
    },
    form: {
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    formInput: {
        height: 55,
        borderWidth: 1,
        color: '#000',
        borderColor: '#9A9797',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    },
    btn: {
        width: 300,
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
    toggleButton: {
        position: 'absolute',
        top: 175,
        right: 12,
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default RegisterScreen;