import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';

const ResetPass = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
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
      <View style={styles.main}>
        <TextInput
          placeholder="New Password"
          secureTextEntry={true}
          style={styles.fieldBox}
        />

        <TextInput
          placeholder="Re-enter Password"
          secureTextEntry={true}
          style={styles.fieldBox}
        />

        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttontext}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: SCREEEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  main: {
    marginTop: '50%',
    marginLeft: '5%',
    marginRight: '5%'
  },
  fieldBox: {
    backgroundColor: colors.white,
    marginTop: '5%',
    fontFamily: Platform.select({ android: 'serif' }),
    padding: Platform.select({ ios: '3%' }),
    paddingLeft: Platform.select({ android: '3%' }),
    fontSize: 13,
    color: colors.blueShade1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.blueShade1,
  },
  Button: {
    backgroundColor: colors.blueShade1,
    marginTop: '10%',
    borderRadius: 5,
  },
  buttontext: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: '2%',
    fontSize: 17,
    fontWeight: Platform.select({ android: '200', ios: '400' }),
  },
});

export default ResetPass;
