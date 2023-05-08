import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from '../../functions';

const ViewEstimate = ({ navigation, route }) => {

    const { title, min, max, vehicle, model, service } = route.params;
    const [isLoading, setLoading] = useState(true);

    const checkData = () => {
        if (title == "" || min == "" || max == "" || vehicle == "" || model == "" || service == "") {
            navigation.navigate('Estimation')
        }
    }


    const [estimation, setEstimation] = useState("");
    const [minest, setMnEst] = useState(0);
    const [maxest, setMxEst] = useState(0);

    const getData = () => {
        const url = BASE_URL+'api/estimation/service/' + vehicle + '/' + model + '/' + service;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                setEstimation(json.estimations);
                console.log(estimation.min_est);
                setMnEst(estimation.min_est);
                setMxEst(estimation.max_est);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }


    getData()
    // useEffect(() => {
        
    // }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.h1}>
                    {title} Estimate
                </Text>
            </View>
            <View style={styles.container2}>
                <TouchableOpacity style={styles.box}>
                    <View>
                        <Text style={styles.boxH1}>
                            {service} Estimate
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                            <Text style={{color: '#000'}}> 
                                Min. {min}
                            </Text>
                            <Text style={{color: '#000'}}>
                                Max. {max}
                            </Text>
                        </View>
                        <Text style={{color: '#000'}}>Rs. {min}   to   Rs. {max}</Text>
                        <Text style={{ marginVertical: 5, color: '#000' }}>
                            Vehicle : {vehicle}
                        </Text>
                        <Text style={{ marginVertical: 5,color: '#000' }}>
                            Model : {model}
                        </Text>
                        <Text style={{ marginVertical: 5,color: '#000' }}>
                            Service/Issue : {service}
                        </Text>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <AntDesign name="closesquareo" color={'red'} size={20} />
                                <Text style={{ marginHorizontal: 10 }}>Cancel</Text>
                            </TouchableOpacity>
                        </View> */}
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
        color: '#000',
        fontSize: 25
    }
});


export default ViewEstimate;
