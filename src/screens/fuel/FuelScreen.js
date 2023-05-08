import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RefreshControl } from 'react-native';
import { BASE_URL } from '../../functions';

const FuelScreen = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = () => {
        fetch(BASE_URL+'api/fuel/getAll')
            .then((response) => response.json())
            .then((json) => setData(json.fuels))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
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

    const Item = ({ id, title, price, img, description, stime, etime, sdate, edate }) => (
        <TouchableOpacity style={styles.box}>
            <View>
                <Text style={styles.boxH1}>
                    {title}
                </Text>
                <Text>Rs. {price}</Text>
            </View>
            <View>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2311/2311296.png' }}
                    style={{ width: 60, height: 60 }} />
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.name} price={item.price} />
    )

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.h1}>
                    Stuck Due To Fuel?
                </Text>
                <Text style={styles.p}>
                    Don't worry we are at your service.
                    Get your first fuel delivery with zero delivery charges.
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
        width: '90%',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#ddd',
        marginVertical: 20,
        padding: 20
    },
    boxH1: {
        fontSize: 25
    }
});


export default FuelScreen;
