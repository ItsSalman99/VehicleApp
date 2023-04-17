import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ServiceCategories = () => {

    const DATA = [
        {
            id: '1',
            title: <Ionicons name="car" size={22} color="#000" />,
        },
        {
            id: '2',
            title: <MaterialCommunityIcons name="bike" size={22} color="#000" />,
        },
        {
            id: '3',
            title: <MaterialCommunityIcons name="tools" size={22} color="#000" />,
        },
        {
            id: '4',
            title: <MaterialCommunityIcons name="shower-head" size={22} color="#000" />,
        },
        {
            id: '5',
            title: <MaterialCommunityIcons name="gas-station" size={22} color="#000" />,
        },
        {
            id: '6',
            title: <MaterialCommunityIcons name="shower-head" size={22} color="#000" />,
        },
    ];

    const Item = ({ title }) => (
        <View style={styles.item}>
            <TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <FlatList
            horizontal
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{ padding: 10 }}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 30,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
    },
});


export default ServiceCategories;