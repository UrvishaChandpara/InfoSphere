import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView ,ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { colors } from '../../theme/colors';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addService, updateService, handleError } from '../../services/Service/action';

const ServiceModal = (props) => {
    const { isVisible, onPress, buttonText, service_id, service_name, register_customer_id, token } = props
    const dispatch = useDispatch()
    const [service, setService] = useState();
    const [serviceError, setServiceError] = useState('');
    const [triggerEffect, setTriggerEffect] = useState(false);
    const result = useSelector(state => state.ServiceReducer)


    useEffect(() => {
        setService('');
        setServiceError('');
        setTriggerEffect(false);
        if (isVisible) {
            setService(service_name)
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
            if (result.error_type == 'service') {
                setServiceError('This Service alredy exist.');
            }
            else if (result.error_type == 'register_customer') {
                setServiceError('Register Customer Not Found')
            }
            else if (result.error_type == 'Not Found') {
                setServiceError('Service not found')
            }

            if (triggerEffect) {
                setTriggerEffect(false)
            }
        }
    }, [result.isRegistered, result.error_type, triggerEffect])


    const handleSubmmit = async () => {
        var serviceValid = false;
        if (service.length == 0) {
            setServiceError("Please enter service name");
        }
        else {
            setServiceError('');
            serviceValid = true;
        }

        if (serviceValid) {
            if (buttonText == 'Add') {
                dispatch(addService({ data: { service_name: service, register_customer_id: register_customer_id }, token: token }))
                setTriggerEffect(true);
            }
            else if (buttonText == 'Edit') {
                dispatch(updateService({ data: { service_name: service, register_customer_id: register_customer_id , service_id}, token: token }))
                setTriggerEffect(true);
            }
        }
    }
    return (
        <Modal animationType="slide"
            isVisible={isVisible}>
                <SafeAreaView style={styles.modal}>
                    <TouchableOpacity style={styles.closeButton}
                        onPress={onPress}>
                        <AntDesign name="closecircleo" size={17} color={colors.blueShade1} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Main Service Name:</Text>
                    <TextInput
                        placeholder="Enter main service name"
                        keyboardType="default"
                        style={styles.feildbox}
                        defaultValue={service_name}
                        onChangeText={(text) => { setService(text) }}
                    />
                    {serviceError.length > 0 &&
                        <Text style={styles.error}>{serviceError}</Text>
                    }
                    <TouchableOpacity style={styles.confirmbtn}
                        onPress={handleSubmmit}
                        disabled={result.isLoadingButton}>
                        {
                            result.isLoadingButton ? (<ActivityIndicator size={25} color={colors.white} style={styles.loading} />) : (
                                <Text style={styles.confirmtxt}>{buttonText} Service</Text>
                            )
                        }
                    </TouchableOpacity>
                </SafeAreaView>
        </Modal>
    )
}

export default ServiceModal


const styles = StyleSheet.create({

    text: {
        textAlign: "left",
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
        fontFamily: Platform.select({ android: 'serif' }),
        marginLeft: '5%',
        marginRight: '5%',
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
        color: colors.red,
        fontFamily: Platform.select({ android: 'serif' }),
        textAlign: 'right',
        marginRight: '5%',
        marginLeft: '2%'
    },
    closeButton:{
        position: "absolute",
         marginLeft: '91%', 
         marginTop: '5%'
    },
    loading:{
        margin: '2.5%'
    }
});