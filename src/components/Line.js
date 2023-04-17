import React from "react";
import { StyleSheet, Text, View } from "react-native";


const Line = () => {
    return (
        <View style={{width: '100%', alignItems: 'center'}}>
            <View style={styles.container}>
                <Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '90%',
        height: 2,
        backgroundColor: '#DBD8D8',
        borderRadius: 20
    }, 
})

export default Line;