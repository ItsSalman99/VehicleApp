import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import moment from "moment";
import axios from 'axios';
import AppointModal from '../../components/appointments/AppointModal';
import { BASE_URL, getUser } from '../../functions';


const ViewServiceScreen = ({ route, navigation }) => {

    const { sid, name, img, price, sdate, edate, stime, etime, description } = route.params;

    const [id, setID] = useState('');
    const [user, setUser] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const check = async () => {
            const user = await getUser();
            setUser(user)
        }
        check();
    }, [10])

    const Appoint = () => {
        setLoading(true);
        console.log(sid);
        console.log(name);

        const URL = BASE_URL + "api/service/appoint/" + user.id;
        console.log(URL);
        axios({
            method: 'post',
            responseType: 'json',
            url: URL,
            data: {
                sid
            }
        }).then((res) => {
            console.log(res.data.status);
            console.log(res.data.data);
            if (res.data.status == true) {
                ToastAndroid.show('Logged in successfull!', ToastAndroid.SHORT)
                Alert.alert(
                    "Service has been booked successfully",
                    res.data.message,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => navigation.navigate('MyAppointments') }
                    ]
                );
            }
            else {
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT)

            }
            setLoading(false);
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        (isLoading == true) ? <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View> :
            <ScrollView style={styles.container}>
                <View style={styles.container1}>
                    <Text style={styles.h1}>
                        {name}
                    </Text>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.box}>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ backgroundColor: 'dodgerblue', color: '#fff', borderRadius: 10, textAlign: 'center', width: 120, fontSize: 12, padding: 3 }}>
                                    From: {sdate}
                                </Text>
                                <Text style={{ backgroundColor: 'dodgerblue', color: '#fff', borderRadius: 10, textAlign: 'center', width: 120, fontSize: 12, padding: 3 }}>
                                    To: {edate}
                                </Text>
                            </View>
                            <Image source={{ uri: BASE_URL + img }} style={{ width: '100%', height: 150, resizeMode: 'center', marginTop: 10 }} />
                            <Text style={styles.boxH1}>
                                {name}
                            </Text>
                            <Text style={{ color: '#000' }}>Rs. {price}</Text>
                            <Text style={{ color: '#000', marginVertical: 10 }}>
                                {description}
                            </Text>
                            <Text style={{ color: '#000', marginVertical: 10 }}>
                                Time: {stime} - {etime}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Appoint()
                                    }}
                                    style={styles.btn}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <AntDesign name="checkcircleo" color={'#fff'} size={20} />
                                        <Text style={styles.btnTxt}>Appoint</Text>
                                    </View>
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
        padding: 10
    },
    boxH1: {
        color: '#000',
        fontSize: 25
    },
    btn: {
        backgroundColor: '#006BFF',
        width: 150,
        height: 55,
        borderRadius: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '90%',
        margin: 10,
    },
    btnTxt: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 10
    }

});


export default ViewServiceScreen;
