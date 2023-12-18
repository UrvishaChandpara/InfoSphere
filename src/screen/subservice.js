import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { colors } from '../theme/colors';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Card from './card';
import SubServiceModal from './modals/subServiceModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubServices } from '../services/Sub Service/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubServiceList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { service_id } = route.params;

  const [active, setactive] = useState(false);
  const [modalbtn, setModalbtn] = useState('false');
  const [sub_service_id, setSubServiceId] = useState('');
  const [sub_service_name, setSubServiceName] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const result = useSelector(state => state.SubServiceReducer);
  const allSubServices = result.subServices;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const UserDetails = await AsyncStorage.getItem('UserDetails');
      if (UserDetails !== null) {
        const parsedValue = JSON.parse(UserDetails);
        setToken(parsedValue.token);
        dispatch(
          getAllSubServices({ data: { service_id: service_id }, token: parsedValue.token }),
        );
      }
    } catch (error) {
      console.error('Error retrieving Data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!active) {
        fetchData();
      }
      const onBackPress = () => {
        navigation.navigate('ServiceList');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [active]),
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.mainContainer}>
        <Card style={styles.card}>
          <View style={styles.nameView}>
            <Text style={styles.text}>{item.sub_service_name}</Text>
          </View>
        </Card>
        <View
          style={styles.editButton}>
          <TouchableOpacity
            style={styles.editContainer}
            onPress={() => {
              setactive(true);
              setModalbtn('Edit');
              setSubServiceId(item.sub_service_id);
              setSubServiceName(item.sub_service_name);
            }}>
            <AntDesign name="edit" size={18} color={colors.blueShade1} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const noSubServiceCard = () => {
    return (
      <Card style={[styles.noSubServiceCard]}>
        <View style={styles.cardView}>
          <Text style={[styles.noSubServiceText]}>Oops! Sub Services not Found</Text>
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
              allSubServices.length === 0 ? (
                noSubServiceCard()
              ) : (
                <FlatList
                  data={allSubServices}
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
                setSubServiceId('');
                setSubServiceName('');
              }}>
              <Ionicons name="add-circle" size={60} color={colors.blueShade1} />
            </TouchableOpacity>
          </View>
          <SubServiceModal
            isVisible={active}
            onPress={() => {
              setactive(false);
            }}
            buttonText={modalbtn}
            sub_service_id={sub_service_id}
            sub_service_name={sub_service_name}
            service_id={service_id}
            token={token}
          />
        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

export default SubServiceList;

const styles = StyleSheet.create({
  card: {
    marginTop: '3%'
  },
  listContainer: {
    paddingBottom: '32%'
  },
  editContainer: {
    alignSelf: 'center',
    marginLeft: '87%'
  },
  loading: {
    marginTop: '2%'
  },
  cardView: {
    padding: '2%'
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: '5%',
    marginRight: '2%',
    alignItems: 'center',
  },
  list: {
    height: SCREEN_HEIGHT / 1.18
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
  add: {
    alignSelf: 'flex-end',
    bottom: Platform.select({ android: '6%' }),
    marginTop: Platform.select({ ios: SCREEN_HEIGHT / 1.30 }),
    position: 'absolute',
  },
  mainContainer: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  nameView: {
    flexDirection: 'row',
    width: '87%',
    padding: '2%'
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
  noSubServiceCard: {
    marginTop: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: '5%',
    borderRadius: 5,
  },
  noSubServiceText: {
    marginLeft: '2%',
    margin: '1%',
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  confirmbtn: {
    backgroundColor: colors.blueShade1,
    marginTop: '15%',
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
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEEN_WIDTH / 4,
    marginLeft: '40%',
    marginTop: '50%',
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
