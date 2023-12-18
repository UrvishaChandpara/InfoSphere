import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { colors } from '../theme/colors';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';
import { useDispatch, useSelector } from 'react-redux';
import { registrationDetails, RESET_VALUE } from '../services/Registration/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [hidePass, setHidePass] = useState(true);
  const [hidePass1, setHidePass1] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [bussiness, setBussiness] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [conPass, setConPass] = useState('');
  const [device, setDevice] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [triggerEffect, setTriggerEffect] = useState(false);
  const data = {
    business_name: bussiness,
    email_id: email,
    password: password,
    phoneno: mobile,
    device_type: device,
    address: address,
    pincode: pincode,
    city: city,
    state: state,
  };

  const [bussinessError, setBussinessError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [conPassError, setConPassError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const pincodepattern = /^[1-9][0-9]{5}$/;

  const result = useSelector(state => state.RegistrationReducer);

  useEffect(() => {
    let currentDevice = '';
    if (Platform.OS === 'android') {
      currentDevice = 'android';
    } else if (Platform.OS === 'ios') {
      currentDevice = 'ios';
    }
    setDevice(currentDevice);
  }, []);

  useEffect(() => {
    if (result.isRegistered) {
      const registrationdata = {
        business_name: result.business_name,
        email_id: result.email_id,
        phoneno: result.phoneno,
        address: result.address,
        pincode: result.pincode,
        city: result.city,
        state: result.state,
        device_type: device,
        token: result.token,
        register_customer_id: result.register_customer_id,
      };
      storeRegistrationData(registrationdata);
    } else {
      if (result.error_type == 'email') {
        setEmailError('The email ID has already been taken');
      }
    }
    if (triggerEffect) {
      setTriggerEffect(false);
    }
  }, [result.isRegistered, result.error_type, triggerEffect]);

  const storeRegistrationData = async data => {
    try {
      await AsyncStorage.setItem('UserDetails', JSON.stringify(data));
      console.log('Registration data stored successfully in storage');
      dispatch({ type: RESET_VALUE });
      navigation.navigate('Home');
    } catch (error) {
      console.log('Failed to store registration data in storage:', error);
    }
  };

  function handleSubmit() {
    var bussinessValid = false;
    if (bussiness.length == 0) {
      setBussinessError('Bussiness name is required');
    } else {
      setBussinessError('');
      bussinessValid = true;
    }

    var emailValid = false;
    if (email.length == 0) {
      setEmailError('Email is required');
    } else if (emailpattern.test(email) === false) {
      setEmailError('Please enter valid email');
    } else {
      setEmailError('');
      emailValid = true;
    }

    var mobileValid = false;
    if (mobile.length == 0) {
      setMobileError('Mobile Number is required');
    } else if (mobile.length != 10) {
      setMobileError('Please enter 10 digit');
    } else {
      setMobileError('');
      mobileValid = true;
    }

    var passwordValid = false;
    if (password.length == 0) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password should be minimum 6 characters');
    } else if (password.indexOf(' ') >= 0) {
      setPasswordError('Password cannot contain spaces');
    } else {
      setPasswordError('');
      passwordValid = true;
    }

    var conPassValid = false;
    if (conPass.length == 0) {
      setConPassError('Confirm Password is required');
    } else if (password != conPass) {
      setConPassError("Password and Confirm password doesn't match");
    } else {
      setConPassError('');
      conPassValid = true;
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
      passwordValid &&
      conPassValid &&
      addressValid &&
      pincodeValid &&
      cityValid &&
      stateValid
    ) {
      dispatch(registrationDetails(data));
      setTriggerEffect(true);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      setEmailError('')
      const onBackPress = () => {
        navigation.navigate('SignIn');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.text}>Bussiness Name</Text>
          <TextInput
            placeholder="Enter your Bussiness Name"
            keyboardType="name-phone-pad"
            style={styles.fieldbox}
            onChangeText={text => setBussiness(text)}
            value={bussiness}
          />
          {bussinessError.length > 0 && (
            <Text style={styles.error}>{bussinessError}</Text>
          )}

          <Text style={styles.text}>Email</Text>
          <TextInput
            placeholder="Enter your Email"
            keyboardType="email-address"
            caretHidden={false}
            textContentType='emailAddress'
            autoComplete='email'
            style={styles.fieldbox}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          {emailError.length > 0 && (
            <Text style={styles.error}>{emailError}</Text>
          )}

          <Text style={styles.text}>Mobile Number</Text>
          <TextInput
            placeholder="Enter your Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.fieldbox}
            onChangeText={text => setMobile(text)}
            value={mobile}
          />
          {mobileError.length > 0 && (
            <Text style={styles.error}>{mobileError}</Text>
          )}

          <Text style={styles.text}>Address</Text>
          <TextInput
            placeholder="Enter your Address"
            keyboardType="name-phone-pad"
            style={styles.fieldbox}
            onChangeText={text => setAddress(text)}
            value={address}
          />
          {addressError.length > 0 && (
            <Text style={styles.error}>{addressError}</Text>
          )}

          <Text style={styles.text}>Pincode</Text>
          <TextInput
            placeholder="Enter your Pincode"
            keyboardType="number-pad"
            maxLength={6}
            style={styles.fieldbox}
            onChangeText={text => setPincode(text)}
            value={pincode}
          />
          {pincodeError.length > 0 && (
            <Text style={styles.error}>{pincodeError}</Text>
          )}

          <Text style={styles.text}>City</Text>
          <TextInput
            placeholder="Enter your City"
            keyboardType="name-phone-pad"
            style={styles.fieldbox}
            onChangeText={text => setCity(text)}
            value={city}
          />
          {cityError.length > 0 && (
            <Text style={styles.error}>{cityError}</Text>
          )}

          <Text style={styles.text}>State</Text>
          <TextInput
            placeholder="Enter your State"
            keyboardType="name-phone-pad"
            style={styles.fieldbox}
            onChangeText={text => setState(text)}
            value={state}
          />
          {stateError.length > 0 && (
            <Text style={styles.error}>{stateError}</Text>
          )}

          <Text style={styles.text}>Password</Text>
          <View style={[styles.fieldbox, styles.flex]}>
            <TextInput
              placeholder="Enter Password"
              secureTextEntry={hidePass ? true : false}
              style={{
                fontSize: 13,
                color: colors.greyShade2,
                width: SCREEEN_WIDTH / 1.3,
              }}
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <FontAwesome
              name={hidePass ? 'eye-slash' : 'eye'}
              size={20}
              color={colors.greyShade2}
              style={styles.eyeicon}
              onPress={() => setHidePass(!hidePass)}
            />
          </View>
          {passwordError.length > 0 && (
            <Text style={styles.error}>{passwordError}</Text>
          )}

          <Text style={styles.text}>Confirm Password</Text>
          <View style={[styles.fieldbox, styles.flex]}>
            <TextInput
              placeholder="Enter Confirm Password"
              secureTextEntry={hidePass1 ? true : false}
              style={{
                fontSize: 13,
                color: colors.greyShade2,
                width: SCREEEN_WIDTH / 1.3,
              }}
              onChangeText={text => setConPass(text)}
              value={conPass}
            />
            <FontAwesome
              name={hidePass1 ? 'eye-slash' : 'eye'}
              size={20}
              color={colors.greyShade2}
              style={styles.eyeicon}
              onPress={() => setHidePass1(!hidePass1)}
            />
          </View>
          {conPassError.length > 0 && (
            <Text style={styles.error}>{conPassError}</Text>
          )}

          <TouchableOpacity style={styles.Button} onPress={handleSubmit}
            disabled={result.isLoadingButton}>
            {
              result.isLoadingButton ? (<ActivityIndicator size={25} color={colors.white} style={styles.loadingButton} />) : (
                <Text style={styles.signuptxt}>Signup</Text>
              )
            }

          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: '10%',
            }}>
            <Text style={styles.Text}>Already have Account?</Text>
            <TouchableOpacity
              style={{ marginLeft: '2%' }}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.Login}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT,
    width: SCREEEN_WIDTH,
  },
  main: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  loadingButton: {
    margin: '3.5%'
  },
  title: {
    textAlign: 'center',
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 25,
    color: colors.blueShade1,
    marginTop: '10%',
    fontWeight: Platform.select({ android: '700', ios: '500' }),
  },
  text: {
    marginTop: '5%',
    fontWeight: Platform.select({ android: '700', ios: '500' }),
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 14,
    color: colors.greyShade3,
  },
  eyeicon: {
    position: 'absolute',
    alignSelf: 'center',
    marginLeft: SCREEEN_WIDTH / 1.25,
  },
  fieldbox: {
    backgroundColor: colors.white,
    borderColor: colors.blueShade1,
    borderWidth: 1,
    marginTop: '1%',
    fontFamily: Platform.select({ android: 'serif' }),
    padding: Platform.select({ ios: '3%' }),
    paddingLeft: Platform.select({ android: '3%' }),
    fontSize: 13,
    color: colors.greyShade2,
    borderRadius: 5,
  },
  flex: {
    flexDirection: 'row',
  },
  Button: {
    backgroundColor: colors.blueShade1,
    marginTop: '10%',
    borderRadius: 5,
  },
  signuptxt: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: '3.5%',
    fontSize: 17,
    fontWeight: Platform.select({ android: '700', ios: '600' }),
  },
  Text: {
    textAlign: 'center',

    color: colors.blueShade1,
  },
  Login: {
    textAlign: 'center',
    fontFamily: Platform.select({ android: 'serif' }),
    fontWeight: Platform.select({ android: 'bold', ios: '700' }),
    textAlignVertical: 'center',
    color: colors.blueShade1,
  },
  error: {
    color: colors.red,
    textAlign: 'right',
  },
});

export default Signup;
