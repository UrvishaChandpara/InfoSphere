import { View, Text, TouchableOpacity,SafeAreaView,StyleSheet, Alert } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { colors } from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const Logout = () => {
    const navigation = useNavigation();
    const confirmLogOut=()=>{
        Alert.alert('LogOut', "Are you sure you want to LogOut?", [
            {
                text: 'Yes',
                onPress: () => handleLogOut(),
              },
              { text: 'No' },
          ]);
    }
    const handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem('UserDetails');
            console.log('UserDetails removed successfully.');

            navigation.navigate('SignIn');
        } catch (error) {
            console.log('Error removing UserDetails:', error);
        }
    }
    return (
        <SafeAreaView style={styles.main}>
            <TouchableOpacity onPress={confirmLogOut}>
                <MaterialIcons name="logout" size={29} color={colors.white} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    main:{
        marginRight: 10
    }
})

export default Logout