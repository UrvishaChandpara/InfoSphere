import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { SCREEEN_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '../theme/index';
import { useDispatch, useSelector } from 'react-redux';
import { loginDetails, RESET_VALUE } from '../services/Login/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [triggerEffect, setTriggerEffect] = useState(false);
  const data = { email_id: email, password: password };

  const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const resetSignInState = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  };

  const result = useSelector(state => state.LoginReducer);

  useEffect(() => {
    if (result.isLoggedIn) {
      const logindata = {
        business_name: result.business_name,
        email_id: result.email_id,
        phoneno: result.phoneno,
        device_type: result.device,
        token: result.token,
        register_customer_id: result.register_customer_id,
        customer_Fname: result.customer_Fname,
        customer_Lname: result.customer_Lname,
        dob: result.dob,
        address: result.address,
        pincode: result.pincode,
        city: result.city,
        state: result.state,
      };
      storeLoginData(logindata);
    } else {
      if (result.error_type == 'email') {
        setEmailError('User not found');
        setPasswordError('');
      } else if (result.error_type == 'password') {
        setEmailError('');
        setPasswordError('Invalid Password');
      } else {
        setEmailError('');
        setPasswordError('');
      }
    }
    if (triggerEffect) {
      setTriggerEffect(false);
    }
  }, [result.isLoggedIn, result.error_type, triggerEffect]);

  const storeLoginData = async data => {
    try {
      await AsyncStorage.setItem('UserDetails', JSON.stringify(data));
      console.log('Login data stored successfully in storage');
      dispatch({ type: RESET_VALUE });
      navigation.navigate('Home');
    } catch (error) {
      console.log('Failed to store Login data in storage:', error);
    }
  };
  const handleSubmit = () => {
    var emailValid = false;
    if (email.length === 0) {
      console.log('email', email);
      setEmailError('Email is required');
    } else if (emailpattern.test(email) === false) {
      setEmailError('Please enter valid email');
    } else {
      setEmailError('');
      emailValid = true;
    }

    var passwordValid = false;
    if (password.length === 0) {
      setPasswordError('Password is required');
      console.log('pass', passwordError);
    } else if (password.length < 6) {
      setPasswordError('Password should be minimum 6 characters');
    } else if (password.indexOf(' ') >= 0) {
      setPasswordError('Password cannot contain spaces');
    } else {
      setPasswordError('');
      passwordValid = true;
    }

    if (emailValid && passwordValid) {
      dispatch(loginDetails({ data }));
      setTriggerEffect(true);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
    });

    if (isFocused) {

      resetSignInState();
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
      });
    };
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.logintxt}>Login</Text>

        <View style={styles.loginContainer}>
          <Text style={styles.feildtxt}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            caretHidden={false}
            textContentType='emailAddress'
            autoComplete='email'
            style={styles.feildbox}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          {emailError.length > 0 && (
            <Text style={styles.error}>{emailError}</Text>
          )}

          <Text style={[styles.feildtxt, { marginTop: '5%' }]}>Password</Text>
          <View style={[styles.feildbox, styles.flex]}>
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

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPass')}
            style={{
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginTop: '5%',
            }}>
            <Text style={styles.forgetpass}>ForgotPassword?</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.Button} onPress={handleSubmit}
            disabled={result.isLoadingButton}>
            {
              result.isLoadingButton ? (<ActivityIndicator size={25} color={colors.white} style={styles.loadingButton} />) : (
                <Text style={styles.signintxt}>LOGIN</Text>
              )
            }

          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10%',
            }}>
            <Text style={styles.Text}>Don't have an account?</Text>
            <TouchableOpacity
              style={{ marginLeft: '2%' }}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.Signup}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  loadingButton: {
    margin: '2%'
  },
  loginContainer: {
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  logintxt: {
    textAlign: 'center',
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 25,
    color: colors.blueShade1,
    marginTop: '20%',
    fontWeight: Platform.select({ android: '700', ios: '700' }),
  },
  feildtxt: {
    marginTop: '2%',
    fontWeight: Platform.select({ android: '700', ios: '500' }),
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 14,
    color: colors.greyShade3,
  },
  feildbox: {
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
  eyeicon: {
    position: 'absolute',
    alignSelf: 'center',
    marginLeft: SCREEEN_WIDTH / 1.25,
  },
  forgetpass: {
    color: colors.blueShade1,
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 12,
    fontWeight: Platform.select({ android: '700', ios: '500' }),
  },
  Button: {
    backgroundColor: colors.blueShade1,
    marginTop: '10%',
    borderRadius: 5,
    height: '13%',
    justifyContent: 'center',
  },
  signintxt: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: '2%',
    fontSize: 17,
    fontWeight: Platform.select({ android: '700', ios: '600' }),
  },
  Text: {
    textAlign: 'center',
    fontFamily: Platform.select({ android: 'serif' }),
    color: colors.blueShade1,
  },
  Signup: {
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

export default SignIn;
