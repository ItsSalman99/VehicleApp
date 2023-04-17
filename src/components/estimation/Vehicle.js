import React from 'react'

const Vehicle = () => {

    //VEHICLE
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Corolla Xli', value: 'corolla' },
        { label: 'Cultus', value: 'cultus' },
        { label: 'Swift', value: 'swift' },
        { label: 'Mehran', value: 'mehran' },
        { label: 'Honda Civic', value: 'civic' }
    ]);

    // MODEL
    const [isopen, setisOpen] = useState(false);
    const [isvalue, setisValue] = useState(null);
    const [models, setModels] = useState([
        { label: '2022', value: '2022' },
        { label: '2021', value: '2021' },
        { label: '2020', value: '2020' },
        { label: '2019', value: '2019' },
        { label: '2018', value: '2018' }
    ]);
    const FirstRoute = () => (

        <View style={{ flex: 1, backgroundColor: '#fff' }} >

            <View style={{ marginVertical: 20, padding: 10 }}>
                <DropDownPicker
                    style={{marginVertical: 10}}
                    placeholder='Select Vehicle'
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
                <DropDownPicker
                    style={{marginVertical: 10}}
                    placeholder='Select Model'
                    open={isopen}
                    value={isvalue}
                    items={models}
                    setOpen={setisOpen}
                    setValue={setisValue}
                    setItems={setModels}
                />
                <DropDownPicker
                    style={{marginVertical: 10}}
                    placeholder='Select Issue'
                    open={isopen}
                    value={isvalue}
                    items={models}
                    setOpen={setisOpen}
                    setValue={setisValue}
                    setItems={setModels}
                />
                <TouchableOpacity>
                    <Text style={{textAlign: 'center', backgroundColor: '#006BFF', color: '#fff', padding: 20, borderRadius: 10}}>Estimate Now</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

    return (
        <FirstRoute/>
    )

}

export default Vehicle;