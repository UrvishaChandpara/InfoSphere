import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, BackHandler, TextInput, Alert, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView, ActivityIndicator } from "react-native";
import { colors } from '../theme/colors';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index'
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addCustomer, getCustomer, handleError, updateCustomer } from "../services/Customer/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddCustomer = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [register_customer_id, setRegisterCustomerId] = useState('');
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    const { mode, customer_id, type } = route.params;
    const dispatch = useDispatch()
    const result = useSelector(state => state.CustomerReducer)
    const customer = result.customer

    const [customerName, setCustomerName] = useState("")
    const [email_id, setEmail_id] = useState("")
    const [phoneno, setPhoneno] = useState("")
    const [gstNumber, setGstNumber] = useState("")
    const [triggerEffect, setTriggerEffect] = useState(false);

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [mobileError, setMobileError] = useState("")
    const [gstError, setGstError] = useState("")

    const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const data = { customer_name: customerName, email_id: email_id, phoneno: phoneno, gst_number: gstNumber, register_customer_id: register_customer_id, customer_id }

    useEffect(() => {
        if (mode === "Edit" && customer) {
            setCustomerName(customer.customer_name);
            setEmail_id(customer.email_id);
            setPhoneno(customer.phoneno);
            setGstNumber(customer.gst_number);
            if (!customer.gst_number) {
                setGstNumber('')
            }
        }
    }, [mode, customer]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const UserDetails = await AsyncStorage.getItem('UserDetails');
            if (UserDetails !== null) {
                const parsedValue = JSON.parse(UserDetails);
                setRegisterCustomerId(parsedValue.register_customer_id)
                setToken(parsedValue.token)
                if (mode === "Edit") {
                    dispatch(getCustomer({ data: { customer_id }, token: parsedValue.token }))
                }
            }
        } catch (error) {
            console.error("Error retrieving Data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleNavigation = () => {
        if (type === "leed") {
            navigation.navigate("LeedCustomer")
        }
        else if (type === "confirm") {
            navigation.navigate("ConfirmCustomer")
        }
    }

    useEffect(() => {
        if (result.isRegistered) {
            handleNavigation()
            dispatch(handleError())
        }
        else {
            if (result.error_type == 'email') {
                setEmailError('The email ID has already been taken');
            }
            else if (result.error_type == 'register_customer') {
                Alert.alert(
                    '⚠️Error',
                    'Register Customer Not Found',
                    [
                        { text: 'ok' },
                    ]
                )
            }
            else if (result.error_type == 'customer') {
                Alert.alert(
                    '⚠️Error',
                    'Customer Not Found',
                    [
                        { text: 'ok' },
                    ]
                )
            }

            if (triggerEffect) {
                setTriggerEffect(false)
            }
        }
    }, [result.isRegistered, result.error_type, triggerEffect])


    function handleSubmit() {
        var nameValid = false;
        if (customerName.length == 0) {
            setNameError("Customer name is required");
        }
        else {
            setNameError("");
            nameValid = true;
        }

        var emailValid = false;
        if (email_id.length == 0) {
            setEmailError("Email is required");
        }
        else if (emailpattern.test(email_id) === false) {
            setEmailError("Please enter valid email");
        }
        else {
            setEmailError("");
            emailValid = true;
        }

        var mobileValid = false;
        if (phoneno.length == 0) {
            setMobileError("Mobile Number is required");
        }
        else if (phoneno.length != 10) {
            setMobileError("Please enter 10 digit");
        }
        else {
            setMobileError("");
            mobileValid = true;
        }

        var gstValid = false;
        if (gstNumber.length != 0) {
            if (gstNumber.length != 15) {
                setGstError("Please enter valid gst number");
            }
            else {
                gstValid = true;
            }
        }
        else {
            setGstError("");
            gstValid = true;
        }

        if (nameValid && emailValid && mobileValid && gstValid) {
            if (mode === "Add") {
                dispatch(addCustomer({ data, token: token }))
                setTriggerEffect(true)
            }
            if (mode === "Edit") {
                dispatch(updateCustomer({ data, token: token }))
                setTriggerEffect(true)
            }
        }

    }


    useFocusEffect(
        React.useCallback(() => {
            fetchData()
            const onBackPress = () => {
                handleNavigation()
                dispatch(handleError())
                return true;
            };

            BackHandler.addEventListener(
                'hardwareBackPress', onBackPress
            );

            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress', onBackPress
                );
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            {result.isLoading || isLoading ? (
                <ActivityIndicator
                    size="large"
                    color={colors.blueShade2}
                    style={styles.loading}
                />
            ) : (
                <React.Fragment>
                    <KeyboardAvoidingView behavior="height">
                        <ScrollView>
                            <View style={styles.mainContainer}>
                                <Text style={styles.text}>Customer name:</Text>
                                <TextInput
                                    placeholder="Enter customer name"
                                    keyboardType="default"
                                    style={styles.feildbox}
                                    onChangeText={text => setCustomerName(text)} defaultValue={customerName}
                                />
                                {nameError.length > 0 &&
                                    <Text style={styles.error}>{nameError}</Text>
                                }
                                <Text style={styles.text}>Mobile Number:</Text>
                                <TextInput
                                    placeholder="Enter mobile number"
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    style={styles.feildbox}
                                    onChangeText={text => setPhoneno(text)} defaultValue={phoneno}
                                />
                                {mobileError.length > 0 &&
                                    <Text style={styles.error}>{mobileError}</Text>
                                }

                                <Text style={styles.text}>Email:</Text>
                                <TextInput
                                    placeholder="Enter email"
                                    keyboardType="email-address"
                                    caretHidden={false}
                                    textContentType='emailAddress'
                                    autoComplete='email'
                                    style={styles.feildbox}
                                    onChangeText={text => setEmail_id(text)} defaultValue={email_id}
                                />
                                {emailError.length > 0 &&
                                    <Text style={styles.error}>{emailError}</Text>
                                }
                                <Text style={styles.text}>GST Number:</Text>
                                <TextInput
                                    placeholder="Enter gst number"
                                    keyboardType="default"
                                    maxLength={15}
                                    style={styles.feildbox}
                                    onChangeText={text => setGstNumber(text)} defaultValue={gstNumber}
                                />
                                {gstError.length > 0 &&
                                    <Text style={styles.error}>{gstError}</Text>
                                }
                                <TouchableOpacity
                                    style={styles.Button}
                                    onPress={handleSubmit}
                                    disabled={result.isLoadingButton}>
                                    {
                                        result.isLoadingButton ? (<ActivityIndicator size={25} color={colors.white} style={styles.loadingButton} />) : (
                                            <Text style={styles.btntxt}>{mode} Customer</Text>
                                        )
                                    }

                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </React.Fragment>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: SCREEN_HEIGHT,
        width: SCREEEN_WIDTH
    },
    feildbox: {
        backgroundColor: colors.white,
        borderColor: colors.blueShade1,
        borderWidth: 1,
        fontFamily: Platform.select({ android: 'serif' }),
        padding: Platform.select({ ios: '3%' }),
        paddingLeft: Platform.select({ android: '3%' }),
        fontSize: 13,
        color: colors.greyShade2,
        borderRadius: 5
    },
    text: {
        marginTop: '5%',
        fontFamily: Platform.select({ android: 'serif' }),
        fontSize: 14,
        fontWeight: Platform.select({ android: '700', ios: '500' }),
        color: colors.greyShade3
    },
    Button: {
        backgroundColor: colors.blueShade1,
        marginTop: '20%',
        borderRadius: 5
    },
    btntxt: {
        color: colors.white,
        fontFamily: Platform.select({ android: 'serif' }),
        textAlign: "center",
        margin: '3.5%',
        fontSize: 17,
        fontWeight: Platform.select({ android: '200', ios: '500' })
    },
    error: {
        color: colors.red,
        textAlign: 'right'
    },
    loading: {
        marginTop: '2%'
    },
    mainContainer: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '10%',
        marginBottom: '40%'
    },
    loadingButton: {
        margin: '3.5%'
    }
})

export default AddCustomer;