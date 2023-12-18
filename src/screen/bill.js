import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useState, useEffect } from 'react';
import { colors } from '../theme/colors';
import {
  BackHandler,
  Alert,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import Card from './card';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBills, removeBill } from '../services/Bill/action';

const Bill = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { customer_service_id, type, customer_id, customerType } = route.params;
  const [token, setToken] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBills, setSelectedBills] = useState([]);
  const [activateDelete, setActivateDelete] = useState(false)

  const result = useSelector(state => state.BillReducer);
  const allBills = result.bills;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const UserDetails = await AsyncStorage.getItem('UserDetails');
      if (UserDetails !== null) {
        const parsedValue = JSON.parse(UserDetails);
        setToken(parsedValue.token);
        setBusinessName(parsedValue.business_name);
        dispatch(getAllBills({ data: { customer_service_id }, token: parsedValue.token }));
      }
    } catch (error) {
      console.error('Error retrieving Data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      const onBackPress = () => {
        if (type === "pending") {
          navigation.navigate('CustomerDetails');
        }
        else if (type === "paid") {
          navigation.navigate('ServiceHistory', { customer_id, customerType });
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const deleteBill = () => {
    dispatch(removeBill({ data: { bill_ids: selectedBills }, token: token }));
  };
  const handleDelete = () => {
    Alert.alert('Delete Bills?', 'Bills will be permanently deleted', [
      { text: 'Yes', onPress: deleteBill },
      { text: 'No' },
    ]);
  };

  useEffect(() => {
    if (result.isRegistered) {
      fetchData();
      setSelectedBills([])
    }
  }, [result.isRegistered]);
  const handleBillForDelete = bill_id => {
    if (selectedBills.length === 0) {
      setSelectedBills([bill_id]);
    } else {
      if (selectedBills.includes(bill_id)) {
        setSelectedBills(prevState => prevState.filter(id => id !== bill_id));
      } else {
        setSelectedBills(prevState => [...prevState, bill_id]);
      }
    }
  };
  useEffect(() => {
    if (selectedBills.length !== 0) {
      setActivateDelete(true)
    }
    else {
      setActivateDelete(false)
    }
  }, [selectedBills])

  const renderItem = ({ item }) => {
    const gfees = item.government_fees + item.government_tex;
    const sfees = item.service_charge + item.service_tex;
    const isSelected = selectedBills.includes(item.bill_id);
    return (
      <TouchableOpacity
        onPress={() => {
          if (selectedBills.length > 0) {
            handleBillForDelete(item.bill_id);
          } else {
            navigation.navigate('AddBill', {
              mode: 'Edit',
              customer_service_id,
              bill_id: item.bill_id,
            });
          }
        }}
        onLongPress={() => handleBillForDelete(item.bill_id)}>
        <Card style={[styles.card, isSelected && styles.selectedCard]}>
          <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.label}>Date-time:</Text>
              <Text
                style={styles.value}>
                {item.date_time}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.label}>Government Fees:</Text>
              <Text
                style={styles.value}>
                {gfees}
              </Text>
            </View>

            <Text style={styles.gsttext}>( Include GST )</Text>

            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
              <Text style={styles.label}>Service Charge:</Text>
              <Text
                style={styles.value}>
                {sfees}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
              <Text style={styles.label}>Total amount:</Text>
              <Text
                style={styles.value}>
                {item.total_amount}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  const noBillsCard = () => {
    return (
      <Card style={[styles.noBillsCard]}>
        <View style={styles.noBillView}>
          <Text style={[styles.noBillsText]}>Oops! Bills not Found</Text>
        </View>
      </Card>
    );
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
          <View style={styles.view}>
            <View style={styles.detailsView}>
              <Text style={[styles.label]}>Business Name:</Text>
              <Text style={[styles.label]}>{businessName}</Text>
            </View>

            <View style={styles.detailsView}>
              <Text style={styles.label}>Service:</Text>
              <Text style={[styles.label]}>{result.service?.service_name}</Text>
            </View>

            {result.sub_service && (
              <View style={styles.detailsView}>
                <Text style={styles.label}>Sub-service:</Text>
                <Text style={[styles.label]}>
                  {result.sub_service?.sub_service_name}
                </Text>
              </View>
            )}

            <View style={styles.listView}>
              {
                allBills && allBills.length === 0 ? (
                  noBillsCard()
                ) :
                  (<FlatList
                    data={allBills}
                    renderItem={renderItem}
                    keyExtractor={item => {
                      return item.bill_id;
                    }}
                    contentContainerStyle={styles.listContainer}
                  />)
              }
            </View>
          </View>
          <View style={styles.listView}>
            {activateDelete ? (<TouchableOpacity
              style={styles.Button}
              onPress={handleDelete}>
              <Text style={styles.btntxt}>Delete Bills</Text>
            </TouchableOpacity>) : (<TouchableOpacity
              style={styles.Button}
              onPress={() =>
                navigation.navigate('AddBill', { mode: 'Add', customer_service_id })
              }>
              <Text style={styles.btntxt}>Add Bill</Text>
            </TouchableOpacity>)}
          </View>

        </React.Fragment>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: SCREEEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  card: {
    marginTop: '4%',
    borderRadius: 5,
    marginLeft: '3%',
    marginRight: '3%',
  },
  label: {
    color: colors.greyShade4,
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 14,
    fontWeight: Platform.select({ android: 'bold', ios: '600' }),
    marginRight: '2%',
  },
  value: {
    color: colors.greyShade4,
    fontFamily: Platform.select({ android: 'serif' }),
    fontSize: 14,
    fontWeight: Platform.select({ android: 'normal', ios: '400' }),
    marginRight: '2%',
  },
  gsttext: {
    textAlign: 'right',
    fontSize: 12,
    fontFamily: Platform.select({ android: 'serif' }),
    color: colors.blueShade1,
    alignSelf: 'flex-end',
  },
  Button: {
    backgroundColor: colors.blueShade1,
    borderRadius: 5,
    marginVertical: '2%',
    width: SCREEEN_WIDTH / 1.1,
    alignSelf: 'center',
  },
  btntxt: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: '3%',
    fontSize: 17,
    fontWeight: Platform.select({ android: '200', ios: '400' }),
  },
  detailsView: {
    flexDirection: 'row',
    marginVertical: '3%',
    marginLeft: '3%',
    marginRight: SCREEEN_WIDTH / 2.8,
  },
  selectedCard: {
    backgroundColor: colors.blueShade4,
  },
  noBillsCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: '5%',
    borderRadius: 5,
    marginTop: '4%',
    marginLeft: '3%',
    marginRight: '3%',
  },
  noBillsText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainContainer: {
    padding: '3%'
  },
  dateTimeContainer: {
    flexDirection: 'row'
  },
  noBillView: {
    padding: '2%'
  },
  loading: {
    marginTop: '2%'
  },
  view: {
    flex: 3
  },
  listView: {
    flex: 1
  },
  listContainer: {
    paddingBottom: '10%'
  },

});

export default Bill;
