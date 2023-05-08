import React, { useEffect, useState } from 'react'
import { Button, FlatList, RefreshControl, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Line from '../../components/Line';
import { BASE_URL, getUser } from '../../functions';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/actions';


const RewardScreen = () => {

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    
    useEffect(() => {
        const check = async () => {
            const user = await getUser();
            setUser(user)
        }
        check();
    }, [navigation]);

    const shuffle = () => {
        axios({
            method: 'get',
            responseType: 'json',
            url: BASE_URL + "api/rewards/shuffle/"+ user.id,
        }).then((res) => {
            console.log(res.data);
            if(res.data.status == false)
            {
                ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
            }
            else if(res.data.status == true)
            {
                console.log(res.data.name);
                dispatch(login(res.data.user))
                ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
                navigation.navigate('GetReward', {
                    name: res.data.name
                })
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        (user.is_rewarded == 0) ?
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={{ fontSize: 16 }}>
                        Get daily rewards, discounts and cash backs that can be used on your purchase.
                    </Text>
                </View>
                <Line />
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        shuffle()
                    }}>
                        <Text style={styles.btnTxt}>Shuffle</Text>
                    </TouchableOpacity>
                </View>
            </View>
            :
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={{ fontSize: 16 }}>
                        Get daily rewards, discounts and cash backs that can be used on your purchase.
                    </Text>
                </View>
                <Line />
                <View>
                    <Text style={{ fontSize: 24 }}>
                        You have reached your daily limit!
                    </Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        padding: 20
    },
    rewardBox: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 8,
        margin: 8
    },
    reward: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#ddd',
        padding: 20,
        width: 150,
        alignItems: 'center'
    },
    btn: {
        width: 300,
        height: 55,
        backgroundColor: '#006BFF',
        borderRadius: 18,
        textAlign: 'center',
    },
    btnTxt: {
        color: '#000',
        top: 10,
        fontSize: 22,
        textAlign: 'center',
        color: '#fff',
    },
})

export default RewardScreen;