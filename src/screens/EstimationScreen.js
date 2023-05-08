import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, useWindowDimensions, TextInput, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../functions';

const EstimationScreen = () => {
    //VEHICLE


    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [vehicle, setVehicle] = React.useState("");
    const [vehicles, setVehicles] = React.useState([]);
    const [model, setModel] = React.useState();
    const [models, setModels] = React.useState([]);
    const [issue, setIssue] = React.useState("");
    const [issues, setIssues] = React.useState([]);



    const getData = () => {
        fetch(BASE_URL+'api/vehicles/models/getAll')
            .then((response) => response.json())
            .then((json) => {
                setModels(json.models);
                console.log(models);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        fetch(BASE_URL+'api/vehicles/getAll')
            .then((response) => response.json())
            .then((json) => {
                setVehicles(json.vehicles);
                console.log(vehicles);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        fetch(BASE_URL+'api/vehicles/issues/getAll')
            .then((response) => response.json())
            .then((json) => {
                setIssues(json.issues);
                console.log(issues);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }


    useEffect(() => {
        getData()
    }, [100]);

    getData()

    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 0.2, backgroundColor: '#006BFF', }}>
                <Text style={{ fontSize: 25, color: '#fff', marginHorizontal: 30, marginVertical: 40 }}>Get Estimation</Text>
            </View>
            <View style={{ flex: 1, }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} >

                    <View style={{ marginVertical: 20, padding: 10 }}>
                        <View><Text style={{ marginVertical: 2, color: '#000' }}>Select Vehicles</Text></View>
                        <SelectList
                            setSelected={(val) => setVehicle(val)}
                            data={vehicles}
                            save="value"
                            inputStyles={{color: '#000',}}
                            dropdownStyles={{color: '#000'}}
                            dropdownItemStyles={{color: '#000'}}
                            dropdownTextStyles={{color: '#000'}}
                        />
                        <View><Text style={{ marginVertical: 2, color: '#000' }}>Select Models</Text></View>
                        <SelectList
                            setSelected={(val) => setModel(val)}
                            data={models}
                            save="value"
                            inputStyles={{color: '#000',}}
                            dropdownStyles={{color: '#000'}}
                            dropdownItemStyles={{color: '#000'}}
                            dropdownTextStyles={{color: '#000'}}
                        />
                        <View><Text style={{ marginVertical: 2, color: '#000' }}>Select Issue</Text></View>
                        <SelectList
                            setSelected={(val) => setIssue(val)}
                            data={issues}
                            save="value"
                            inputStyles={{color: '#000',}}
                            dropdownStyles={{color: '#000'}}
                            dropdownItemStyles={{color: '#000'}}
                            dropdownTextStyles={{color: '#000'}}
                        />
                        <TouchableOpacity style={{ marginVertical: 10 }}
                            onPress={() => {
                                navigation.navigate('ViewEstimate', {
                                    title: issue,
                                    min: 500,
                                    max: 3000,
                                    vehicle: vehicle,
                                    model: model,
                                    service: issue
                                })
                            }}>
                            <Text style={{ textAlign: 'center', backgroundColor: '#006BFF', color: '#fff', padding: 20, borderRadius: 10 }}>Estimate Now</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>

        </View>
    )
}

export default EstimationScreen;