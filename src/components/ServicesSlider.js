import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../functions';

const ServiceSlider = () => {

    const navigation = useNavigation();
    const [data, setData] = useState([]);

    const getData = async () => {

        try {
            let response = await fetch(
                BASE_URL+'api/services/getAll'
            );
            let json = await response.json();
            setData(json.services);
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


    const Item = ({ id, title, price, img, summary, description, stime, etime, sdate, edate }) => (
        <TouchableOpacity style={styles.item} onPress={() => {
            navigation.navigate('ViewService', {
                sid: id,
                name: title,
                price: price,
                img: img,
                description: description,
                stime: stime,
                etime: etime,
                sdate: sdate,
                edate: edate
            })
        }}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Image source={{ uri: BASE_URL + img }} style={{ width: 70, height: 70 }} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={{ width: 200, color: '#000' }} numberOfLines={3}>
                        {description}
                    </Text>
                    <Text style={{ color: '#000', marginTop: 20, width: '40%', borderRadius: 20, padding: 5 }}>
                        Pkr. {price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Item title={item.name} summary={item.summary} price={item.price} img={item.img} description={item.description}
            stime={item.available_stime} etime={item.available_etime} sdate={item.start_available_date}
            edate={item.end_available_date} />
    );

    getData();

    return (
        <View>
            <View style={{ marginLeft: 20, marginTop: 30 }}>
                <Text style={{ fontSize: 20 }}>Services</Text>
            </View>
            <FlatList
                nestedScrollEnabled
                horizontal
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}

            />
        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        width: 330,
        backgroundColor: '#fff',
        borderRadius: 30,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: '#ddd'
    },
    title: {
        color: '#000',
        fontSize: 22,
        marginBottom: 10,
    },
});


export default ServiceSlider;
