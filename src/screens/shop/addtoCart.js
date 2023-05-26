import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { Button } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useStore } from 'react-redux';
import Line from '../../components/Line';
import { BASE_URL, countCart, countCartTotal, getUser } from '../../functions';
import RBSheet from "react-native-raw-bottom-sheet";
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { decrementcart, incrementcart } from '../../store/actions/actions';

const Cart = () => {

    const store = useStore();
    const [cart, setCart] = useState([]);
    const [qtyInput, setqtyInput] = useState(1)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState(0);
    const [productId, setproductId] = useState(0);

    const placeOrder = async (name, price, qty, product_id) => {
        const total = price * qty;
        const user_id = await getUser();
        console.log(address);
        // const item = {
        //     'name': name,
        //     'price': price,
        //     'qty': qty,
        //     'product_id': product_id
        // };
        // axios({
        //     method: 'POST',
        //     responseType: 'json',
        //     url: "api/order/place",
        //     data: {
        //         user_id: user_id['id'],
        //         total: total,
        //         name: name,
        //         price: price,
        //         qty: qty,
        //         product_id: product_id,
        //         address
        //     }
        // }).then((res) => {
        //     console.log(res.data);
        // }).catch((error) => console.log(error.response.data))

    }

    const getCart = () => {
        if (store.getState() != undefined) {
            setCart(store.getState().cart)
            console.log(cart);
            
            // const parsedData = eval(cart);
            // Get the name of the first object
            // const firstObjectName = parsedArray[0].name;
            // console.log(parsedData[0]);
            // setName(parsedData[0].name)
            // setproductId(parsedData[0].product_id);
            // setPrice(parsedData[0].price)
            // setQty(parsedData[0].qty)
        }

        setLoading(false)
    }

    useEffect(() => {
        getCart();

        setLoading(false)
    }, [10])

    // placeOrder(name, price, qty, id) to remember

    const increment = (id) => {
        setLoading(true)
        // console.log('increment');
        // console.log(id);
        dispatch(incrementcart(id))
        if (store.getState() != undefined) {
            setCart(store.getState().cart)
            console.log(cart);
        }
        // navigation.navigate('CartScreen')
    }

    const decrement = (id) => {
        setLoading(true)
        console.log('decrement');
        console.log(id);
        dispatch(decrementcart(id))
        if (store.getState() != undefined) {
            setCart(store.getState().cart)
            console.log(cart);
        }
        // navigation.navigate('CartScreen')
    }

    const Item = ({ id, name, price, img, qty }) => {
        return (
            <View>
                <View style={styles.item}>
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <Image source={{ uri: BASE_URL + img }}
                            style={{ width: 100, height: 100, }} />
                        <View>
                            <Text style={{ color: '#000' }}>{name}</Text>
                            <View >
                                <Text style={{ color: '#000', fontSize: 16 }}>Rs. {price} Pkr ({qty})</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity
                                    style={{ backgroundColor: 'dodgerblue', width: 25, height: 40, marginTop: 10, marginRight: 5, alignItems: 'center', borderRadius: 5 }}
                                    onPress={() => { decrement(id) }}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                                <TextInput style={{ color: '#000', fontSize: 14, borderWidth: 2, borderColor: '#ddd', width: 40, height: 40, marginTop: 10, textAlign: 'center' }}
                                    value={qty.toString()} placeholder={qty.toString()} placeholderTextColor={'#000'} editable={false} />
                                <TouchableOpacity style={{ backgroundColor: 'dodgerblue', width: 25, height: 40, marginTop: 10, marginLeft: 5, alignItems: 'center', borderRadius: 5 }}
                                    onPress={() => { increment(id) }}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    const renderItem = ({ item }) => (
        <Item name={item.name} price={item.price} img={item.img} qty={item.qty} id={item.product_id} />
    );

    return (
        <View style={styles.container}>
            <View style={{}}>
                <Text style={styles.h1}>My Cart ({countCart(cart)})</Text>
            </View>
            <View>
                <FlatList
                    nestedScrollEnabled
                    data={cart}
                    renderItem={renderItem}
                    keyExtractor={cart.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: '#000' }}>Total: Rs. {countCartTotal(cart)}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Checkout', {
                        name: 'Car Chinese Leather - New Brand',
                        price: 9000,
                        qty: 2,
                        product_id: 2
                    })
                }}
                    style={{ backgroundColor: 'dodgerblue', height: 30, marginTop: 10, marginLeft: 5, marginRight: 5, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ fontSize: 18 }}> Place Order </Text>
                </TouchableOpacity>
            </View>
        </View>
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
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Cart;