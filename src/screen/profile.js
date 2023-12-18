import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDeatils } from '../services/Profile/action';

const Profile = () => {
  const navigation = useNavigation();
  const [active, setactive] = useState(false);
  const dispatch = useDispatch();
  const [gst, setGST] = useState(0);
  const [changeGst, setChangeGst] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [gstError, setGstError] = useState('');

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const gstValue = await AsyncStorage.getItem('gst');
          if (gstValue !== null) {
            const parsedValue = JSON.parse(gstValue);
            setGST(parsedValue.gst);
            setChangeGst(parsedValue.gst)
          }
          const profileDetails = await AsyncStorage.getItem('UserDetails');
          if (profileDetails !== null) {
            const parsedValue = JSON.parse(profileDetails);
            dispatch(
              getProfileDeatils({
                data: { register_customer_id: parsedValue.register_customer_id },
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
      fetchData();
    }, []),
  );

  const result = useSelector(state => state.ProfileReducer);
  const setNewGst = async () => {
    try {
      const gst = await AsyncStorage.getItem('gst');
      const value = { gst: changeGst };
      if (gst != null) {
        await AsyncStorage.setItem('gst', JSON.stringify(value));
        const newValue = await AsyncStorage.getItem('gst');
        if (newValue !== null) {
          setGST(changeGst);
        }
      }
    } catch (error) {
      console.error('Error changing GST:', error);
    }
  };

  const handleGstChange = () => {
    var gstValid = false;
    if (!changeGst) {
      setGstError("Please enter gst");
    }
    else {
      setGstError('');
      gstValid = true;
    }
    if (gstValid) {
      setNewGst();
      setactive(!active);
      // setGstError('')
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      {result.isLoading || isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.blueShade2}
          style={styles.loading}
        />
      ) : (
        <React.Fragment>
          <View style={styles.mainView}>
            <ScrollView style={styles.ScrollView}>
              <View style={styles.detailsParent}>
                <Text
                  style={[
                    styles.text,
                    styles.headerText,
                    {
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      paddingTop: '2%',
                    },
                  ]}>
                  Personal Details
                </Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('EditProfile')}>
                  <FontAwesome5
                    name="user-edit"
                    size={25}
                    color={colors.blueShade1}
                  />
                </TouchableOpacity>

                <View style={[styles.detailsChild]}>
                  <View style={[styles.detailsGrandChild]}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.text}>Full Name : </Text>
                    </View>
                    <Text style={styles.text}>
                      {result.customer_Fname} {result.customer_Lname}
                    </Text>
                  </View>

                  <View style={styles.detailsGrandChild}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.text}>Mobile number : </Text>
                    </View>
                    <Text style={styles.text}>{result.phoneno}</Text>
                  </View>

                  <View style={styles.detailsGrandChild}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.text}>Email Address : </Text>
                    </View>
                    <Text style={styles.text}>{result.email_id}</Text>
                  </View>

                  <View style={styles.detailsGrandChild}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.text}>Date of birth : </Text>
                    </View>
                    <Text style={styles.text}>{result.dob}</Text>
                  </View>
                </View>

                <Text
                  style={[styles.text, { paddingTop: '2%' }, styles.headerText]}>
                  Bussiness Details
                </Text>
                <View style={[styles.detailsChild, { marginTop: '10%' }]}>
                  <View style={styles.detailsGrandChild}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.text}>Bussiness Name : </Text>
                    </View>
                    <Text style={styles.text}>{result.business_name}</Text>
                  </View>

                  <View style={styles.detailsGrandChild}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.text}>Address : </Text>
                    </View>
                    <Text style={styles.text}>
                      {result.address},{result.pincode},{result.city},
                      {result.state}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.detailsParent}>
                <Text
                  style={[
                    styles.text,
                    styles.headerText,
                    {
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      paddingTop: '2%',
                    },
                  ]}>
                  GST Details
                </Text>
                <View style={[styles.detailsChild, { marginTop: '10%' }]}>
                  <View style={styles.detailsGrandChild}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.text}>GST : </Text>
                    </View>
                    <Text style={styles.text}>{gst}%</Text>
                    <TouchableOpacity
                      style={{ marginLeft: '70%' }}
                      onPress={() => {
                        setactive(true);
                      }}>
                      <MaterialIcons
                        name="edit"
                        size={30}
                        color={colors.blueShade1}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <Modal animationType="slide" isVisible={active}>
            <View style={styles.modal}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setGstError('')
                  setactive(!active);
                }}>
                <AntDesign
                  name="closecircleo"
                  size={17}
                  color={colors.blueShade1}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Enter GST"
                keyboardType="number-pad"
                style={[
                  styles.feildbox,
                  { marginLeft: '5%', marginTop: '12%' },
                ]}
                defaultValue={gst.toString()}
                onChangeText={text => {
                  setChangeGst(parseInt(text));
                }}
              />
              {gstError.length > 0 &&
                <Text style={styles.error}>{gstError}</Text>
              }
              <TouchableOpacity
                style={styles.confirmbtn}
                onPress={
                  handleGstChange
                }>
                <Text style={styles.confirmtxt}>Change</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    height: SCREEN_HEIGHT,
    width: SCREEEN_WIDTH,
    backgroundColor: colors.white,
  },
  mainView: {
    height: SCREEN_HEIGHT / 1.25
  },
  labelContainer: {
    width: '50%'
  },
  text: {
    color: colors.black,
    fontFamily: Platform.select({ android: 'serif' }),
    fontWeight: Platform.select({ android: '700', ios: '500' }),
  },
  loading: {
    marginTop: '2%'
  },
  editButton: {
    marginLeft: '85%',
    marginTop: '2%'
  },
  closeButton: {
    position: 'absolute',
    marginLeft: '91%',
    marginTop: '3%',
  },
  headerText: {
    textAlign: 'center',
    paddingBottom: '2%',
    backgroundColor: colors.greyShade1,
    color: colors.greyShade4,
    fontWeight: Platform.select({ android: '700', ios: '700' }),
  },
  ScrollView: {
    marginBottom: '10%'
  },
  detailsParent: {
    marginTop: '10%',
    borderRadius: 20,
    borderColor: colors.greyShade4,
    borderWidth: 1,
    marginLeft: '2%',
    overflow: 'hidden',
    marginRight: '2%',
  },
  detailsChild: {
    paddingRight: '35%',
    paddingLeft: '4%',
    marginBottom: '2%',
  },
  detailsGrandChild: {
    flexDirection: 'row',
    paddingBottom: '10%',
  },
  Modaltext: {
    textAlign: 'left',
    marginLeft: '2%',
    margin: '1%',
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 12,
    color: colors.black,
    fontWeight: Platform.select({ android: '800', ios: '500' }),
  },
  feildbox: {
    backgroundColor: colors.white,
    borderColor: colors.blueShade1,
    borderWidth: 1,
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: Platform.select({ android: 'serif' }),
    padding: Platform.select({ ios: '3%' }),
    paddingLeft: Platform.select({ android: '3%' }),
    fontSize: 12,
    color: colors.greyShade3,
    borderRadius: 5,
  },
  confirmbtn: {
    backgroundColor: colors.blueShade1,
    marginTop: '7%',
    marginBottom: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 5,
  },
  confirmtxt: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: '2.5%',
    fontSize: 15,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  error: {
    fontFamily: Platform.select({ android: 'serif' }),
    color: colors.red,
    textAlign: 'right',
    marginRight: '5%',
    marginLeft: '2%'
  }
});

export default Profile;
