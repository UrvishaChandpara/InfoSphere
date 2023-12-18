import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView,ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { colors } from '../../theme/colors';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { addSubService, handleError, updateSubService } from '../../services/Sub Service/action'

const SubServiceModal = (props) => {
    const { isVisible, onPress, buttonText, sub_service_id, sub_service_name, service_id, token } = props
    const dispatch = useDispatch()
    const [subService, setSubService] = useState();
    const [subServiceError, setSubServiceError] = useState('');
    const [triggerEffect, setTriggerEffect] = useState(false);
    const result = useSelector(state => state.SubServiceReducer)


    useEffect(() => {
        setSubService('');
        setSubServiceError('');
        setTriggerEffect(false);

        if (isVisible) {
            setSubService(sub_service_name)
        }
        else {
            dispatch(handleError())
        }
    }, [isVisible]);

    useEffect(() => {
        if (result.isRegistered) {
            onPress()
        }
        else {
            if (result.error_type == 'subservice') {
                setSubServiceError('This Sub Service alredy exist.');
            }
            else if (result.error_type == 'Not Found') {
                setSubServiceError('Service not found')
            }

            if (triggerEffect) {
                setTriggerEffect(false)
            }
        }
    }, [result.isRegistered, result.error_type, triggerEffect])


    const handleSubmmit = async () => {
        var subServiceValid = false;
        if (subService.length == 0) {
            setSubServiceError("Please enter sub service name");
        }
        else {
            setSubServiceError('');
            subServiceValid = true;
        }

        if (subServiceValid) {
            if (buttonText == 'Add') {
                dispatch(addSubService({ data: { sub_service_name: subService, service_id: service_id }, token: token }))
                setTriggerEffect(true);
            }
            else if (buttonText == 'Edit') {
                dispatch(updateSubService({ data: { sub_service_name: subService, service_id: service_id, sub_service_id}, token: token }))
                setTriggerEffect(true);
            }
        }
    }


    return (
        <Modal animationType="slide"
            isVisible={isVisible}>
                <SafeAreaView style={styles.modal}>
                    <TouchableOpacity style={{ position: "absolute", marginLeft: '91%', marginTop: '5%' }}
                        onPress={onPress}>
                        <AntDesign name="closecircleo" size={17} color={colors.blueShade1} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Sub Service Name:</Text>
                    <TextInput
                        placeholder="Enter sub service name"
                        keyboardType="default"
                        style={styles.feildbox}
                        defaultValue={sub_service_name}
                        onChangeText={(text) => { setSubService(text) }}
                    />
                    {subServiceError.length > 0 &&
                        <Text style={styles.error}>{subServiceError}</Text>
                    }
                    <TouchableOpacity style={styles.confirmbtn}
                        onPress={handleSubmmit}
                        disabled={result.isLoadingButton}>
                            {
                            result.isLoadingButton ? (<ActivityIndicator size={25} color={colors.white} style={styles.loading} />) : (
                                <Text style={styles.confirmtxt}>{buttonText} Sub Service</Text>
                            )
                        }
                        
                    </TouchableOpacity>
                </SafeAreaView>
        </Modal>
    )
}

export default SubServiceModal

const styles = StyleSheet.create({

    text: {
        textAlign: "left",
        marginLeft: '2%',
        margin: '1%',
        fontFamily: Platform.select({ android: 'serif' }),
        fontSize: 12,
        color: colors.greyShade3,
        fontWeight: '800',
        marginLeft: '5%',
        marginTop: '12%' 
    },
    feildbox: {
        backgroundColor: colors.white,
        borderColor: colors.blueShade1,
        borderWidth: 1,
        marginLeft: '5%',
        marginRight: '5%',
        fontFamily: Platform.select({ android: 'serif' }),
        padding: Platform.select({ ios: '3%' }),
        paddingLeft: Platform.select({ android: '3%' }),
        fontSize: 12,
        color: colors.greyShade2,
        borderRadius: 5
    },
    confirmbtn: {
        backgroundColor: colors.blueShade1,
        marginTop: '7%',
        marginBottom: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 5
    },
    confirmtxt: {
        color: colors.white,
        fontFamily: Platform.select({ android: 'serif' }),
        textAlign: "center",
        margin: '2.5%',
        fontSize: 17,
    },
    modal: {
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    error: {
        fontFamily: Platform.select({ android: 'serif' }),
        color: colors.red,
        textAlign: 'right',
        marginRight: '5%',
        marginLeft: '2%'
    },
    loading:{
        margin: '2.5%'
    }
});