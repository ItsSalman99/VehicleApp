import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Line from "../../components/Line";
import { Formik } from "formik";
import * as Yup from 'yup';

const SubscriptionForm = () => {

    const CardScheme = Yup.object().shape({
        card: Yup.string().required('Please enter card numberr!'),
        name: Yup.string().required('Please enter your name!'),
        cvv: Yup.string().required('Please enter your cvv!').min(3).max(4),
        // terms: Yup.bool() // use bool instead of boolean
        //     .oneOf([true], "You must accept the terms and conditions")
    });

    return (
        <View style={styles.container1}>
            <View style={{ padding: 20 }}>
                <TouchableOpacity style={{ alignItems: 'center', marginBottom: 40 }}>
                    <Text>
                        <Fontisto name="credit-card" size={150} color="#000" />
                    </Text>
                </TouchableOpacity>
                <Line />
                <Formik initialValues={{ card: '', name: '', cvv: '' }}
                    validationSchema={CardScheme}
                    onSubmit={(values, { resetForm }) => {
                        registerUser(values.card, values.name, values.cvv, type)
                        resetForm({ values: '' })
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                        <View>
                            {errors.card && touched.card ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.card}</Text> : null}
                            <TextInput style={styles.formInput} placeholder="Card Number"
                                onChangeText={handleChange('card')}
                                onBlur={handleBlur('card')}
                                value={values.card}
                            />
                            {errors.name && touched.name ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.name}</Text> : null}
                            <TextInput style={styles.formInput} placeholder="Name"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            {errors.cvv && touched.cvv ? <Text style={{ fontSize: 12, color: 'red', top: 8 }}>{errors.cvv}</Text> : null}
                            <TextInput style={styles.formInput} placeholder="cvv"
                                onChangeText={handleChange('cvv')}
                                onBlur={handleBlur('cvv')}
                                value={values.cvv}
                            />
                            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                <Text style={styles.btnTxt}>Subscribe</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container1: {
        flex: 1
    },
    formInput: {
        height: 55,
        borderWidth: 1,
        borderColor: '#9A9797',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10
    },
    btn: {
        width: '100%',
        height: 59,
        backgroundColor: '#006BFF',
        borderRadius: 18,
        textAlign: 'center',
    },
    btnTxt: {
        top: 10,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
    }
});

export default SubscriptionForm;