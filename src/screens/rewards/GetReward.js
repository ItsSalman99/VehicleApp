import React, { useEffect, useState } from 'react'
import { Button, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Line from '../../components/Line';
import { BASE_URL, getUser } from '../../functions';

const GetReward = ({ navigation, route }) => {

    const { name } = route.params;



    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image resizeMode='center' source={require('../../assets/congrats.png')}
                    style={styles.logo} />
            </View>
            <View style={styles.container2}>
                <View style={styles.buttons}>
                    <Text style={styles.h1}>Congratulations</Text>
                    <Text style={styles.p}>
                        You have successfully recieved a reward!
                    </Text>
                    <View style={styles.reward}>
                        <Text style={styles.p}>
                            {name}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('BottomTab') }}>
                        <Text style={styles.btnTxt}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        flex: 0.8,
        alignItems: 'center'
    },
    logo: {
        width: '50%',
        height: '50%',
        position: 'absolute',
        top: 100,
    },
    container2: {
        flex: 1,
    },
    h1: {
        color: '#000',
        fontSize: 40,
        marginHorizontal: 30,
        marginVertical: 10
    },
    p: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        marginHorizontal: 30,
        marginVertical: 10
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center'
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
        padding: 10,
        alignItems: 'center'
    },
    btn: {
        marginTop: 10,
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

export default GetReward;