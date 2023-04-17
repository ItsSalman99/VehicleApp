import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { ScrollView } from 'react-native';
import { Button } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native'
import { useStore } from 'react-redux';
import Line from '../../components/Line';
import { BASE_URL, getUser } from '../../functions';
import RBSheet from "react-native-raw-bottom-sheet";
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';


const Cart = () => {

    const store = useStore();
    const [cart, setCart] = useState([]);
    const [qtyInput, setqtyInput] = useState(1)
    const navigation = useNavigation();

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

    useEffect(() => {
        if (store.getState() != undefined) {
            setCart(store.getState().cart)
            console.log(cart);
        }
    }, [100])

    // placeOrder(name, price, qty, id) to remember

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
                                <Text style={{ color: '#000', fontSize: 16 }}>Rs. {price} Pkr</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity style={{ backgroundColor: 'dodgerblue', width: 25, height: 30, marginTop: 10, marginRight: 5, alignItems: 'center', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 18 }}>-</Text>
                                </TouchableOpacity>
                                <TextInput style={{ borderWidth: 2, borderColor: '#ddd', width: 40, height: 30, marginTop: 10 }}
                                    value={qty.toString()} placeholder={qty.toString()} />
                                <TouchableOpacity style={{ backgroundColor: 'dodgerblue', width: 25, height: 30, marginTop: 10, marginLeft: 5, alignItems: 'center', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 18 }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: '#000' }}>Total: Rs. 100</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Checkout', {
                            name: name,
                            price: price,
                            qty: qty,
                            product_id: id
                        })
                    }}
                        style={{ backgroundColor: 'dodgerblue', height: 30, marginTop: 10, marginLeft: 5, marginRight: 5, alignItems: 'center', borderRadius: 5 }}>
                        <Text style={{ fontSize: 18 }}> Place Order </Text>
                    </TouchableOpacity>
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
                <Text style={styles.h1}>My Cart ({cart.length})</Text>
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
});

export default Cart;