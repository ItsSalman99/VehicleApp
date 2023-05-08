import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, RefreshControl } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ServiceCategories from '../../components/ServiceCategories';
import { BASE_URL } from '../../functions';

const ShopScreen = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = () => {
        fetch(BASE_URL+'api/products')
            .then((response) => response.json())
            .then((json) => {
                setData(json.data);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
       
    }

    useEffect(() => {
        getData()
    }, [10]);

    const onRefresh = () => {
        //Clear old data of the list
        setData([]);
        //Call the Service to get the latest data
        getData();
    };

    getData();

    const maxlimit = 40;

    const Item = ({ id, title, img, price, stock, description }) => (
        <View>
            <View >
                <View style={{
                    width: 170, height: 250, padding: 10, borderRadius: 5, margin: 4,
                    borderRadius: 15, borderWidth: 2, borderColor: '#ddd', backgroundColor: '#fff'
                }}>
                    <TouchableOpacity style={{}} onPress={() => {
                        navigation.navigate('ProductDetail', {
                            prodId: id,
                            name: title,
                            img: img,
                            price: price,
                            description: description
                        })
                    }}>
                        <View>
                            <Image source={{ uri: BASE_URL + img }} style={{ width: 100, height: 100, alignSelf: 'center' }} />
                            <Text style={{ color: '#000', textAlign: 'left', paddingVertical: 20, fontSize: 14 }}>
                                {((title).length > maxlimit) ?
                                    (((title).substring(0, maxlimit - 3)) + '...') :
                                    title}
                            </Text>
                            <Text style={{ color: '#000', position: 'relative', bottom: 0, borderRadius: 4, padding: 4, width: '70%', fontSize: 13 }}>{price} Pkr</Text>
                            <Text style={{ color: 'green' }}>{(stock) ? 'in stock' : 'not available'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Poll')} style={{ backgroundColor: '#006BFF', padding: 10, color: '#ffff', borderRadius: 10, marginVertical: 10 }}>
                    <Text style={{ color: '#fff' }}>View More Items</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )

    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.name} description={item.description} img={item.img} price={item.price} stock={item.in_stock} />
    )

    return (
        <View style={styles.container} horizontal={false}>
            <View style={styles.container1}>
                <Text style={styles.h1}>
                    Shop
                </Text>
                <Text style={styles.p}>
                    Buy vehicle items from our sellers
                </Text>
            </View>
            <View style={styles.container2}>
                <FlatList
                    contentContainerStyle={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-start'
                    }}
                    numColumns={2}
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

});


export default ShopScreen;
