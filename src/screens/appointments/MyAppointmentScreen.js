import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAppointmentScreen = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [id, setID] = useState(0);

    const getData = async () => {
        // try {
        //     const value = await AsyncStorage.getItem('userId');
        //     // console.log('id : '+value);
        //     setID(value);
        //     // console.log(value);
        // } catch (e) {
        //     // error reading value
        // }
    }

    useEffect(() => {
        getData();
        getAppoint();
        // console.log(data);
    }, []);

    
    const getAppoint = () => {
        
        getData();
        // console.log(id);
        fetch('http://172.15.2.113:8000/api/user/get-appointments/' + id)
            .then((response) => response.json())
            .then((json) => {
                setData(json.data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    getAppoint();

    const onRefresh = () => {
        //Clear old data of the list
        setData([]);
        //Call the Service to get the latest data
        getData();
        getAppoint();
    };

    const Item = ({ title, price, img }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('ViewAppointments', {
                title: title,
                price: price,
                img: img
            })
        }} style={styles.box}>
            <View>
                <Text style={{ backgroundColor: 'dodgerblue', color: '#fff', borderRadius: 10, textAlign: 'center', width: 90, fontSize: 12 }}>
                    In-Porgress
                </Text>
                <Text style={styles.boxH1}>
                    {title}
                </Text>
                <Text>Rs. {price}</Text>
            </View>
            <View>
                <Image source={{ uri: 'http://172.15.2.113:8000/' + img }}
                    style={{ width: 60, height: 60 }} />
                {/* <AntDesign name="home" size={40} color="#000" /> */}
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => (
        <Item title={item.service.name} price={item.service.price} img={item.img} />
    )

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.h1}>
                    My Appointments
                </Text>
                <Text style={styles.p}>
                    Services that you have appoint!
                </Text>
            </View>
            <View style={styles.container2}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={isLoading}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container1: {
        flex: 0.3,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: 300,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#ddd',
        marginVertical: 20,
        padding: 30
    },
    boxH1: {
        fontSize: 25
    }
});


export default MyAppointmentScreen;
