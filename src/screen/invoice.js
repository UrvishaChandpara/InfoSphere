import { SafeAreaView, StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, ActivityIndicator, Linking, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../theme/colors'
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { apis } from '../services/apiConfig';
import Card from './card';
import moment from 'moment';
import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util'
import { getAllInvoices, removeInvoice, resetValue, updatePayStatus } from '../services/Invoice/action';

const Invoice = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { customer_id, type } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [activateDelete, setActivateDelete] = useState(false)
  const [token, setToken] = useState('');


  const dispatch = useDispatch()
  const result = useSelector(state => state.InvoiceReducer)
  const AllInvoices = result.invoices
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const UserDetails = await AsyncStorage.getItem('UserDetails');
      if (UserDetails !== null) {
        const parsedValue = JSON.parse(UserDetails);
        setToken(parsedValue.token);
        dispatch(
          getAllInvoices({ data: { customer_id }, token: parsedValue.token })
        );
      }
    } catch (error) {
      console.error('Error retrieving Data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInvoice = () => {
    dispatch(removeInvoice({ data: { invoice_ids: selectedInvoices }, token: token }));
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete Invoices?',
      'Invoices will be permanently deleted',
      [{ text: 'Yes', onPress: deleteInvoice }, { text: 'No' }],
    );
  };

  const handleInvoiceForDelete = invoice_id => {
    if (selectedInvoices.length === 0) {
      setSelectedInvoices([invoice_id]);
    } else {
      if (selectedInvoices.includes(invoice_id)) {
        setSelectedInvoices(prevState => prevState.filter(id => id !== invoice_id));
      } else {
        setSelectedInvoices(prevState => [...prevState, invoice_id]);
      }
    }
  };
  useEffect(() => {
    if (selectedInvoices.length !== 0) {
      setActivateDelete(true)
    }
    else {
      setActivateDelete(false)
    }
  }, [selectedInvoices])

  useEffect(() => {
    if (result.isRegistered && navigation.isFocused()) {
      fetchData();
      setSelectedInvoices([])
    }
    else if (result.error_type == 'Fail') {
      Alert.alert(
        '❗Error',
        'Failed to delete Invoice',
        [
          {
            text: 'Ok',
            onPress: () => { dispatch(resetValue()) }
          }
        ],
      );
    }

  }, [result.isRegistered, navigation.isFocused(), result.error_type]);

  const openPDF = async (pdfPath) => {
    try {
      await Linking.openURL(pdfPath);
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();

      const onBackPress = () => {
        if (type === 'leed') {
          navigation.navigate('LeedCustomer');
        } else if (type === 'confirm') {
          navigation.navigate('ConfirmCustomer');
        }

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const updateStatus = (invoice_id) => {
    dispatch(updatePayStatus({ data: { invoice_id }, token }))
  }
  const ShareInvoice = async (invoiceUrl) => {
    try {
      const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        appendExt: 'pdf',
      }).fetch('GET', invoiceUrl)

      const filePath = response.path()

      const shareOptions = {
        title: 'Share Invoice',
        url: `file://${filePath}`,
        type: 'application/pdf',

      };
      await Share.open(shareOptions);
      await ReactNativeBlobUtil.fs.unlink(filePath)
    }
    catch (error) {
      console.log(error)
    }
  }
  const flatRenderList = ({ item }) => {
    const date = moment(item.date_time).format('DD/MM/YYYY');
    const isSelected = selectedInvoices.includes(item.invoice_id);
    const shareIconColor = isSelected ? colors.disabledShareButton : colors.blueShade1;
    const pdfPath = `${apis.generatePDF}${item.pdf_path}`;

    return (
      <View style={[styles.invoiceItem, isSelected && styles.selectedCard]}>
        <TouchableOpacity
          style={styles.pdfButton}
          onPress={() => {
            if (selectedInvoices.length > 0) {
              handleInvoiceForDelete(item.invoice_id);
            } else {
              openPDF(pdfPath);
            }
          }}
          onLongPress={() => handleInvoiceForDelete(item.invoice_id)}
        >
          <View>
            <Text style={styles.dateText}>{date}</Text>
            <View style={styles.pdfButtonContent}>
              <FontAwesome name="file-pdf-o" size={35} color={colors.greyShade4} />
              <View style={styles.titleContainer}>
                <Text style={styles.pdfTitle}>{item.pdf_title}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paidButton, isSelected && styles.disabledPaidButton]}
          disabled={isSelected}
          onPress={() => {
            updateStatus(item.invoice_id);
          }}
        >
          {item.pay_status ? (
            <Text style={styles.paidButtonText}>Paid</Text>
          ) : (
            <Text style={styles.paidButtonText}>Pending</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {
            ShareInvoice(pdfPath);
          }}
          disabled={isSelected}
        >
          <Entypo name="share" size={30} color={shareIconColor} />
        </TouchableOpacity>
      </View>
    );
  };

  const noInvoicesCard = () => {
    return (
      <Card style={[styles.noInvoicesCard]}>
        <View style={styles.noInvoiceView}>
          <Text style={[styles.noInvoicesText]}>Oops! Invoices not Found</Text>
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
          <View style={styles.invoiceListContainer}>
            {
              AllInvoices.length === 0 ? (
                noInvoicesCard()
              ) :
                (
                  <FlatList
                    data={AllInvoices}
                    renderItem={flatRenderList}
                    contentContainerStyle={styles.invoiceListContent}
                  />
                )
            }

          </View>
          <View>
            {activateDelete ? (<TouchableOpacity
              style={styles.Button}
              onPress={handleDelete}>
              <Text style={styles.btntxt}>Delete Invoices</Text>
            </TouchableOpacity>) : null}
          </View>
        </React.Fragment>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT,
    width: SCREEEN_WIDTH
  },
  loading: {
    marginTop: '2%'
  },
  dateText: {
    color: colors.greyShade4,
    marginBottom: '2%'
  },
  invoiceListContainer: {
    flex: 1,
    paddingTop: '2%',
    paddingBottom: '2%'
  },
  titleContainer: {
    flex: 1,
    marginLeft: '2%'
  },
  invoiceListContent: {
    padding: '3%'
  },
  invoiceItem: {
    borderRadius: 5,
    marginBottom: '2%',
    padding: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: colors.lightGrey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2
  },
  pdfButton: {
    flex: 1,
    marginRight: '1%'
  },
  pdfButtonContent: {
    flexDirection: 'row'
  },
  pdfTitle: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: '4%',
    color: colors.greyShade4,
  },
  paidButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: '2%',
    backgroundColor: colors.blueShade1,
    borderRadius: 7,
    height: 40,
    width: '26%'
  },
  paidButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white
  },
  Button: {
    backgroundColor: colors.blueShade1,
    borderRadius: 5,
    marginHorizontal: '5%',
    marginVertical: '5%'
  },
  btntxt: {
    color: colors.white,
    fontFamily: Platform.select({ android: 'serif' }),
    textAlign: 'center',
    margin: '3%',
    fontSize: 17,
    fontWeight: Platform.select({ android: '200', ios: '400' }),
  },
  selectedCard: {
    backgroundColor: colors.blueShade4,
  },
  disabledPaidButton: {
    backgroundColor: colors.offGrey,
  },
  noInvoicesCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: '5%',
    borderRadius: 5,
  },
  noInvoicesText: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noInvoiceView: {
    padding: '2%'
  },
  shareButton: {
    justifyContent: 'center'
  },
  disabledShareButton: {
    color: colors.offGreen
  }
});

export default Invoice;
