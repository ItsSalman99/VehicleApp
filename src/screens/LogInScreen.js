import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native';
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from 'axios';
import * as Yup from 'yup';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { login } from '../store/actions/actions';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { BASE_URL, getUser } from '../functions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LogInScreen = () => {

    const [user, setUser] = useState([]);
    const dispatch = useDispatch()
    const store = useStore();
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false);

    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const LogInSchema = Yup.object().shape({
        email: Yup.string().email('Invalid Email!').required('Please enter your email!'),
        password: Yup.string().required('Please enter password')
    });

    const submitLogin = (email, password) => {
        setLoading(true);
        console.log('Login Hit');

        axios({
            method: 'post',
            responseType: 'json',
            url: BASE_URL + "api/login",
            data: {
                email,
                password
            }
        }).then((res) => {
            if (res.data.status == 500) {
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
                setLoading(false);
            }
            else if (res.data.status == 'success') {
                dispatch(login(res.data.user))
                if (getUser() != null) {
                    navigation.navigate('BottomTab')
                }
                // console.log(auth);
                // console.log(name);
                // user = useSelector(state => state.user);
                ToastAndroid.show('Logged in successfull!', ToastAndroid.SHORT)
                setLoading(false);
            }
        }).catch((e) => {
            console.log(e);
        })


    }

    useEffect(() => {
        const check = async () => {
            const user = await getUser();
            console.log(user != null);
            if (user != null) {
                console.log('user');
                navigation.navigate('BottomTab')
            }
        }
        check();
    }, [])


    return (
        (isLoading == true) ? <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View> :
            <View style={{ backgroundColor: '#fff', height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.container1}>
                        <Text style={styles.toptext}>Sign In</Text>
                        <Text style={styles.topmsg}>Welcome Again!</Text>
                    </View>
                    <View style={styles.container2}>
                        <View style={styles.form}>
                            <Formik initialValues={{ email: '', password: '' }}
                                validationSchema={LogInSchema}
                                onSubmit={(values, { resetForm }) => {

                                    submitLogin(values.email, values.password);
                                    // resetForm();
                                }
                                }
                            >
                                {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                                    <View>
                                        {errors.email && touched.email ? <Text style={{ fontSize: 12, color: 'red', top: 15, left: 8 }}>{errors.email}</Text> : null}
                                        <TextInput style={styles.formInput} placeholder="Email"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            placeholderTextColor="#0000007a"
                                        />
                                        {errors.password && touched.password ? <Text style={{ fontSize: 12, color: 'red', top: 15, left: 8 }}>{errors.password}</Text> : null}
                                        <TextInput style={styles.formInput} placeholder="********"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            placeholderTextColor="#0000007a"
                                            secureTextEntry={!isPasswordVisible}

                                        />
                                        <TouchableOpacity
                                            style={{marginBottom: 10}}
                                            onPress={togglePasswordVisibility}
                                        >
                                            {isPasswordVisible ? (
                                                <Text>Hide Password</Text>
                                            ) : (
                                                <Text>Show Password</Text>
                                            )}
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                            <Text style={styles.btnTxt}>Sign In</Text>
                                        </TouchableOpacity>
                                        <Text style={{ marginVertical: 20, textAlign: 'center' }}>
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate('Register',
                                                    {
                                                        type: 'buyer'
                                                    })
                                            }}>
                                                <Text style={{ color: 'dodgerblue' }}>
                                                    Create a new account
                                                </Text>
                                            </TouchableOpacity>
                                        </Text>
                                    </View>
                                )}
                            </Formik>
                        </View>
                    </View>
                </View>
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#006BFF',
    },
    container1: {
        flex: 0.6,
        height: 20
    },
    container2: {
        flex: 2.3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    toptext: {
        color: '#fff',
        fontSize: 30,
        marginHorizontal: 30,
        marginVertical: 10,
    },
    topmsg: {
        color: '#fff',
        fontSize: 16,
        marginHorizontal: 30,
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
        marginVertical: 20
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

export default LogInScreen;