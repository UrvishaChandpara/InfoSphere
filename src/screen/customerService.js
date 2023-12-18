import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../theme/colors";
import CustomerDetails from './customerDetails'
import Invoice from "./invoice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const Top = createMaterialTopTabNavigator();

const CustomerService = () => {
  const navigation = useNavigation()
  const route = useRoute();
  const { customer_id, type } = route.params;

  return (
    <Top.Navigator
      screenOptions={() => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: colors.white,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle
      })}
    >
      <Top.Screen
        name="CustomerDetails"
        options={{ tabBarLabel: 'Services' }}
        component={CustomerDetails}
        initialParams={{ customer_id, type }}
      />
      <Top.Screen
        name="Invoice"
        options={{ tabBarLabel: 'Invoice' }}
        component={Invoice}
        initialParams={{ customer_id, type }}
      />
    </Top.Navigator>
  );
};
const styles=StyleSheet.create({
  tabBarStyle:{
      backgroundColor: colors.blueShade1
  },
  tabBarLabelStyle:{
      fontSize:13
  },
  tabBarIndicatorStyle:{
      backgroundColor:colors.white
  }
})
export default CustomerService;
