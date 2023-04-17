import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


const ShopShow = () => {

    return (
        <View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 5, width: '45%', alignItems: 'center', margin: 4 }}>
                    <TouchableOpacity>
                        <Image source={require('../assets/item.png')} style={{ width: 100, height: 100 }} />
                        <Text style={{ textAlign: 'left' }}>Car HeadLight</Text>
                        <Text>Price . 3000 Pkr</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#fff', borderRadius: 5, width: '45%', alignItems: 'center', margin: 4 }}>
                    <TouchableOpacity>
                        <Image source={require('../assets/item.png')} style={{ width: 100, height: 100 }} />
                        <Text style={{ textAlign: 'left' }}>Car HeadLight</Text>
                        <Text>Price . 3000 Pkr</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 5, width: '45%', alignItems: 'center', margin: 4 }}>
                    <TouchableOpacity>
                        <Image source={require('../assets/item.png')} style={{ width: 100, height: 100 }} />
                        <Text style={{ textAlign: 'left' }}>Car HeadLight</Text>
                        <Text>Price . 3000 Pkr</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#fff', borderRadius: 5, width: '45%', alignItems: 'center', margin: 4 }}>
                    <TouchableOpacity>
                        <Image source={require('../assets/item.png')} style={{ width: 100, height: 100 }} />
                        <Text style={{ textAlign: 'left' }}>Car HeadLight</Text>
                        <Text>Price . 3000 Pkr</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Poll')} style={{backgroundColor: '#006BFF', padding: 10, color: '#ffff', borderRadius: 10, marginVertical: 10}}>
                    <Text style={{color: '#fff'}}>View More Items</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default ShopShow;