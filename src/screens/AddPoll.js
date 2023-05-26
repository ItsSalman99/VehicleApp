import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Yup from 'yup';
import { BASE_URL, getUser } from '../functions';




const AddPoll = () => {

    const PollSchema = Yup.object().shape({
        title: Yup.string().required('Please give it a nice title*'),
        content: Yup.string().min(20, 'minimum of 50 words')
            .required('Please enter content*'),
    });

    const [user, setUser] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const check = async () => {
            const user = await getUser();
            setUser(user)
            console.log(user != null);
        }
        check();
    }, [10])

    const storePoll = async (title, content) => {
        setLoading(true);
        var uid = user.id;
        console.log(title + ' ' + content + ' ' + uid);
        axios({
            method: 'post',
            responseType: 'json',
            url: BASE_URL + "api/poll/store",
            data: {
                title,
                content,
                uid
            }
        }).then((res) => {
            console.log(res.data);
            if (res.data.status == true) {
                ToastAndroid.show('New Poll Created Successfully!', ToastAndroid.SHORT)
                setLoading(false);
            } else if (res.data.status == false) {
                ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT)
                setLoading(false);
            }
        }).catch((e) => {
            console.log(e);
        });
        setLoading(false);
    }

    return ((isLoading == true) ? <View style={styles.loading}>
        <ActivityIndicator size="large" />
    </View> :
        <View style={styles.container}>
            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 20, color: '#000' }}>
                    Create a new poll
                </Text>
                <Text style={{ fontSize: 14, color: '#000' }}>
                    Create a poll by sharing your thaught, knowledge or ask questions so others can give answers and
                    support your taught.
                </Text>
            </View>
            <Formik initialValues={{ title: '', content: '' }}
                validationSchema={PollSchema}
                onSubmit={(values, { resetForm }) => {
                    storePoll(values.title, values.content)
                    resetForm()
                }
                }
            >
                {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                    <View style={{ alignItems: 'center' }}>
                        {errors.title && touched.title ? <Text style={{ fontSize: 12, alignSelf: 'flex-start', marginLeft: 15, color: 'red', top: 8 }}>{errors.title}</Text> : null}
                        <TextInput style={styles.formInput} placeholder="Give it a title?"
                            onChangeText={handleChange('title')}
                            onBlur={handleBlur('title')}
                            value={values.title}
                            placeholderTextColor="#000"
                            color="#000"
                        />
                        {errors.content && touched.content ? <Text style={{ fontSize: 12, alignSelf: 'flex-start', marginLeft: 15, color: 'red', top: 8 }}>{errors.content}</Text> : null}
                        <TextInput style={styles.formInput2} placeholder="What is on your mind?"
                            onChangeText={handleChange('content')}
                            onBlur={handleBlur('content')}
                            value={values.content}
                            placeholderTextColor="#000"
                            multiline={true}
                            color="#000"
                        />
                        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                            <Text style={styles.btnTxt}>
                                Publish Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formInput: {
        width: '95%',
        height: 55,
        backgroundColor: '#eee',
        borderWidth: 0.2,
        borderRadius: 5,
        padding: 10,
        marginTop: 20
    },
    formInput2: {
        width: '95%',
        height: 120,
        backgroundColor: '#eee',
        borderWidth: 0.2,
        borderRadius: 5,
        padding: 10,
        marginTop: 20
    },
    btn: {
        marginTop: 40,
        width: 300,
        height: 55,
        backgroundColor: '#006BFF',
        borderRadius: 18,
        textAlign: 'center',
    },
    btnTxt: {
        top: 10,
        fontSize: 22,
        textAlign: 'center',
        color: '#fff',
    }
});

export default AddPoll;