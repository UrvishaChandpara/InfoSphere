import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, RESET_VALUE } from '../services/Profile/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const result = useSelector(state => state.ProfileReducer);

  const [fname, setFname] = useState(result.customer_Fname || '');
  const [lname, setLname] = useState(result.customer_Lname || '');
  const [businessName, setBusinessName] = useState(result.business_name || '');
  const [phoneno, setPhoneno] = useState(result.phoneno || '');
  const [email_id, setEmail_id] = useState(result.email_id || '');
  const [dob, setDob] = useState(result.dob || '');
  const [address, setAddress] = useState(result.address || '');
  const [pincode, setPincode] = useState(result.pincode || '');
  const [city, setCity] = useState(result.city || '');
  const [state, setState] = useState(result.state || '');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [bussinessError, setBussinessError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');

  const data = {
    data: {
      business_name: businessName,
      email_id: email_id,
      phoneno: phoneno,
      customer_Fname: fname,
      customer_Lname: lname,
      dob: dob,
      address: address,
      pincode: pincode,
      city: city,
      state: state,
      register_customer_id: result.register_customer_id,
    },
    token: token,
  };

  const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const pincodepattern = /^[1-9][0-9]{5}$/;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Profile');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const profileDetails = await AsyncStorage.getItem('UserDetails');
        if (profileDetails !== null) {
          const parsedValue = JSON.parse(profileDetails);
          setToken(parsedValue.token);
        }
      } catch (error) {
        console.error('Error retrieving Data:', error);
      } finally {
        setIsLoading(false)
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
    formatDateTime(date);

    hideDatePicker();
  };

  const formatDateTime = dateTime => {
    if (!dateTime) {
      return '';
    }
    const formattedDate = moment(dateTime).format('YYYY-MM-DD');
    const FormattedDateTime = `${formattedDate}`;

    setDob(FormattedDateTime);
  };
  function handleSubmit() {
    var bussinessValid = false;
    if (businessName.length == 0) {
      setBussinessError('Bussiness name is required');
    } else {
      setBussinessError('');
      bussinessValid = true;
    }

    var emailValid = false;
    if (email_id.length == 0) {
      setEmailError('Email is required');
    } else if (emailpattern.test(email_id) === false) {
      setEmailError('Please enter valid email');
    } else {
      setEmailError('');
      emailValid = true;
    }

    var mobileValid = false;
    if (phoneno.length == 0) {
      setMobileError('Mobile Number is required');
    } else if (phoneno.length != 10) {
      setMobileError('Please enter 10 digit');
    } else {
      setMobileError('');
      mobileValid = true;
    }

    var addressValid = false;
    if (address.length == 0) {
      setAddressError('Address is required');
    } else {
      setAddressError('');
      addressValid = true;
    }

    var pincodeValid = false;
    if (pincodepattern.test(pincode) === false) {
      setPincodeError('Please enter valid pincode');
    } else {
      setPincodeError('');
      pincodeValid = true;
    }

    var cityValid = false;
    if (city.length == 0) {
      setCityError('City is required');
    } else {
      setCityError('');
      cityValid = true;
    }

    var stateValid = false;
    if (state.length == 0) {
      setStateError('State is required');
    } else {
      setStateError('');
      stateValid = true;
    }

    if (
      bussinessValid &&
      emailValid &&
      mobileValid &&
      pincodeValid &&
      addressValid &&
      cityValid &&
      stateValid
    ) {
      dispatch(updateProfile(data));
      setTriggerEffect(true);
    }
  }

  useEffect(() => {
    if (result.isUpdated) {
      const profiledata = {
        business_name: businessName,
        email_id: email_id,
        phoneno: phoneno,
        customer_Fname: fname,
        customer_Lname: lname,
        dob: dob,
        address: address,
        pincode: pincode,
        city: city,
        state: state,
        register_customer_id: result.register_customer_id,
        device_type: result.device_type,
        token: result.token,
      };
      storeProfileData(profiledata);
    } else if (result.error_type === 'email') {
      setEmailError('The email ID has already been taken');
    }
    if (triggerEffect) {
      setTriggerEffect(false);
    }
  }, [result.isUpdated, result.error_type, triggerEffect]);

  const storeProfileData = async data => {
    try {
      await AsyncStorage.setItem('UserDetails', JSON.stringify(data));
      console.log('Profile data stored successfully in storage');
      dispatch({ type: RESET_VALUE });
      navigation.navigate('Profile');
    } catch (error) {
      console.log('Failed to store profile data in storage:', error);
    }
  };

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
              <Text style={[styles.text, { marginTop: '5%' }]}>First Name</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="default"
                defaultValue={fname}
                onChangeText={text => {
                  setFname(text);
                }}
              />

              <Text style={styles.text}>Last Name</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="default"
                defaultValue={lname}
                onChangeText={text => {
                  setLname(text);
                }}
              />

              <Text style={styles.text}>Bussiness Name</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="default"
                defaultValue={businessName}
                onChangeText={text => {
                  setBusinessName(text);
                }}
              />
              {bussinessError.length > 0 && (
                <Text style={styles.error}>{bussinessError}</Text>
              )}

              <Text style={styles.text}>Mobile Number</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="number-pad"
                maxLength={10}
                defaultValue={phoneno}
                onChangeText={text => {
                  setPhoneno(text);
                }}
              />
              {mobileError.length > 0 && (
                <Text style={styles.error}>{mobileError}</Text>
              )}

              <Text style={styles.text}>Email Address</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="email-address"
                caretHidden={false}
                textContentType='emailAddress'
                autoComplete='email'
                defaultValue={email_id}
                onChangeText={text => {
                  setEmail_id(text);
                }}
              />
              {emailError.length > 0 && (
                <Text style={styles.error}>{emailError}</Text>
              )}

              <Text style={styles.text}>Date of Birth</Text>

              <View style={[{ flexDirection: 'row' }, styles.inputText]}>
                <Text
                  style={styles.dateText}
                  onPress={showDatePicker}>
                  {dob}
                </Text>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={showDatePicker}>
                  <FontAwesome name="calendar" size={25} color={colors.black} />
                </TouchableOpacity>
              </View>

              <Text style={styles.text}>Address</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="default"
                defaultValue={address}
                onChangeText={text => {
                  setAddress(text);
                }}
              />
              {addressError.length > 0 && (
                <Text style={styles.error}>{addressError}</Text>
              )}

              <Text style={styles.text}>Pincode</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="number-pad"
                defaultValue={pincode}
                maxLength={6}
                onChangeText={text => {
                  setPincode(text);
                }}
              />
              {pincodeError.length > 0 && (
                <Text style={styles.error}>{pincodeError}</Text>
              )}

              <Text style={styles.text}>City</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="default"
                defaultValue={city}
                onChangeText={text => {
                  setCity(text);
                }}
              />
              {cityError.length > 0 && (
                <Text style={styles.error}>{cityError}</Text>
              )}

              <Text style={styles.text}>State</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="default"
                defaultValue={state}
                onChangeText={text => {
                  setState(text);
                }}
              />
              {stateError.length > 0 && (
                <Text style={styles.error}>{stateError}</Text>
              )}

              <TouchableOpacity
                style={styles.savebtn}
                onPress={handleSubmit}
                disabled={result.isLoadingButton}
              >
                {
                  result.isLoadingButton ? (<ActivityIndicator size={25} color={colors.white} style={styles.loadingButton} />) :
                    (<Text style={styles.savetext}>Save</Text>)
                }

              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
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
    height: SCREEN_HEIGHT,
    width: SCREEEN_WIDTH,
  },
  loading: {
    marginTop: '2%'
  },
  dateText: {
    fontSize: 13,
    color: colors.greyShade2,
    fontWeight: '500',
    marginBottom: Platform.select({ android: 10 }),
    alignSelf: 'flex-end',
  },
  text: {
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 14,
    color: colors.greyShade3,
    fontWeight: Platform.select({ android: 'bold', ios: '600' }),
  },
  datePicker: {
    marginLeft: '90%',
    position: 'absolute',
    marginTop: 10
  },
  inputText: {
    height: 40,
    borderBottomColor: colors.greyShade1,
    borderBottomWidth: 1,
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: Platform.select({ android: 'serif' }),
    padding: Platform.select({ ios: '3%' }),
    paddingLeft: Platform.select({ android: '3%' }),
    fontSize: 13,
    color: colors.greyShade2,
    fontWeight: Platform.select({ android: '500', ios: '400' }),
  },
  savebtn: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
    backgroundColor: colors.blueShade1,
    borderRadius: 5,
    marginBottom: '35%',
  },
  savetext: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 20,
    margin: '2%',
  },
  loadingButton: {
    margin: '2%'
  },
  error: {
    color: colors.red,
    textAlign: 'right',
    marginRight: '5%',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 13,
    color: colors.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default EditProfile;
