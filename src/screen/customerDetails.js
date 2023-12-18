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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import moment from 'moment';
import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {
  addCustomerService,
  getAllCustomerServices,
  removeCustomerService,
} from '../services/Customer Service/action';
import { getAllServices } from '../services/Service/action';
import { getAllBillsForInvoice, addInvoice, resetValue, getInvoice, RESET_VALUE } from '../services/Invoice/action';
import { getAllSubServices } from '../services/Sub Service/action';

const CustomerDetails = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const { customer_id, type } = route.params;
  const [register_customer_id, setRegisterCustomerId] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomerServicess, setSelectedCustomerServicess] = useState([]);
  const [activateDelete, setActivateDelete] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [active, setActive] = useState(false);
  const [generatePdf, setGeneratePdf] = useState(false);
  const [service_id, setServiceId] = useState('');
  const [sub_service_id, setSubServiceId] = useState('');
  const [showInvoicePdf, setShowInvoicePdf] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({})
  const dispatch = useDispatch();
  const result = useSelector(state => state.CustomerServiceReducer);
  const allCustomerServices = result.customerService;
  const serviceloading = useSelector(state => state.ServiceReducer.isLoading);
  const subServiceloading = useSelector(state => state.SubServiceReducer.isLoading);
  const services = useSelector(state => state.ServiceReducer.services);
  const subServices = useSelector(state => state.SubServiceReducer.subServices);
  const invoiceResponse = useSelector(state => state.InvoiceReducer);
  const invoiceBills = invoiceResponse.invoiceBills;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const UserDetails = await AsyncStorage.getItem('UserDetails');
      if (UserDetails !== null) {
        const parsedValue = JSON.parse(UserDetails);
        setCompanyDetails(parsedValue)
        setRegisterCustomerId(parsedValue.register_customer_id);
        setToken(parsedValue.token);
        dispatch(
          getAllCustomerServices({
            data: {
              customer_id: customer_id,
              bill_status: 0
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    if (!date) {
      return '';
    }
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const FormattedDate = `${formattedDate}`;
    setDate(FormattedDate);
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (date.trim() === '') {
      setDateError('Please Select Date');
    } else {
      setIsLoading(true)
      dispatch(
        addCustomerService({
          data: { customer_id, service_id, sub_service_id, date },
          token,
        }),
      );
      setActive(!active);
    }
  };

  const handleService = () => {

    setActive(!active);
  };
  useEffect(() => {
    if (active) {
      dispatch(getAllServices({ data: { register_customer_id }, token }));
      setDate('');
      setDateError('');
    }
  }, [active]);

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

  useEffect(() => {
    if (services.length > 0) {
      setServiceId(services[0].service_id);
      dispatch(
        getAllSubServices({ data: { service_id: services[0].service_id }, token: token }),
      );
    }
  }, [services]);
  useEffect(() => {
    if (subServices.length > 0) {
      setSubServiceId(subServices[0].sub_service_id);
    } else {
      setSubServiceId(null);
    }
  }, [subServices]);


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
        if (type == 'leed' && !result.isRegistered) {
          navigation.navigate('LeedCustomer');
        } else if (result.isRegistered || type == 'confirm') {
          navigation.navigate('ConfirmCustomer');
        }
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
                type: "pending",
                customer_service_id: item.customer_service_id,
              })
            }
          }}
          onLongPress={() => handleCustomerServiceForDelete(item.customer_service_id)}>
          <Card style={[styles.card, isSelected && styles.selectedCard]}>
            <View style={styles.mainContainer}>
              <View style={styles.detailContainer}>
                <Text style={styles.text}>Date:</Text>
                <Text
                  style={styles.textLabel}>
                  {item.date}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.text}>Service name:</Text>
                <Text
                  style={styles.textLabel}>
                  {item.service.service_name}
                </Text>
              </View>

              {item.sub_service && (
                <View style={styles.detailContainer}>
                  <Text style={styles.text}>Sub-service name:</Text>
                  <Text
                    style={styles.textLabel}>
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
          containerStyle={styles.checkBoxContainer}
          disabled={selectedCustomerServicess.length !== 0}
        />
      </View>
    );
  };
  const noCustomerServiceCard = () => {
    return (
      <Card style={[styles.noCustomerServiceCard]}>
        <View style={styles.noCustomerView}>
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
            style={styles.mainView}>
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
              <TouchableOpacity style={styles.Button} onPress={handleService}>
                <Text style={styles.btntxt}>Add Service</Text>
              </TouchableOpacity>
            )}

          </View>
          <Modal animationType="slide" isVisible={active}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setActive(false);
                }}>
                <MaterialCommunityIcons
                  name="close-octagon"
                  size={25}
                  color={colors.blueShade1}
                />
              </TouchableOpacity>

              <Text style={styles.label}>Select Service</Text>
              <Dropdown
                selectedTextProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
                style={[styles.dropdown]}
                placeholderStyle={{ color: colors.greyShade3 }}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={serviceloading ? [] : services}
                search
                maxHeight={300}
                labelField="service_name"
                valueField="service_id"
                placeholder="Select service"
                searchPlaceholder="Search..."
                value={service_id}
                onChange={async item => {
                  setServiceId(item.service_id);
                  dispatch(
                    getAllSubServices({
                      data: { service_id: item.service_id },
                      token: token,
                    }),
                  );
                }}
              />
              <Text style={styles.label}>Select Sub Service</Text>
              <Dropdown
                selectedTextProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
                style={styles.dropdown}
                placeholderStyle={{ color: colors.greyShade3 }}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={serviceloading || subServiceloading ? [] : subServices}
                search
                maxHeight={300}
                labelField="sub_service_name"
                valueField="sub_service_id"
                placeholder="Select sub-service"
                searchPlaceholder="Search..."
                value={sub_service_id}
                onChange={item => {
                  setSubServiceId(item.sub_service_id);
                }}
              />
              <View style={styles.dateContainer}>
                <Text style={styles.label}>Select Date:</Text>

                <TouchableOpacity
                  onPress={showDatePicker}
                  style={styles.dateTimePicker}>
                  <Text
                    style={[styles.dateText]}>
                    {date}
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              {dateError ? (
                <Text style={styles.errorDate}>{dateError}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.confirmbtn}
                onPress={handleSubmit}
                disabled={serviceloading || subServiceloading}>
                <Text style={styles.confirmtxt}>Confirm and Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: '3%'
  },
  mainView: {
    marginTop: '5%',
    marginHorizontal: '5%',
    flex: 1,
  },
  loading: {
    marginTop: '2%'
  },
  listContainer: {
    paddingBottom: '7%'
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
  main: {
    flex: 1,
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT,
    width: SCREEEN_WIDTH,
  },
  Button: {
    backgroundColor: colors.blueShade1,
    borderRadius: 5,
    marginHorizontal: '5%',
    marginVertical: '5%'
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
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: '5%',
    borderRadius: 5,
  },
  noCustomerServiceText: {
    marginTop: '2%',
    // fontWeight: Platform.select({ android: 'bold', ios: '500' }),
    fontFamily: Platform.select({ android: 'serif' }),
    marginLeft: '2%',
    margin: '1%',
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  confirmbtn: {
    backgroundColor: colors.blueShade1,
    marginHorizontal: '3%',
    marginVertical: '8%',
  },
  confirmtxt: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: '3%',
    fontSize: 15,
  },
  dropdown: {
    marginTop: '2%',
    marginHorizontal: '5%',
    height: 50,
    width: SCREEEN_WIDTH / 1.5,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.blueShade1,
    padding: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.blueShade1,
    borderWidth: 1,
    color: colors.blueShade1,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: colors.blueShade1,
  },
  placeholderStyle: {
    fontSize: 20,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.greyShade3,
  },
  inputSearchStyle: {
    fontSize: 16,
    color: colors.greyShade3,
  },
  label: {
    marginLeft: '7%',
    marginTop: '5%',
    color: colors.greyShade4,
    fontSize: 15,
  },
  dateText: {
    marginLeft: '7%',
    marginTop: '5%',
    color: colors.greyShade3,
    width: '100%',
    fontSize: 16,
  },
  modal: {
    backgroundColor: colors.white,
    borderColor: colors.blueShade1,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
  },
  errorDate: {
    textAlign: 'right',
    marginRight: '20%',
    color: colors.red,
  },
  mainContainer: {
    padding: '3%'
  },
  detailContainer: {
    flexDirection: 'row'
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
    marginRight: '12%',
  },
  checkBoxContainer: {
    padding: 0,
    alignSelf: 'flex-end',
    marginTop: '4.5%',
    marginRight: '2%',
    position: 'absolute',
  },
  noCustomerView: {
    padding: '2%'
  },
  closeButton: {
    width: '9%',
    alignSelf: 'flex-end',
    marginTop: '5%',
    marginRight: '2%',
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: '3%'
  },
  dateTimePicker: {
    width: '45%',
    borderBottomColor: colors.blueShade1,
    borderBottomWidth: 1,
    marginTop: '2.8%',
  },

});

export default CustomerDetails;
