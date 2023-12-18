import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { handleError } from '../../services/Customer/action';
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import { colors } from '../../theme/colors';

const Back = ({navigation}) => {
    const dispatch = useDispatch()
    const handleBackPress = () => {
        navigation.goBack();
        dispatch(handleError());
    };
    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={handleBackPress}
            >
                <AntDesign name="arrowleft" size={25} color={colors.white} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Back