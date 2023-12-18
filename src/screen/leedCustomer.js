import React, { useCallback, useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import { colors } from '../theme/colors';
import Card from './card';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCustomers, removeCustomer } from '../services/Customer/action';
import { useDispatch, useSelector } from 'react-redux';

const LeedCustomer = () => {
  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [activateDelete, setActivateDelete] = useState(false)

  const dispatch = useDispatch();
  const result = useSelector(state => state.CustomerReducer);
  const allCustomers = result.customers;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const UserDetails = await AsyncStorage.getItem('UserDetails');
      if (UserDetails !== null) {
        const parsedValue = JSON.parse(UserDetails);
        setToken(parsedValue.token);
        dispatch(
          getAllCustomers({
            data: { register_customer_id: parsedValue.register_customer_id, isConfirm: 0 },
            token: parsedValue.token
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
      fetchData();
      setSelectedCustomers([])
    }, []),
  );

  const deleteCustomer = () => {
    setIsLoading(true)
    dispatch(removeCustomer({ data: { customer_ids: selectedCustomers }, token: token }));
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Customers?',
      'Customers will be permanently deleted',
      [{ text: 'Yes', onPress: deleteCustomer }, { text: 'No' }],
    );
  };


  const handleCustomerForDelete = customer_id => {

    if (selectedCustomers.length === 0) {
      setSelectedCustomers([customer_id]);

    } else {
      if (selectedCustomers.includes(customer_id)) {
        setSelectedCustomers(prevState => prevState.filter(id => id !== customer_id));
      } else {
        setSelectedCustomers(prevState => [...prevState, customer_id]);
      }
    }
  };


  useEffect(() => {
    if (selectedCustomers.length !== 0) {
      setActivateDelete(true)
    }
    else {
      setActivateDelete(false)
    }
  }, [selectedCustomers])

  const handleDialer = phoneno => {
    let phoneNumber = `+91${phoneno}`;

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumber);
  };

  useEffect(() => {
    if (result.isRegistered && navigation.isFocused()) {
      fetchData();
      setSelectedCustomers([])
    }
  }, [result.isRegistered, navigation.isFocused()]);

  const renderItem = ({ item }) => {
    const isSelected = selectedCustomers.includes(item.customer_id);
    return (
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => {
            if (selectedCustomers.length > 0) {
              handleCustomerForDelete(item.customer_id);
            } else {
              navigation.navigate('CustomerService', {
                type: 'leed',
                customer_id: item.customer_id,
              });
            }
          }}
          onLongPress={() => handleCustomerForDelete(item.customer_id)}>
          <Card style={[styles.card, isSelected && styles.selectedCard]}>
            <View style={styles.cardView}>
              <View style={styles.detailsContainer}>
                <Text style={styles.text}>Customer name:</Text>
                <Text
                  style={[
                    styles.textLabel,
                    {
                      marginRight: SCREEEN_WIDTH / 2.5,
                    },
                  ]}>
                  {item.customer_name}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.text}>Mobile Number:</Text>
                <TouchableOpacity onPress={() => handleDialer(item.phoneno)}>
                  <Text
                    style={[
                      styles.textLabel,
                    ]}>
                    {item.phoneno}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.text}>Email:</Text>
                <Text
                  style={[
                    styles.textLabel,
                  ]}>
                  {item.email_id}
                </Text>
              </View>
              {item.gst_number ? (
                <View style={styles.detailsContainer}>
                  <Text style={styles.text}>GST Number:</Text>
                  <Text
                    style={[
                      styles.textLabel,
                    ]}>
                    {item.gst_number}
                  </Text>
                </View>
              ) : null}
            </View>
          </Card>
        </TouchableOpacity>

        <View
          style={styles.editButton}>
          <TouchableOpacity
            style={styles.editContainer}
            onPress={() => {
              navigation.navigate('AddCustomer', {
                mode: 'Edit',
                customer_id: item.customer_id,
                type: 'leed',
              });
            }}
            disabled={isSelected}>
            <FontAwesome name="edit" size={19} color={colors.blueShade1} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const noLeedCustomerCard = () => {
    return (
      <Card style={[styles.noLeedCustomerCard]}>
        <View style={styles.noCardView}>
          <Text style={[styles.noLeedCustomerText]}>Oops! Customers not Found</Text>
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

          <View style={styles.listView}>
            {
              allCustomers && allCustomers.length === 0 ? (
                noLeedCustomerCard()
              ) : (
                <FlatList
                  data={allCustomers}
                  renderItem={renderItem}
                  contentContainerStyle={styles.listContainer}
                />
              )
            }

          </View>

          {activateDelete ? (<TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Customers</Text>
          </TouchableOpacity>) : <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddCustomer', { mode: 'Add', type: 'leed' });
            }}
            style={styles.addButton}
          >
            <Ionicons name="add-circle" size={60} color={colors.blueShade1} />
          </TouchableOpacity>}

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
    flex: 1
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: '5%',
    marginRight: '5%',
  },
  listView: {
    flex: 1
  },
  editContainer: {
    marginTop: '4%',
    marginBottom: '6%',
    alignSelf: 'center'
  },
  noCardView: {
    padding: '2%'
  },
  main: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  card: {
    marginTop: '3%'
  },
  cardView: {
    padding: '2%'
  },
  text: {
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'left',
    marginLeft: '2%',
    marginBottom: '2%',
    fontSize: 12,
    color: colors.greyShade4,
    fontWeight: Platform.select({ android: '800', ios: '500' }),
  },
  listContainer: {
    paddingBottom: Platform.select({ android: '25%', ios: '35%' })
  },
  loading: {
    marginTop: '2%'
  },
  textLabel: {
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'left',
    marginLeft: '2%',
    marginBottom: '2%',
    fontSize: 12,
    color: colors.greyShade4,
    fontWeight: Platform.select({ android: '200', ios: '300' }),
  },
  selectedCard: {
    backgroundColor: colors.blueShade4,
  },
  detailsContainer: {
    flexDirection: 'row'
  },
  noLeedCustomerCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: '5%',
    borderRadius: 5,
    marginTop: '3%'
  },
  deleteButton: {
    backgroundColor: colors.blueShade1,
    alignSelf: 'center',
    borderRadius: 5,
    padding: '3%',
    margin: '3%',
  },
  deleteButtonText: {
    color: 'white',
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    marginHorizontal: '19%',
    fontSize: 17,
    fontWeight: Platform.select({ android: '200', ios: '400' }),
  },
  noLeedCustomerText: {
    fontFamily: Platform.select({ android: 'serif' }),
    marginLeft: '2%',
    marginBottom: '2%',
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    bottom: Platform.select({ android: '2%' }),
    marginTop: Platform.select({ ios: SCREEN_HEIGHT / 1.55 }),
    position: 'absolute',
    width: SCREEEN_WIDTH / 1.1,
    alignSelf: 'center'
  }
});
export default LeedCustomer;
