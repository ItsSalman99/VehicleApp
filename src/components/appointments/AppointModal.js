import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TouchableHighlight } from "react-native";


const AppointModal = (props) => {

    return (

        <View style={styles.centeredView}>
            <Modal
                animationType="slide"

                transparent={true}
                visible={props.isVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', }}>
                            <View>
                                <Text style={styles.modalText}>Appointment Form</Text>
                            </View>
                            <View>
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                    onPress={props.setModalVisiblity}
                                >
                                    <Text style={styles.textStyle}>Close</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>

    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width: '100%',
        height: '100%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});



export default AppointModal;