import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PollDetailScreen = ({ route }) => {
    const { name, description, user } = route.params;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.h1}>
                    {name}
                </Text>
            </View>
            <View style={styles.container2}>
                <TouchableOpacity style={styles.box}>
                    <View>
                        <Text style={{ marginBottom: 20, color: '#006BFF', fontWeight: 'bold' }}> Posted By {user} </Text>
                        <Text style={styles.boxH1}>
                            {name}
                        </Text>
                        <Text style={{ marginVertical: 10 }}>
                            {description}
                        </Text>
                       
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


export default PollDetailScreen;
