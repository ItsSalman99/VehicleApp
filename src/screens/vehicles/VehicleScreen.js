import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ServiceCategories from '../../components/ServiceCategories';

const VehicleScreen = () => {

    const vehicles = [
        {
            id: '1',
            title: 'Suzuki Wagon',
            price: '23.7 Lac',
            img: 'https://cache3.pakwheels.com/ad_pictures/7659/suzuki-wagon-r-vxl-2021-76590373.webp'
        },
        {
            id: '2',
            title: 'Toyota Yaris 2022',
            price: '23.7 Lac',
            img: 'https://cache1.pakwheels.com/ad_pictures/7440/Slide_toyota-yaris-ativ-x-cvt-1-5-2021-74401319.jpg'
        },
    ];

    const Item = ({ title, img, price }) => (
        <TouchableOpacity style={styles.box}>
            <View>
                <Image source={{ uri: img }} style={{
                    width: '100%', height: 150,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }} />
                <Text style={styles.boxH1}>
                    {title}
                </Text>
                <Text style={styles.price}>Rs. {price}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => (
        <Item title={item.title} price={item.price} img={item.img} />
    )

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.h1}>
                    Vehicles
                </Text>
            </View>
            <View style={styles.container2}>
                <FlatList
                    data={vehicles}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container1: {
        flex: 0.2,
        backgroundColor: '#006BFF',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        padding: 30,

    },
    container2: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center'
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
        alignSelf: 'center',
        width: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#ddd',
        marginVertical: 20,
    },
    boxH1: {
        fontSize: 25,
        padding: 20
    },
    price:{
        fontSize: 12,
        backgroundColor: 'dodgerblue',
        color: '#fff',
        borderRadius: 10,
        padding: 6,
        marginHorizontal: 20,
        marginBottom: 10,
        width: 130,
        textAlign: 'center',
    }
});


export default VehicleScreen;
