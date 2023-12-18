import React, { useCallback, useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator, Linking, Platform, SafeAreaView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome'
import { colors } from '../theme/colors';
import Card from './card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index'
import { getAllCustomers, removeCustomer } from "../services/Customer/action";

const ConfirmCustomer = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [activateDelete, setActivateDelete] = useState(false)

    const dispatch = useDispatch();
    const result = useSelector(state => state.CustomerReducer)
    const allCustomers = result.customers

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const UserDetails = await AsyncStorage.getItem('UserDetails');
            if (UserDetails !== null) {
                const parsedValue = JSON.parse(UserDetails);
                setToken(parsedValue.token)
                dispatch(getAllCustomers({ data: { register_customer_id: parsedValue.register_customer_id, isConfirm: 1 }, token: parsedValue.token }))
            }
        } catch (error) {
            console.error("Error retrieving Data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(useCallback(() => {
        fetchData();
        setSelectedCustomers([])
    }, []));

    const deleteCustomer = () => {
        setIsLoading(true)
        dispatch(removeCustomer({ data: { customer_ids: selectedCustomers }, token: token }))
    }
    const handleDelete = () => {
        Alert.alert(
            'Delete Customers?',
            'Customers will be permanently deleted',
            [{ text: 'Yes', onPress: deleteCustomer }, { text: 'No' }],
        )
    }

    const handleCustomerForDelete = customer_id => {
        if (selectedCustomers.length === 0) {
            setSelectedCustomers([customer_id]);
        } else {
            if (selectedCustomers.includes(customer_id)) {
                setSelectedCustomers(prevState => prevState.filter(id => id !== customer_id));
            } else {
                setSelectedCustomers(prevState => [...prevState, customer_id]);
            }
        }
    };

    useEffect(() => {
        if (selectedCustomers.length !== 0) {
            setActivateDelete(true)
        }
        else {
            setActivateDelete(false)
        }
    }, [selectedCustomers])


    const handleDialer = (phoneno) => {
        let phoneNumber = `+91${phoneno}`;
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phoneNumber}`;
        } else {
            phoneNumber = `telprompt:${phoneNumber}`;
        }

        Linking.openURL(phoneNumber);
    }
    useEffect(() => {
        if (result.isRegistered && navigation.isFocused()) {
            fetchData();
            setSelectedCustomers([])
        }
    }, [result.isRegistered, navigation.isFocused()]);


    const renderItem = ({ item }) => {
        const isSelected = selectedCustomers.includes(item.customer_id);
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (selectedCustomers.length > 0) {
                            handleCustomerForDelete(item.customer_id);
                        } else {
                            navigation.navigate("CustomerService", { type: "confirm", customer_id: item.customer_id })
                        }
                    }}
                    onLongPress={() => handleCustomerForDelete(item.customer_id)}>
                    <Card style={[styles.card, isSelected && styles.selectedCard]}>
                        <View style={styles.cardMainView}>
                            <View style={styles.detailContainer}>
                                <Text style={styles.text}>Customer name:</Text>
                                <Text style={[styles.label, { marginRight: SCREEEN_WIDTH / 2.5 }]}>{item.customer_name}</Text>
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.text}>Mobile Number:</Text>
                                <TouchableOpacity
                                    onPress={() => handleDialer(item.phoneno)}
                                    disabled={isSelected}>
                                    <Text style={[styles.label]}>{item.phoneno}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.text}>Email:</Text>
                                <Text style={[styles.label]}>{item.email_id}</Text>
                            </View>
                            {
                                item.gst_number ? <View style={styles.detailContainer}>
                                    <Text style={styles.text}>GST Number:</Text>
                                    <Text style={[styles.label]}>{item.gst_number}</Text>
                                </View> : null
                            }
                        </View>
                    </Card>
                </TouchableOpacity>
                <View style={styles.editContainer}>
                    <TouchableOpacity style={styles.editButton}
                        onPress={() => { navigation.navigate('AddCustomer', { mode: "Edit", customer_id: item.customer_id, type: "confirm" }) }}
                        disabled={isSelected}>

                        <FontAwesome name="edit" size={20} color={colors.blueShade1} />

                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const noConfirmCustomerCard = () => {
        return (
            <Card style={[styles.noConfirmCustomerCard]}>
                <View style={styles.noCustomerCardView}>
                    <Text style={[styles.noConfirmCustomerText]}>Oops! Customers not Found</Text>
                </View>
            </Card>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            {isLoading || result.isLoading ? (
                <ActivityIndicator size="large" color={colors.blueShade2} style={styles.loading} />
            ) : (
                <React.Fragment>
                    <View style={styles.listView}>
                        {
                            allCustomers && allCustomers.length === 0 ? (
                                noConfirmCustomerCard()
                            ) : (
                                <FlatList
                                    data={allCustomers}
                                    renderItem={renderItem}
                                    contentContainerStyle={styles.listContainer} />
                            )
                        }

                    </View>
                    {activateDelete ? (<TouchableOpacity
                        style={styles.button}
                        onPress={handleDelete}>
                        <Text style={styles.buttonText}>Delete Customers</Text>
                    </TouchableOpacity>) : null}

                </React.Fragment>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        height: SCREEN_HEIGHT,
        width: SCREEEN_WIDTH
    },
    card: {
        marginTop: '3%'
    },
    text: {
        textAlign: "left",
        marginLeft: '2%',
        marginBottom: '2%',
        fontFamily: Platform.select({ android: 'serif' }),
        fontSize: 12,
        color: colors.greyShade4,
        fontWeight: Platform.select({ android: '800', ios: '500' })
    },
    label: {
        textAlign: "left",
        marginLeft: '2%',
        marginBottom: '2%',
        fontFamily: Platform.select({ android: 'serif' }),
        fontSize: 12,
        color: colors.greyShade4,
        fontWeight: Platform.select({ android: '200', ios: '300' })
    },
    selectedCard: {
        backgroundColor: colors.blueShade4,
    },
    button: {
        backgroundColor: colors.blueShade1,
        borderRadius: 5,
        marginHorizontal: '5%',
        marginVertical: '2%'
    },
    buttonText: {
        color: colors.white,
        fontFamily: Platform.select({ android: 'serif' }),
        textAlign: 'center',
        margin: '3%',
        fontSize: 17,
        fontWeight: Platform.select({ android: '200', ios: '400' }),
    },
    noConfirmCustomerCard: {
        marginTop: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: '5%',
        borderRadius: 5,
    },
    noConfirmCustomerText: {
        marginLeft: '2%',
        marginBottom: '2%',
        fontFamily: Platform.select({ android: 'serif' }),
        fontSize: 16,
        color: colors.gray,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    mainContainer: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    cardMainView: {
        padding: '2%'
    },
    detailContainer: {
        flexDirection: 'row'
    },
    editContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: '5%',
        marginRight: '5%'
    },
    editButton: {
        marginTop: '3%',
        marginBottom: '6%',
        alignSelf: 'center',
    },
    noCustomerCardView: {
        padding: '2%'
    },
    loading: {
        marginTop: '2%'
    },
    listView: {
        flex: 1
    },
    listContainer: {
        paddingBottom: Platform.select({ android: '20%', ios: '30%' })
    },

})

export default ConfirmCustomer;