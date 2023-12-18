import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, BackHandler, StyleSheet ,SafeAreaView} from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { colors } from '../theme/colors';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../theme/index'

const ForgetPass = () => {
  const navigation = useNavigation();

  const [mobile, setMobile] = useState("")
  const [mobileError, setMobileError] = useState("")

  const handleSubmit = () => {
    var mobileValid = false;
    if (mobile.length == 0) {
      setMobileError("Mobile number is required");
    }
    else if (mobile.length != 10) {
      setMobileError("Please enter 10 digit");
    }
    else {
      setMobileError("")
      mobileValid = true
    }

    if (mobileValid) {
      navigation.navigate("OTP")
    }

  };


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("SignIn");
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

        <Text style={styles.mobiletxt}>Mobile Number</Text>
        <TextInput
          placeholder="Enter Mobile Number"
          keyboardType="number-pad"
          maxLength={10}
          style={styles.mobilenum}
          onChangeText={text => setMobile(text)} value={mobile} />
        {mobileError.length > 0 &&
          <Text style={styles.error}>{mobileError}</Text>
        }

        <TouchableOpacity
          style={styles.Button}
          onPress={handleSubmit}>
          <Text style={styles.buttontext}>Send OTP</Text>
        </TouchableOpacity>
      </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT
  },
  mobiletxt: {
    marginTop: '50%',
    marginLeft: '5%',
    fontFamily:Platform.select({android:'serif'}),
    fontSize: 14,
    fontWeight:'700',
    color: colors.blueShade1
  },
  mobilenum: {
    backgroundColor: colors.white,
    borderColor: colors.blueShade1,
    borderWidth: 1,
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily:Platform.select({android:'serif'}),
    padding:Platform.select({ios:'3%'}),
    paddingLeft:Platform.select({android:'3%'}),
    fontSize: 13,
    color: colors.blueShade1,
    borderRadius: 5
  },
  Button: {
    backgroundColor: colors.blueShade1,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
    borderRadius: 5,
    marginBottom: 200
  },
  buttontext: {
    color: colors.white,
    fontFamily:Platform.select({android:'serif'}),
    textAlign: "center",
    margin: '2%',
    fontSize: 17,
    fontWeight: "600"
  },
  error: {
    color: colors.red,
    textAlign: 'right',
    marginRight:'5%'
  }
})


export default ForgetPass;
