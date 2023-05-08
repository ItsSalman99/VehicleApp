import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BASE_URL } from '../functions';

const LatestPolls = () => {

    const [data, setData] = useState([]);
    const [isLoading ,setLoading] = useState(true);

    const getData = () => {
        fetch(BASE_URL+'api/poll/getAll')
            .then((response) => response.json())
            .then((json) => setData(json.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getData()
    }, []);

    const Item = ({ title, para }) => (
        <View style={styles.item}>
            <Text style={{ fontSize: 20}}>
                {title}
            </Text>
            <Text numberOfLines={4}>
                {para}
            </Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} para={item.description} />
    );

    return (
        <View>
            <View style={{marginLeft: 20}}>
                <Text style={{fontSize: 20}}>Polls</Text>
            </View>
            <FlatList 
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
        padding: 15,
        borderRadius: 30,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: '#ddd'
    },
    title: {
        fontSize: 18,
    },
});


export default LatestPolls;
