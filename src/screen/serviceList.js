import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { colors } from '../theme/colors';
import {
  useFocusEffect,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import Card from './card';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';
import ServiceModal from './modals/serviceModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllServices } from '../services/Service/action';
import { useDispatch, useSelector } from 'react-redux';

const ServiceList = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [active, setactive] = useState(false);
  const [modalbtn, setModalbtn] = useState('');
  const [service_id, setServiceId] = useState('');
  const [service_name, setServiceName] = useState('');
  const [register_customer_id, setRegisterCustomerId] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const result = useSelector(state => state.ServiceReducer);
  const allServices = result.services;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const UserDetails = await AsyncStorage.getItem('UserDetails');
      if (UserDetails !== null) {
        const parsedValue = JSON.parse(UserDetails);
        setRegisterCustomerId(parsedValue.register_customer_id);
        setToken(parsedValue.token);
        dispatch(
          getAllServices({
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
  useFocusEffect(
    useCallback(() => {
      if (!active) {
        fetchData();
      }
    }, [active]),
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.mainContainer}>

        <Card style={styles.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SubServiceList', { service_id: item.service_id })
            }>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {item.service_name}
              </Text>
            </View>

          </TouchableOpacity>
        </Card>
        <View
          style={styles.editButton}>
          <TouchableOpacity
            style={styles.editContainer}
            onPress={() => {
              setactive(true);
              setModalbtn('Edit');
              setServiceId(item.service_id);
              setServiceName(item.service_name);
            }}>
            <AntDesign name="edit" size={18} color={colors.blueShade1} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const noServiceCard = () => {
    return (
      <Card style={[styles.card, styles.noServiceCard]}>
        <View style={styles.noCardView}>
          <Text style={[styles.text, styles.noServiceText]}>Oops! Services not Found</Text>
        </View>
      </Card>
    );
  };

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
          <View style={styles.list}>
            {
              allServices.length === 0 ? (
                noServiceCard()
              ) : (
                <FlatList
                  data={allServices}
                  renderItem={renderItem}
                  contentContainerStyle={styles.listContainer}
                />
              )
            }

          </View>

          <View
            style={styles.add}>
            <TouchableOpacity
              onPress={() => {
                setactive(true);
                setModalbtn('Add');
                setServiceId('');
                setServiceName('');
              }}>
              <Ionicons name="add-circle" size={60} color={colors.blueShade1} />
            </TouchableOpacity>
          </View>

          <ServiceModal
            isVisible={active}
            onPress={() => {
              setactive(false);
            }}
            buttonText={modalbtn}
            service_id={service_id}
            service_name={service_name}
            register_customer_id={register_customer_id}
            token={token}
          />
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

export default ServiceList;

const styles = StyleSheet.create({
  card: {
    marginTop: '3%',
    borderRadius: 5,
  },
  add: {
    alignSelf: 'flex-end',
    bottom: Platform.select({ android: '5%' }),
    marginTop: Platform.select({ ios: SCREEN_HEIGHT / 1.4 }),
    position: 'absolute',
  },
  noCardView: {
    padding: '2%'
  },
  listContainer: {
    paddingBottom: '32%'
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: '5%',
    marginRight: '2%',
    alignItems: 'center',
  },
  text: {
    textAlign: 'left',
    marginLeft: '2%',
    margin: '1%',
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 12,
    color: colors.greyShade4,
    fontWeight: Platform.select({ android: '200', ios: '300' }),
  },
  loading: {
    marginTop: '2%'
  },
  list: {
    height: SCREEN_HEIGHT / 1.27
  },
  editContainer: {
    alignSelf: 'center',
    marginLeft: '87%',
    paddingHorizontal: '2%',
    paddingVertical: '1%'
  },
  main: {
    width: SCREEEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.white,
    flex: 1
  },
  feildbox: {
    backgroundColor: colors.white,
    borderColor: colors.blueShade1,
    borderWidth: 1,
    marginLeft: '5%',
    marginRight: '5%',
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 12,
    color: colors.blueShade1,
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: 'row',
    width: '87%',
    padding: '2%'
  },
  mainContainer: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  noServiceCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: '5%',
    borderRadius: 5,
  },
  noServiceText: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  confirmbtn: {
    backgroundColor: colors.blueShade1,
    marginTop: '10%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 5,
  },
  confirmtxt: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: '2%',
    fontSize: 15,
  },
  modal: {
    height: 200,
    backgroundColor: colors.white,
    borderColor: colors.blueShade1,
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '50%',
  },
  ServiceModal: {
    backgroundColor: colors.white,
    borderColor: colors.blueShade1,
    borderWidth: 2,
    width: SCREEEN_WIDTH / 4,
  },
  modaltxt: {
    fontSize: 13,
    fontFamily: Platform.select({ android: 'serif' }),
    borderBottomColor: colors.blueShade1,
    borderBottomWidth: 1,
    width: 100,
    height: 27,
    color: colors.black,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
