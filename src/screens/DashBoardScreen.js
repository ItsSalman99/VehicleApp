import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { useStore } from 'react-redux';
import ImageSlider from '../components/ImageSlider';
import Line from '../components/Line';
import ServiceSlider from '../components/ServicesSlider';
import ShortcutScreen from '../components/ShortcutScreen';
import { getUser } from '../functions';
import AdModal from '../components/ads/AdModal';
import ShowAds from '../components/ads/ShowAds';


const DashBoardScreen = ({ navigation }) => {

    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        getData();
        console.log('done');
        setIsRefreshing(true);
        await handleFetchPalettes();
        setIsRefreshing(false);
    }, [10]);

    const maxlimit = 14;

    const store = useStore();

    const [user, setUser] = useState([]);

    useEffect(() => {
        const check = async () => {
            const user = await getUser();
            setUser(user)
            if (user != null) {
                console.log('user');
                navigation.navigate('BottomTab')
            }
        }
        
        check();
    }, [10])



    return (
        <ScrollView
            horizontal={false}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => { handleRefresh }} />}
            style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.toptext} numberOfLines={1}>
                    Hello ,{user.name}
                </Text>
                <Text style={styles.topmsg}>
                    Welcome to your dashboard!
                </Text>
            </View>
            <View style={styles.container}>
                <ImageSlider isLoad={true} />
                <Line />
                <ShortcutScreen />
                {
                    user.is_sub == 0 ? 
                    <ShowAds/>
                    : ''
                }
                <ServiceSlider />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container1: {
        flex: 0.4,
        backgroundColor: '#006BFF',
    },
    container2: {
        flex: 1
    },
    toptext: {
        color: '#fff',
        left: 25,
        fontSize: 25,
        fontWeight: 'normal',
        lineHeight: 67,
        letterSpacing: -0.017,
        display: 'flex',
        alignItems: 'center'
    },
    topmsg: {
        color: '#fff',
        left: 20,
        fontSize: 20,
        fontWeight: 'normal',
        lineHeight: 67,
        letterSpacing: -0.017,
        display: 'flex',
        alignItems: 'center'
    },
    image: {
        position: 'absolute',
        width: 200,
        height: 200,
        top: 300,
        left: 80
    },
    midText: {
        position: 'absolute',
        width: 300,
        left: 23,
        top: 530,
        fontSize: 16,
        lineHeight: 19,
        display: 'flex',
        alignItems: 'center',
        letterSpacing: -0.017,
        color: '#000000',
    },
    btn: {
        position: 'absolute',
        width: 300,
        height: 59,
        left: 30,
        top: 630,
        backgroundColor: '#FF6347',
        borderRadius: 18,
        textAlign: 'center'
    },
    btnTxt: {
        top: 10,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
    },
    btn2: {
        position: 'absolute',
        width: 300,
        height: 59,
        left: 30,
        top: 700,
        backgroundColor: '#FF6347',
        borderRadius: 18,
        textAlign: 'center'
    }
});


export default DashBoardScreen;