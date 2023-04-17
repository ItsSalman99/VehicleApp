import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '../functions';

const PollScreen = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

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

    const onRefresh = () => {
        //Clear old data of the list
        setData([]);
        //Call the Service to get the latest data
        getData();
    };

    const Vote = async (id) => {
        console.log(id);
        fetch(BASE_URL+'api/poll/upVote/' + id)
            .then((response) => response.json())
            .then((json) => {
                Alert.alert(
                    "Voted!",
                    "Voted!",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }


    const Item = ({ id, title, para, uvote, user }) => (
        <View style={{ backgroundColor: '#fff', padding: 12, margin: 10, borderWidth: 1, borderColor: '#DBD8D8', borderRadius: 10 }}>
            <TouchableOpacity style={{ flexDirection: 'row', paddingBottom: 20 }} onPress={() => {
                navigation.navigate('PollDetail', {
                    name: title,
                    description: para,
                    user: user
                })
            }}>
                <FontAwesome name="user-circle-o" size={25} color="dodgerblue" />
                <Text style={{color:'#000'}}> Posted By {user} </Text>
            </TouchableOpacity>
            <Text style={{ color: '#000',fontSize: 26, marginBottom: 5 }}>
                {title}
            </Text>
            <Text style={{ color: '#000',fontSize: 16 }}>
                {para}
            </Text>
            {/* <View style={{alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between', width: '80%' }}>
                    <TouchableOpacity onPress={() => { Vote(id) }}
                        style={{ flexDirection: 'row', borderRightWidth: 1, borderColor: '#ddd', paddingRight: 10 }}>
                        <MaterialIcons name="arrow-circle-up" size={25} color="dodgerblue" />
                        <Text> {uvote} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', borderRightWidth: 1, borderColor: '#ddd', paddingRight: 10, paddingLeft: 10 }}>
                        <MaterialIcons name="arrow-circle-down" size={25} color="dodgerblue" />
                        <Text> 4 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', borderRightWidth: 1, borderColor: '#ddd', paddingRight: 10, paddingLeft: 10 }}>
                        <MaterialIcons name="comment" size={25} color="dodgerblue" />
                        <Text> 4 </Text>
                    </TouchableOpacity>
                </View>
            </View> */}
        </View>
    );

    const renderItem = ({ item }) => (
        <Item id={item.id} title={item.title} para={item.description} uvote={item.upvote} user={item.user.name} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10 }}>
                    <View style={{ padding: 10 }}>
                        <FontAwesome name="pencil" size={35} color="#000" />
                    </View>
                    <View style={{ width: '75%', marginLeft: 20 }}>
                        <TouchableOpacity style={styles.input}
                            onPress={() => { navigation.navigate('AddPoll') }}
                        >
                            <Text style={{color: '#000',}}>What do you want to ask or share?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderColor: '#ddd', padding: 20, borderRadius: 10 }}>
                    <View style={{ width: '50%', justifyContent: 'center', borderRightWidth: 1, borderLeftWidth: 1, flexDirection: 'row' }}>
                        <EvilIcons name="question" size={25} color="#000" />
                        <Text style={{ marginLeft: 4 }}>Ask</Text>
                    </View>
                    <View style={{ width: '50%', justifyContent: 'center', borderRightWidth: 1, flexDirection: 'row' }}>
                        <AntDesign name="message1" size={25} color="#000" />
                        <Text style={{ marginLeft: 4 }}>Questions</Text>
                    </View>
                </View>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    container1: {
        flex: 0.3,
        backgroundColor: '#fff'
    },
    container2: {
        flex: 1
    },
    input: {
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        borderColor: '#ddd',
        backgroundColor: '#eee',
    },
});

export default PollScreen