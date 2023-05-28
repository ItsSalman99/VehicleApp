import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, RefreshControl, View, TouchableOpacity, FlatList } from 'react-native'
import { BASE_URL, getUser } from '../functions';
import ShowAds from '../components/ads/ShowAds';
import { useStore } from 'react-redux';

const NotificationScreen = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const store = useStore();

    const [user, setUser] = useState([]);

    const getData = async () => {
        try {
            let response = await fetch(
                BASE_URL + 'api/notifications'
            );
            let json = await response.json();
            setData(json.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData()
        const check = async () => {
            const user = await getUser();
            setUser(user)
        }

        check();
    }, [10])

    const onRefresh = () => {
        //Clear old data of the list
        setData([]);
        //Call the Service to get the latest data
        getData();
    };


    const Item = ({ title }) => (
        <TouchableOpacity style={styles.notify}>
            <Text style={{ color: '#000' }}>
                {title}
            </Text>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    )

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.h1}>
                    All Notifications
                </Text>
                {
                    user.is_sub == 0 ?
                        <ShowAds/>
                        : ''
                }
            </View>
            <View style={styles.container2}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={isLoading}
                            onRefresh={onRefresh}
                        />
                    }
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        flex: 0.1,
        padding: 20
    },
    h1: {
        color: '#000',
        fontSize: 20,
    },
    container2: {
        flex: 1,
        padding: 20
    },
    notify: {
        color: '#000',
        backgroundColor: '#ddd',
        padding: 20,
        borderRadius: 20,
        margin: 5
    }
});


export default NotificationScreen;
