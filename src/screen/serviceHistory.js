import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';
import Card from './card';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addCustomerService,
  getAllCustomerServices,
  removeCustomerService,
} from '../services/Customer Service/action';
import { CheckBox } from 'react-native-elements';
import { getAllBillsForInvoice, addInvoice, resetValue, getInvoice, RESET_VALUE } from '../services/Invoice/action';
import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';

const ServiceHistory = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const { customer_id, customerType } = route.params;
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomerServicess, setSelectedCustomerServicess] = useState([]);
  const [activateDelete, setActivateDelete] = useState(false)
  const [selectedItems, setSelectedItems] = useState([]);
  const [generatePdf, setGeneratePdf] = useState(false);
  const [showInvoicePdf, setShowInvoicePdf] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({})
  const dispatch = useDispatch();
  const result = useSelector(state => state.CustomerServiceReducer);
  const allCustomerServices = result.customerService;
  const invoiceResponse = useSelector(state => state.InvoiceReducer);
  const invoiceBills = invoiceResponse.invoiceBills;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const UserDetails = await AsyncStorage.getItem('UserDetails');
      if (UserDetails !== null) {
        const parsedValue = JSON.parse(UserDetails);
        setCompanyDetails(parsedValue)
        setToken(parsedValue.token);
        dispatch(
          getAllCustomerServices({
            data: {
              customer_id: customer_id,
              bill_status: 1
            },
            token: parsedValue.token,
          }),
        );
      }
    } catch (error) {
      console.error('Error retrieving Data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = customer_service_id => {
    const isSelected = selectedItems.includes(customer_service_id);

    if (isSelected) {
      const updatedItems = selectedItems.filter(
        id => id !== customer_service_id,
      );
      setSelectedItems(updatedItems);
    } else {
      const updatedItems = [...selectedItems, customer_service_id];
      setSelectedItems(updatedItems);
    }
  };

  useEffect(() => {
    if (selectedItems.length !== 0) {
      setGeneratePdf(true);
    } else {
      setGeneratePdf(false);
    }
  }, [selectedItems]);

  const handleGeneratePdf = () => {
    dispatch(
      getAllBillsForInvoice({
        data: { bills: selectedItems, customer_id },
        token: token,
      }),

    );
  };
  useEffect(() => {
    if (generatePdf && !invoiceResponse.isLoading) {
      if (invoiceBills.length > 0) {
        setShowInvoicePdf(true);
        setSelectedItems([]);
      } else {
        setSelectedItems([]);
      }
    } else {
      setShowInvoicePdf(false);
    }
  }, [invoiceResponse.isLoading]);
  useEffect(() => {
    if (showInvoicePdf) {
      dispatch(addInvoice({
        data: {
          companyDetails: {
            companyName: companyDetails.business_name,
            phoneno: companyDetails.phoneno,
            address: companyDetails.address,
            pincode: companyDetails.pincode,
            city: companyDetails.city,
            state: companyDetails.state
          },
          customer: invoiceResponse.customer,
          invoiceBills
        },
        token: companyDetails.token
      }))
    }
  }, [showInvoicePdf])
  useEffect(() => {
    if (invoiceResponse.isRegistered && navigation.isFocused()) {
      const callInvoice = () => {
        dispatch(getInvoice({
          data: { invoice_id: invoiceResponse.invoice.invoice_id },
          token: companyDetails.token
        }))
      }


      Alert.alert(
        'Share',
        'Do you want to share this Invoice?',
        [{ text: 'Yes', onPress: callInvoice }, { text: 'No' }]
      )

    }
    dispatch(resetValue())

  }, [invoiceResponse.isRegistered, navigation.isFocused()])
  useEffect(() => {
    if (invoiceResponse.getInvoice && navigation.isFocused()) {
      ShareInvoice(invoiceResponse.invoiceUrl)
      dispatch(resetValue())
    }
  }, [invoiceResponse.getInvoice, navigation.isFocused()])
  const ShareInvoice = async (invoiceUrl) => {
    try {
      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        appendExt: 'pdf',
      }).fetch('GET', invoiceUrl)

      const filePath = response.path()

      const shareOptions = {
        title: 'Share Invoice',
        url: `file://${filePath}`,
        type: 'application/pdf',

      };
      await Share.open(shareOptions);
      await ReactNativeBlobUtil.fs.unlink(filePath)
    }
    catch (error) {
      console.log(error)
    }
  }


  const deleteCustomerService = () => {
    setIsLoading(true)
    dispatch(removeCustomerService({ data: { customer_service_ids: selectedCustomerServicess, customer_id }, token: token }));
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Services?',
      'All Bills related to this Services will also be deleted',
      [
        {
          text: 'Yes',
          onPress: deleteCustomerService,
        },
        { text: 'No' },
      ],
    );
  };
  const handleCustomerServiceForDelete = customer_service_id => {
    if (selectedCustomerServicess.length === 0) {
      setSelectedCustomerServicess([customer_service_id]);
    } else {
      if (selectedCustomerServicess.includes(customer_service_id)) {
        setSelectedCustomerServicess(prevState => prevState.filter(id => id !== customer_service_id));
      } else {
        setSelectedCustomerServicess(prevState => [...prevState, customer_service_id]);
      }
    }
  };
  useEffect(() => {
    if (selectedCustomerServicess.length !== 0) {
      setSelectedItems([])
      setActivateDelete(true)
    }
    else {
      setActivateDelete(false)
    }
  }, [selectedCustomerServicess])


  useEffect(() => {
    if ((result.isRegistered || invoiceResponse.isRegistered) && navigation.isFocused()) {
      fetchData();
      setSelectedCustomerServicess([])
    }
    else if (!invoiceResponse.isRegistered) {
      if (invoiceResponse.error_type == 'fail') {
        Alert.alert(
          '❗Error',
          'Failed to generate Invoice',
          [
            {
              text: 'Ok',

            }
          ],
        );
        dispatch(resetValue())
      }
    }
  }, [result.isRegistered, invoiceResponse.isRegistered, invoiceResponse.error_type, navigation.isFocused()]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      const onBackPress = () => {

        navigation.navigate('CustomerService', { type: customerType, customer_id });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const flatrenderList = ({ item }) => {
    const isSelected = selectedCustomerServicess.includes(item.customer_service_id);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (selectedCustomerServicess.length > 0) {
              handleCustomerServiceForDelete(item.customer_service_id);
            } else {
              navigation.navigate('Bill', {
                type: "paid",
                customer_id, customerType,
                customer_service_id: item.customer_service_id,
              })
            }
          }}
          onLongPress={() => handleCustomerServiceForDelete(item.customer_service_id)}>
          <Card style={[styles.card, isSelected && styles.selectedCard]}>
            <View style={styles.mainContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.text}>Date:</Text>
                <Text
                  style={[
                    styles.textLabel,
                    {
                      marginRight: '12%',
                    },
                  ]}>
                  {item.date}
                </Text>
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.text}>Service name:</Text>
                <Text
                  style={[
                    styles.textLabel,
                    {
                      marginRight: '12%',
                    },
                  ]}>
                  {item.service.service_name}
                </Text>
              </View>

              {item.sub_service && (
                <View style={styles.labelContainer}>
                  <Text style={styles.text}>Sub-service name:</Text>
                  <Text
                    style={[
                      styles.textLabel
                    ]}>
                    {item.sub_service.sub_service_name}
                  </Text>
                </View>
              )}
            </View>
          </Card>
        </TouchableOpacity>
        <CheckBox
          checked={selectedItems.includes(item.customer_service_id)}
          onPress={() => handleCheckboxChange(item.customer_service_id)}
          checkedColor={colors.blueShade1}
          size={20}
          containerStyle={styles.checkBox}
          disabled={selectedCustomerServicess.length !== 0}
        />
      </View>
    );
  };
  const noCustomerServiceCard = () => {
    return (
      <Card style={[styles.card, styles.noCustomerServiceCard]}>
        <View style={styles.noCardView}>
          <Text style={[styles.noCustomerServiceText]}>Oops! Services not Found</Text>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      {result.isLoading || invoiceResponse.isLoading || isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.blueShade2}
          style={styles.loading}
        />
      ) : (
        <React.Fragment>
          <View
            style={styles.list}>
            {allCustomerServices.length === 0 ? (
              noCustomerServiceCard()
            ) : (
              <FlatList
                data={allCustomerServices}
                renderItem={flatrenderList}
                contentContainerStyle={styles.listContainer}
              />
            )}
          </View>

          <View>
            {generatePdf ? (
              <TouchableOpacity
                style={styles.Button}
                onPress={handleGeneratePdf}>
                <Text style={styles.btntxt}>Generate PDF</Text>
              </TouchableOpacity>
            ) : activateDelete ? (<TouchableOpacity
              style={styles.Button}
              onPress={handleDelete}>
              <Text style={styles.btntxt}>Delete Services</Text>
            </TouchableOpacity>) : (
              null
            )
            }
          </View>
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: '3%'
  },
  text: {
    textAlign: 'left',
    marginTop: '2%',
    fontWeight: Platform.select({ android: 'bold', ios: '500' }),
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 14,
    color: colors.greyShade4,
    marginLeft: '2%',
    margin: '1%',
  },
  textLabel: {
    textAlign: 'left',
    marginTop: '2%',
    fontFamily: Platform.select({ android: 'serif' }),
    color: colors.greyShade4,
    marginLeft: '2%',
    margin: '1%',
    fontWeight: Platform.select({ android: '200', ios: '300' }),
    flex: 1,
    fontSize: 13,
  },
  noCardView: {
    padding: '2%'
  },
  listContainer: {
    paddingBottom: '7%'
  },
  main: {
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT,
    width: SCREEEN_WIDTH,
    flex: 1
  },
  list: {
    marginTop: '5%',
    marginHorizontal: '5%',
    flex: 1
  },
  mainContainer: {
    padding: '3%'
  },
  Button: {
    backgroundColor: colors.blueShade1,
    borderRadius: 5,
    marginHorizontal: '5%',
    marginVertical: '2%'
  },
  loading: {
    marginTop: '2%'
  },
  checkBox: {
    padding: 0,
    alignSelf: 'flex-end',
    marginTop: '4.5%',
    marginRight: '2%',
    position: 'absolute',
  },
  labelContainer: {
    flexDirection: 'row'
  },
  btntxt: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: '3%',
    fontSize: 17,
    fontWeight: Platform.select({ android: '200', ios: '400' }),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    backgroundColor: colors.blueShade4,
  },
  noCustomerServiceCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: '5%',
    borderRadius: 5,
  },
  noCustomerServiceText: {
    marginTop: '2%',
    fontFamily: Platform.select({ android: 'serif' }),
    marginLeft: '2%',
    margin: '1%',
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ServiceHistory;
