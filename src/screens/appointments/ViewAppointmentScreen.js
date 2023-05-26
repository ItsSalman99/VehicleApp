import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BASE_URL } from '../../functions';

const ViewAppointmentScreen = ({ route }) => {

    const { title, price, img } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.h1}>
                    {title}
                </Text>
            </View>
            <View style={styles.container2}>
                <TouchableOpacity style={styles.box}>
                    <View>
                        <Image source={{ uri: BASE_URL + img }} style={{ width: '100%', height: 150, resizeMode: 'center' }} />
                        <Text style={styles.boxH1}>
                            {title}
                        </Text>
                        <Text>Rs. {price}</Text>
                        <Text style={{ marginVertical: 10 }}>
                            Your car will be inspected by our staffs at a very low cost and available time.
                        </Text>
                        <Text style={{ marginVertical: 10 }}>
                            Time: 8:00 - 10:00
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ backgroundColor: 'dodgerblue', color: '#fff', borderRadius: 10, textAlign: 'center', width: 90, fontSize: 12 }}>
                                In-Progress
                            </Text>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <AntDesign name="closesquareo" color={'red'} size={20} />
                                <Text style={{ marginHorizontal: 10 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
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


export default ViewAppointmentScreen;
