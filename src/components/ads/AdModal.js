import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Modal, View, Text } from 'react-native';

const admodal = ({ isLoad }) => {
    const [open, setOpen] = useState(isLoad);
    const handleClose = () => {
        isLoad = false
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >

            <TouchableOpacity onClick={isLoad}>
                <Text>Ads</Text>

            </TouchableOpacity>
            <View>
                <Text>Ads</Text>

            </View>

        </Modal>

    );
}


export default admodal;
