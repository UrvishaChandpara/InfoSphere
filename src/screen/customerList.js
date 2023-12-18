import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LeedCustomer from '../screen/leedCustomer';
import ConfirmCustomer from '../screen/confirmCustomer';
import { colors } from "../theme/colors";
import { StyleSheet } from "react-native";

const Top = createMaterialTopTabNavigator();


const CustomerList = () => {
    return (
        <Top.Navigator screenOptions={() => ({
            tabBarStyle:  styles.tabBarStyle ,
            tabBarActiveTintColor: colors.white,
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIndicatorStyle: styles.tabBarIndicatorStyle
        })}>
            <Top.Screen name="LeedCustomer"
                component={LeedCustomer}
                options={{ tabBarLabel: 'Leed Customer' }} />
            <Top.Screen name="ConfirmCustomer"
                component={ConfirmCustomer}
                options={{ tabBarLabel: 'Confirm Customer' }} />
        </Top.Navigator>
    )
}
const styles=StyleSheet.create({
    tabBarStyle:{
        backgroundColor: colors.blueShade1
    },
    tabBarLabelStyle:{
        fontSize:10
    },
    tabBarIndicatorStyle:{
        backgroundColor:colors.white
    }
})
export default CustomerList;