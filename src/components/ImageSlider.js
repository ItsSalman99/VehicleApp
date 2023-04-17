import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { BASE_URL } from '../functions';

const ImageSlider = ({ isLoad }) => {


    const { width } = Dimensions.get('window');

    const [data, setData] = useState([]);

    const [isLoading, setLoading] = useState(isLoad);

    const getData = async () => {
        try {
            let response = await fetch(
                BASE_URL+'api/slider/getAll'
            );
            let json = await response.json();
            // console.log(json.data);
            setData(json.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData()
    });
    // getData();

    const handleRefresh = () => {
        //Clear old data of the list
        setData([]);
        //Call the Service to get the latest data
        getData();
        setLoading(false);
    };


    const Item = ({ image }) => (
        <View style={styles.item}>
            <Image source={{ uri: image }} style={{
                width: '100%', height: 180,
                borderRadius: 10,
                alignSelf: 'center'
            }} />
        </View>
    );

    const renderItem = ({ item }) => (
        <Item image={item.img} />
    );

    return (
        <View>
            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => { handleRefresh }} />}
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
        width: 350,
        marginBottom: 5,
        padding: 10,
    },
    title: {
        fontSize: 22,
        marginBottom: 10,
    },
});


export default ImageSlider;
