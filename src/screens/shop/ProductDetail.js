import React from 'react'
import { Alert, ToastAndroid } from 'react-native';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useStore } from 'react-redux';
import { BASE_URL, getUser } from '../../functions';
import { addtocart } from '../../store/actions/actions';

const ProductDetail = ({ route, navigation }) => {

    const { prodId, name, img, price, description } = route.params;

    const store = useStore();
    const dispatch = useDispatch();

    const AddToCart = async () => {

        const cart = [{
            'user_id': await getUser().id,
            'product_id': prodId,
            'name': name,
            'img': img,
            'price': price,
            'qty': 1
        }]

        dispatch(addtocart(cart))

        if (store.getState().cart != undefined) {
            ToastAndroid.show('Product has been added to cart!', ToastAndroid.SHORT)
            Alert.alert(
                "Success",
                "Product has been added to your cart!",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => { navigation.navigate('CartScreen') } }
                ]
            );
            console.log(store.getState().cart);
        }


    }

    return (
        <ScrollView style={styles.container}>
            <View >
                <Image source={{ uri: BASE_URL + img }}
                    style={{ width: '100%', height: 300, borderBottomRightRadius: 90, borderBottomLeftRadius: 90, borderWidth: 1, borderColor: '#ddd' }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <Text style={{ color: '#000', fontSize: 28 }}>
                    {name}
                </Text>
                <Text style={{ color: '#000', fontSize: 20, marginTop: 10, marginRight: 10 }}>
                    Rs{price} Pkr
                </Text>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ color: '#000', fontSize: 18 }}>
                    Summary:
                </Text>
                <Text style={{ color: '#000', fontSize: 12 }}>
                    {description}
                </Text>
            </View>
            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} keyboardType='numeric'>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    AddToCart()
                }}>
                    <Text style={styles.btnTxt}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#006BFF',
        height: 55,
        borderRadius: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: 10,
    },
    btnTxt: {
        color: '#fff',
        fontSize: 20
    }
});

export default ProductDetail;