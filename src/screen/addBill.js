import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { colors } from '../theme/colors';
import {
  BackHandler,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../theme/index';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBill,
  getBill,
  updateBill,
} from '../services/Bill/action';

//initialGst Variable is new
const AddBill = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mode, customer_service_id, bill_id } = route.params;
  const [datetext, setDateText] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [gstPercent, setGsePercent] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [governmentfees, setGovernmentfees] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalGovernmentfees, setTotalGovernmentFees] = useState(0);
  const [servicefees, setServicefees] = useState(0);
  const [extraCharge, setExtraCharge] = useState(0);
  const [totalServiceCharge, setTotalServiceCharge] = useState(0);
  const [total, setTotal] = useState(0);
  const [isExtraSelected, setExtraSelected] = useState(false);
  const [isGSTSelected, setGSTSelection] = useState(false);

  const [initialGSTSelected, setInitialGSTSelected] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const firstRenderRef = useRef(true);
  const gstCheckBoxEffect = useRef(true)
  const serviceCheckBoxEffect = useRef(true)
  const serviceEffect = useRef(true)
  const gstEffect = useRef(true)
  const initialGstEffect = useRef(true)
  const result = useSelector(state => state.BillReducer);
  const bill = result.bill;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const UserDetails = await AsyncStorage.getItem('UserDetails');
      if (UserDetails !== null) {
        const parsedValue = JSON.parse(UserDetails);
        setToken(parsedValue.token);
        if (mode === 'Edit') {
          dispatch(getBill({ data: { bill_id }, token: parsedValue.token }));
        }
      }
    } catch (error) {
      console.error('Error retrieving Data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    if (result.isRegistered) {
      navigation.navigate('Bill', { customer_service_id });
    } else {
      if (result.error_type == 'service') {
        Alert.alert('⚠️Error', "Customer hasn't taken this Service", [
          { text: 'ok' },
        ]);
      }
    }
  }, [result.isRegistered, result.error_type]);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (mode === 'Edit' && bill) {
      setDateTime(bill.date_time);
      formatDateTime(bill.date_time);
      setGovernmentfees(bill.government_fees);
      setGst(bill.government_tex);
      gstEffect.current = true
      setTotalGovernmentFees(bill.government_fees + bill.government_tex);
      setServicefees(bill.service_charge);
      setExtraCharge(bill.service_tex);
      serviceEffect.current = true
      setTotalServiceCharge(bill.service_charge + bill.service_tex);
      setTotal(bill.total_amount);
      if (bill.government_tex) {
        setGSTSelection(true);
        setInitialGSTSelected(true)
        gstCheckBoxEffect.current = true
      }
      if (bill.service_tex) {
        setExtraSelected(true);
        serviceCheckBoxEffect.current = true
      }
    }
  }, [mode, bill]);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      const onBackPress = () => {
        navigation.navigate('Bill', { customer_service_id });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('gst');
        const parsedValue = JSON.parse(value);
        setGsePercent(parsedValue.gst);
      } catch (error) {
        console.error('Error retrieving GST:', error);
      }
    };

    fetchData();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    const formattedDateTime = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS');
    formatDateTime(date);
    setDateTime(formattedDateTime);
    hideDatePicker();
  };

  const formatDateTime = dateTime => {
    if (!dateTime) {
      return '';
    }
    const formattedTime = moment(dateTime, ['HH:mm:ss']).format('hh:mm:ss a');
    const formattedDate = moment(dateTime).format('YYYY-MM-DD');
    const FormattedDateTime = `${formattedDate} ${formattedTime}`;

    setDateText(FormattedDateTime);
  };

  const handleSubmit = () => {
    if (datetext.trim() === '') {
      Alert.alert('⚠️ Warning', 'Please Select a Date and Time.');
    } else {
      let data = {
        customer_service_id,
        date_time: dateTime,
        government_fees: governmentfees,
        government_tex: gst,
        service_charge: servicefees,
        service_tex: extraCharge,
        total_amount: total,
        bill_id
      };
      if (mode === 'Add') {
        dispatch(addBill({ data, token: token }));
      } else if (mode === 'Edit') {
        dispatch(updateBill({ data, token: token }));
      }
    }
  };

  const calculateTotal = (num1, num2,gstCalc) => {
    if (isNaN(num1) || num1 == 0) {
      setGovernmentfees(0);
      setGst(0);
      setTotalGovernmentFees(0);
      setTotal(totalServiceCharge);
      num1 = 0;
      if (isNaN(num2) || num2 == 0) {
        setServicefees(0);
        setExtraCharge(0);
        setTotalServiceCharge(0);
        setTotal(totalGovernmentfees);
        num2 = 0;
      }
      calculateTotalAmount(num1, num2,gstCalc);
    } else if (isNaN(num2) || num2 == 0) {
      setServicefees(0);
      setExtraCharge(0);
      setTotalServiceCharge(0);
      setTotal(totalGovernmentfees);
      num2 = 0;
      if (isNaN(num1) || num1 == 0) {
        setGovernmentfees(0);
        setGst(0);
        setTotalGovernmentFees(0);
        setTotal(totalServiceCharge);
        num1 = 0;
      }
      calculateTotalAmount(num1, num2,gstCalc);
    } else {
      calculateTotalAmount(num1, num2,gstCalc);
    }
  };

  const calculateTotalAmount = (num1, num2,gstCalc) => {
    console.log(gstCalc)
    let gfees=0
    if(!gstCalc)
    {
      gfees = isGSTSelected ? (num1 * gstPercent) / 100 : 0;
    }
    // let gfees=0
    // if(initialGSTSelected)
    // {
    //   gfees=bill.government_tex
    //   // setInitialGSTSelected(false)
    // }
    // else
    // {
      // gfees = isGSTSelected ? (num1 * gstPercent) / 100 : 0;
    // }
    // const gfees=isGSTSelected ? (num1 * gstPercent) / 100 : 0;
    setGst(gfees);
    const totalgFess=num1+gfees
    setTotalGovernmentFees(totalgFess)
    const extrafees = isExtraSelected ? (num2 * 1) / 100 : 0;
    setExtraCharge(extrafees);

    const totalcharge = num2 + extrafees;
    setTotalServiceCharge(totalcharge);
    const totalAmount = totalgFess + totalcharge;
    setTotal(totalAmount);
  };

  useEffect(() => {
    if (serviceCheckBoxEffect.current) {
      serviceCheckBoxEffect.current = false;
      return;
    }
    
    setInitialGSTSelected(true)
    calculateTotal(governmentfees, servicefees,1);
  }, [isExtraSelected]);

  useEffect(() => {
    if (gstCheckBoxEffect.current) {
      gstCheckBoxEffect.current = false;
      return;
    }
    setInitialGSTSelected(false)
    calculateTotal(governmentfees, servicefees,0);
  }, [isGSTSelected]);

  // useEffect(() => {
  //   if (initialGstEffect.current) {
  //     initialGstEffect.current = false;
  //     return;
  //   }
  //   const gfees = isGSTSelected ? (governmentfees * gstPercent) / 100 : 0;
  //   setGst(gfees);
  //   const totalgfees = governmentfees + gfees;
  //   setTotalGovernmentFees(totalgfees);
  // }, [initialGSTSelected])
  useEffect(() => {
    if (serviceEffect.current) {
      serviceEffect.current = false;
      return;
    }
    const totalcharge = servicefees + extraCharge;
    setTotalServiceCharge(totalcharge);
    const totalAmount = totalGovernmentfees + totalcharge;
    setTotal(totalAmount);
  }, [extraCharge]);

  useEffect(() => {
    if (gstEffect.current) {
      gstEffect.current = false;
      return;
    }

    const totalcharge = governmentfees + gst;
    setTotalGovernmentFees(totalcharge);
    const totalAmount = totalServiceCharge + totalcharge;
    setTotal(totalAmount);
  }, [gst]);

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
              <View style={styles.main} >
                <View style={styles.dateTimeContainer}>
                  <Text style={styles.date}>Date-time:</Text>

                  <View style={styles.textParent}>
                    <Text style={styles.textChild} onPress={showDatePicker}>
                      {datetext}
                    </Text>
                  </View>
                </View>
                <View style={styles.governmantFeesContainer}>
                  <Text style={styles.date}>Government Fees:</Text>
                  <TextInput
                    placeholder="Government fees"
                    defaultValue={governmentfees.toString()}
                    style={[styles.textinput]}
                    keyboardType="numeric"
                    onChangeText={text => {
                      const n1 = parseInt(text);
                      setGovernmentfees(n1);
                      setInitialGSTSelected(false)
                      calculateTotal(n1, servicefees,0);
                    }}
                  />
                </View>
                <View style={styles.gstContainer}>
                  <Text style={styles.date}>GST Charge:</Text>

                  <View style={styles.textParent}>
                    <Text style={styles.textChild}>{gst}</Text>
                  </View>
                </View>
                <View style={styles.gstCheckBox}>
                  <CheckBox
                    containerStyle={styles.checkBox}
                    checked={isGSTSelected}
                    onPress={() => setGSTSelection(!isGSTSelected)}
                    checkedColor={colors.blueShade1}
                    size={20}
                    disabled={governmentfees === 0}
                  />
                  <Text style={styles.checkBoxText}>include GST charge</Text>
                </View>

                <View style={styles.totalGovernmentFeesContainer}>
                  <Text style={styles.date}>Total Government Charge:</Text>

                  <View style={styles.textParent}>
                    <Text style={styles.textChild}>{totalGovernmentfees}</Text>
                  </View>
                </View>
                <View style={styles.serviceContainer}>
                  <Text style={styles.date}>Service Charge:</Text>
                  <TextInput
                    placeholder="Service charge"
                    style={[styles.textinput]}
                    keyboardType="numeric"
                    defaultValue={servicefees.toString()}
                    onChangeText={text => {
                      const n2 = parseInt(text);
                      setServicefees(n2);
                      setInitialGSTSelected(false)
                      calculateTotal(governmentfees, n2,1);
                    }}
                  />
                </View>

                <View style={styles.extraServiceContainer}>
                  <Text style={styles.date}>Extra Service Charge:</Text>

                  <View style={styles.textParent}>
                    <Text style={styles.textChild}>{extraCharge}</Text>
                  </View>
                </View>
                <View style={styles.extraChargeCheckBox}>
                  <CheckBox
                    containerStyle={styles.checkBox}
                    checked={isExtraSelected}
                    onPress={() => setExtraSelected(!isExtraSelected)}
                    checkedColor={colors.blueShade1}
                    size={20}
                    disabled={servicefees === 0}
                  />

                  <Text style={styles.checkBoxText}>include extra charge</Text>
                </View>
                <View style={styles.totalServiceContainer}>
                  <Text style={styles.date}>Total Service Charge:</Text>
                  <View style={styles.textParent}>
                    <Text style={styles.textChild}>{totalServiceCharge}</Text>
                  </View>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.date}>Total amount:</Text>
                  <View style={styles.textParent}>
                    <Text style={styles.textChild}>{total}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.Button} onPress={handleSubmit}
                  disabled={result.isLoadingButton}>
                  {
                    result.isLoadingButton ? (<ActivityIndicator size={25} color={colors.white} style={styles.loadingButton} />) : (
                      <Text style={styles.btntxt}>Submit</Text>
                    )
                  }

                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="datetime"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  date: {
    color: colors.greyShade3,
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 14,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginTop: Platform.select({ ios: '2%' }),
    width: '50%',
  },
  textParent: {
    borderBottomColor: colors.greyShade1,
    borderBottomWidth: 2,
    flex: 1,
    marginLeft: '2%',
  },
  textChild: {
    height: 35,
    width: '100%',
    fontSize: 13,
    marginLeft: '6%',
    marginTop: Platform.select({ ios: '5%' }),
    fontFamily: Platform.select({ android: 'serif' }),
    textAlignVertical: 'center',
    color: colors.greyShade3,
  },
  textinput: {
    borderBottomColor: colors.greyShade1,
    borderBottomWidth: 2,
    height: 35,
    fontSize: 13,
    fontFamily: Platform.select({ android: 'serif' }),
    padding: Platform.select({ ios: '3%' }),
    paddingLeft: Platform.select({ android: '3%' }),
    textAlignVertical: 'center',
    bottom: 2,
    marginLeft: '2%',
    color: colors.greyShade3,
    flex: 1,
  },
  gsttext: {
    textAlign: 'right',
    fontSize: 11,
    fontFamily: Platform.select({ android: 'serif' }),
    color: colors.greyShade3,
  },
  Button: {
    backgroundColor: colors.blueShade1,
    marginTop: '28%',
    borderRadius: 5,
  },
  btntxt: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: 10,
    fontSize: 17,
    fontWeight: Platform.select({ android: '200', ios: '400' }),
  },
  billContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightWhite,
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  value: {
    flex: 2,
  },
  checkBox: {
    padding: 0,
    marginRight: 5,
  },
  checkBoxText: {
    marginTop: '2%',
  },
  loading: {
    marginTop: '2%'
  },
  main: {
    marginTop: '5%',
    marginHorizontal: '5%',
    marginBottom: "50%"
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginTop: '2%'
  },
  governmantFeesContainer: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  gstContainer: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  gstCheckBox: {
    flexDirection: 'row',
    marginLeft: '51%'
  },
  totalGovernmentFeesContainer: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  serviceContainer: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  extraServiceContainer: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  extraChargeCheckBox: {
    flexDirection: 'row',
    marginLeft: '50%'
  },
  totalServiceContainer: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  totalContainer: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  loadingButton: {
    margin: 10
  }
});

export default AddBill;
