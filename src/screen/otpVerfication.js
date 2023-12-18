import React, { useRef, useState } from "react";
import { TextInput, Text, View, StyleSheet, TouchableOpacity, BackHandler, SafeAreaView, Platform } from "react-native";
import { images } from "../assets/image/index";
import { colors } from '../theme/colors'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../theme/index'

const OTP = () => {
  const navigation = useNavigation();

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  const pin1ref = useRef(null);
  const pin2ref = useRef(null);
  const pin3ref = useRef(null);
  const pin4ref = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("ForgetPass");
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
      <Text style={styles.text}>Enter OTP</Text>

      <View style={styles.main}>
        <TextInput
          ref={pin1ref}
          placeholder="  "
          keyboardType="number-pad"
          maxLength={1}
          onChange={(pin1) => {
            setPin1(pin1);
            if (pin1 != "") {
              pin2ref.current.focus()
            }
          }}
          style={[styles.otptextbox, { marginRight: '2%' }]} />
        <TextInput
          ref={pin2ref}
          placeholder="  "
          keyboardType="number-pad"
          maxLength={1}
          onChange={(pin2) => {
            setPin2(pin2);
            if (pin2 != "") {
              pin3ref.current.focus()
            }
          }}
          style={[styles.otptextbox, { marginRight: '2%' }]} />
        <TextInput
          ref={pin3ref}
          placeholder=" "
          keyboardType="number-pad"
          maxLength={1}
          onChange={(pin3) => {
            setPin3(pin3);
            if (pin3 != "") {
              pin4ref.current.focus()
            }
          }}
          style={[styles.otptextbox, { marginRight: '2%' }]} />
        <TextInput
          ref={pin4ref}
          placeholder=" "
          keyboardType="number-pad"
          maxLength={1}
          onChange={(pin4) => {
            setPin4(pin4);
          }}
          style={styles.otptextbox} />
      </View>

      <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate("ResetPass")}>
        <Text style={styles.buttontext}>Confirm</Text>
      </TouchableOpacity>

      <Text style={styles.resendtext}>Resend OTP</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  },
  main: {
    flexDirection: "row",
    alignSelf: "center"
  },
  images: {
    height: 200,
    width: 400,
  },
  text: {
    marginTop: '50%',
    color: colors.blueShade1,
    textAlign: "center",
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 17,
    fontWeight: Platform.select({ android: '700', ios: '400' })
  },
  otptextbox: {
    width: SCREEN_HEIGHT / 15,
    textAlign: "center",
    borderBottomColor: colors.blueShade1,
    borderBottomWidth: 2,
    marginTop: '5%',
    fontFamily: Platform.select({ android: 'serif' }),
    padding: Platform.select({ ios: '3%' }),
    paddingLeft: Platform.select({ android: '3%' }),
    fontSize: 14,
    color: colors.blueShade1,
  },
  Button: {
    backgroundColor: colors.blueShade1,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
    borderRadius: 5
  },
  buttontext: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: "center",
    margin: '2%',
    fontSize: 17,
    fontWeight: Platform.select({ android: '200', ios: '400' })
  },
  resendtext: {
    marginTop: '10%',
    textAlign: "center",
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 15,
    fontWeight: Platform.select({ android: '700', ios: '400' }),
    color: colors.blueShade1
  }
})


export default OTP;