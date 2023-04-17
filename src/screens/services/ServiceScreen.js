import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RefreshControl } from 'react-native';
import { BASE_URL } from '../../functions';

const ServiceScreen = ({navigation}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            let response = await fetch(
                BASE_URL + 'api/services/getAll'
            );
            let json = await response.json();
            setData(json.services);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData()
    }, []);

    const onRefresh = () => {
        //Clear old data of the list
        setData([]);
        //Call the Service to get the latest data
        getData();
    };
    getData();
    const Item = ({ Id, title, price, img, description, stime, etime, sdate, edate }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('ViewService', {
                sid: Id,
                name: title,
                price: price,
                img: img,
                description: description,
                stime: stime,
                etime: etime,
                sdate: sdate,
                edate: edate
            })
        }} style={styles.box}>
            <View>
                <Text style={styles.boxH1}>
                    {title}
                </Text>
                <Text style={{color: '#000'}}>Rs. {price}</Text>
            </View>
            <View>
                <Image source={{ uri: BASE_URL + img }}
                    style={{ width: 60, height: 60 }} />
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => (
        <Item Id={item.id} title={item.name} price={item.price} img={item.img} description={item.description} 
        stime={item.available_stime} etime={item.available_etime} sdate={item.start_available_date} 
        edate={item.end_available_date} />
    )

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.h1}>
                    Service Screen
                </Text>
                <Text style={styles.p}>
                    Appoint any service and get to
                    your doorsteps
                </Text>
            </View>
            <View style={styles.container2}>
                <FlatList
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '90%',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#ddd',
        marginVertical: 20,
        padding: 20
    },
    boxH1: {
        color: '#000',
        fontSize: 25
    }
});


export default ServiceScreen;
