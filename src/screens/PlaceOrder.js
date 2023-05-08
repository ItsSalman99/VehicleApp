import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { ActivityIndicator, ScrollView, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useStore } from 'react-redux';
import { Formik } from 'formik';
import { BASE_URL, getUser } from '../functions';
import { clearcart } from '../store/actions/actions';
import { useNavigation } from '@react-navigation/native';


const PlaceOrder = ({route}) => {

    const store = useStore();
    const [cart, setCart] = useState([]);
    const [qtyInput, setqtyInput] = useState(1)
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { name, price, qty, product_id } = route.params;

    const placeOrder = async (card_no, exp_month, exp_year, cvv, address) => {
        console.log('order');
        setLoading(true);
        const total = price * qty;
        const user_id = await getUser();
        // console.log(card_no + ' ' + exp_month + ' ' + exp_year + ' ' + cvv + ' ' + address);
        const item = {
            'name': name,
            'price': price,
            'qty': qty,
            'product_id': product_id
        };
        axios({
            method: 'POST',
            responseType: 'json',
            url: BASE_URL+"api/order/place",
            data: {
                card_no: card_no,
                exp_month: exp_month,
                exp_year: exp_year,
                cvv: cvv,
                user_id: user_id['id'],
                total: total,
                name: name,
                price: price,
                qty: qty,
                product_id: product_id,
                address: address
            }
        }).then((response) => {
            console.log('success');
            if(response.data.status == true)
            {
                ToastAndroid.show('Order Placed Successfully!', ToastAndroid.SHORT)
                navigation.navigate('BottomTab')
            }
            else{
                ToastAndroid.show(response.data.msg, ToastAndroid.SHORT)
            }
            setLoading(false);
            dispatch(clearcart())
        }).catch((error) => console.log(error.response.data))

    }

    useEffect(() => {
        if (store.getState() != undefined) {
            setCart(store.getState().cart)
            console.log(cart);
        }
    }, [100])


    return (
        (isLoading == true) ? <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View> :
        <ScrollView style={styles.container}>
            <View style={{}}>
                <Text style={styles.h1}>Place Order</Text>
            </View>
            <View>
                <Formik
                    initialValues={{ card_no: '4242424242424242', address: '', exp_month: '02', exp_year: '28', cvv: '123' }}
                    onSubmit={(values, { resetForm }) => {
                        // setAddress(values.address)
                        placeOrder(values.card_no, values.exp_month, values.exp_year, values.cvv, values.address)
                    }}>
                    {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                        <View>
                            <TextInput placeholder='Card Number'
                                onChangeText={handleChange('card_no')}
                                onBlur={handleBlur('card_no')}
                                value={values.card_no}
                                placeholderTextColor="#000" style={styles.formInput} />
                            <TextInput placeholder='Month'
                                onChangeText={handleChange('exp_month')}
                                onBlur={handleBlur('exp_month')}
                                value={values.exp_month}
                                placeholderTextColor="#000" style={styles.formInput} />
                            <TextInput placeholder='Year'
                                onChangeText={handleChange('exp_year')}
                                onBlur={handleBlur('exp_year')}
                                value={values.exp_year}
                                placeholderTextColor="#000" style={styles.formInput} />
                            <TextInput placeholder='Cvv'
                                onChangeText={handleChange('cvv')}
                                onBlur={handleBlur('cvv')}
                                value={values.cvv}
                                placeholderTextColor="#000" style={styles.formInput} />
                            <TextInput placeholder='Add shipping address'
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                                placeholderTextColor="#000" style={styles.formInput} />
                            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                <Text style={styles.btnTxt}>Done</Text>
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
        flex: 1,
        backgroundColor: '#fff'
    },
    h1: {
        color: '#000',
        fontSize: 20,
        margin: 20
    },
    item: {
        borderWidth: 2,
        borderColor: '#ddd',
        margin: 10,
        padding: 10,
        borderRadius: 5
    },
    formInput: {
        color: '#000',
        height: 55,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 20,
        padding: 10,
        marginVertical: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    btn: {
        marginRight: 10,
        marginLeft: 10,
        height: 45,
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

export default PlaceOrder;