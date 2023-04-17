import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';
import * as Yup from 'yup';
import { BASE_URL } from '../functions';

const RegisterScreen = ({ navigation, route }) => {

    const { type } = route.params;
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

    const registerUser = (name, email, password, usertype) => {
        console.log(name + ' '+ email + ' '+ password + ' '+ usertype);
        axios({
            method: 'post',
            responseType: 'json',
            url: BASE_URL+"api/register",
            data: {
                name,
                email,
                password,
                usertype
            }
        }).then((res) => {
            console.log(res.data.user.token);
            if (res.data.status == true) {
                Alert.alert(
                    "Account created successfully!",
                    "Hey" + res.data.user.name + ", Login here",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                navigation.navigate('Verification', {
                    name: res.data.user.name,
                    type: usertype
                });
            } else if(res.data.status == false) {
                Alert.alert(
                    "Opp's Something went wrong!",
                    "Please try again",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        }).catch((e) => {
            console.log(e);
        });

    }

    return (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View style={styles.header}>
                <Text style={styles.toptext}>Sign Up</Text>
                <Text style={styles.topmsg}>Create a new account to access the features!</Text>

                <View style={styles.form}>
                    <Formik initialValues={{ fullname: '', email: '', password: '', cpassword: '', terms: false }}
                        validationSchema={RegistterSchema}
                        onSubmit={(values, { resetForm }) => {
                            registerUser(values.fullname, values.email, values.password, type)
                            resetForm({values: ''})
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
                                />
                                {errors.cpassword && touched.cpassword ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.cpassword}</Text> : null}
                                <TextInput style={styles.formInput} placeholderTextColor="#000" placeholder="Confirm Password"
                                    onChangeText={handleChange('cpassword')}
                                    onBlur={handleBlur('cpassword')}
                                    value={values.cpassword}
                                />
                                {errors.terms && touched.terms ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.terms}</Text> : null}
                                {/* <BouncyCheckbox text='I accept the terms & conditions' size={25}
                                    fillColor="#ddd"
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ borderColor: "black" }}
                                    innerIconStyle={{ borderRadius: 0.8, borderWidth: 2, }}
                                    style={{ marginVertical: 10, padding: 2 }}
                                    value={values.terms}
                                    onChange={handleChange('terms')}
                                    onBlur={handleBlur('terms')}
                                /> */}
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

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 220,
        backgroundColor: '#006BFF',
        borderRadius: 20,
    },
    toptext: {
        color: '#fff',
        position: 'absolute',
        width: 200,
        top: 80,
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
        top: 150,
        left: 20,
        fontSize: 20,
        fontWeight: 'normal',
        letterSpacing: -0.017,
        display: 'flex',
        alignItems: 'center'
    },
    form: {
        position: 'absolute',
        top: 230,
        width: '100%',
        height: '100%',
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
    }
});

export default RegisterScreen;