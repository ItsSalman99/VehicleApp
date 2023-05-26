import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Modal, View, Text, StyleSheet } from 'react-native';

const ShowAds = ({ isLoad }) => {
    return (
        <View style={{alignItems: 'center'}}>
            <View style={styles.container}>
                <View style={styles.ads}>
                    <Text>
                        Ads
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%'
    },
    ads: {
        padding: 10,
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: '#006BFF',
        borderRadius: 5
    }
})


export default ShowAds;
