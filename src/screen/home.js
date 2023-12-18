import React, { useEffect } from "react";
import { BackHandler, Platform, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../theme/colors";
import CustomerList from "./customerList";
import ServiceList from "./serviceList";
import Profile from "./profile";
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logout from "./Button/logout";

const Tab = createBottomTabNavigator();

const Home = () => {

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
    });
    const setGST = async () => {
      try {
        const gst = await AsyncStorage.getItem('gst');
        const value = { gst: 18 }
        if (gst === null) {
          await AsyncStorage.setItem('gst', JSON.stringify(value))
        }
      }
      catch (e) {
        console.log(e)
      }
    }
    setGST()
  }, []);

  return (

    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarActiveBackgroundColor: colors.blueShade1,
      tabBarInactiveBackgroundColor: colors.white,
      tabBarActiveTintColor: colors.blueShade1,
      tabBarInactiveTintColor: colors.blueShade1,
      tabBarStyle: styles.tabBarStyle,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerTitleAlign: "center",
      headerRight: () => (
        <Logout />
      ),
      tabBarLabel: ({ focused }) => (
        <View style={[styles.tabLabelContainer]}>
          {route.name === "CustomerList" && (
            <FontAwesome name={focused ? "address-book" : "address-book-o"} size={25} color={focused ? 'white' : colors.blueShade1} />
          )}
          {route.name === "ServiceList" && (
            <FontAwesome5 name="cogs" size={25} color={focused ? 'white' : colors.blueShade1} />
          )}
          {route.name === "Profile" && (
            <FontAwesome name={focused ? "user-o" : "user-circle-o"} size={25} color={focused ? colors.white : colors.blueShade1} />
          )}
          {focused && (
            <Text style={styles.text}>
              {route.name === "CustomerList"
                ? 'Customer List'
                : route.name === "ServiceList"
                  ? 'Service List'
                  : 'Profile'
              }
            </Text>
          )}
        </View>
      ),

      tabBarIcon: ({ focused }) => null, // Hide default icon
    })}>

      <Tab.Screen name="CustomerList"
        component={CustomerList}
        options={{
          headerTitle: ('Customer List'),
        }}
      />
      <Tab.Screen name="ServiceList"
        component={ServiceList}
        options={{
          headerTitle: ('Service List'),
        }}
      />
      <Tab.Screen name="Profile"
        component={Profile}
        options={{
          headerTitle: ('Profile'),
        }}
      />
    </Tab.Navigator>

  )
}

const styles = StyleSheet.create({
  tabLabelContainer: {
    alignItems: 'center',

  },
  text: {
    fontSize: 8,
    color: "white",
    alignSelf: 'center',
    textAlign: 'center',
  },
  tabBarStyle: {
    backgroundColor: colors.white,
    borderTopColor: colors.blueShade1
  },
  headerStyle: {
    backgroundColor: colors.blueShade1
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: Platform.select({ android: '700', ios: '500' })
  }

});

export default Home;
