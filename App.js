import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar, View,TouchableOpacity ,Text} from "react-native";
import 'react-native-gesture-handler';
import AddCustomer from "./src/screen/addCustomer";
import AddBill from "./src/screen/addBill";
import CustomerService from "./src/screen/customerService";
import EditProfile from "./src/screen/editProfile";
import ForgetPass from "./src/screen/forgetPass";
import Home from "./src/screen/home";
import Bill from "./src/screen/bill";
import OTPSignup from "./src/screen/otpSignup";
import OTP from "./src/screen/otpVerfication";
import ResetPass from "./src/screen/resetPass";
import SignIn from "./src/screen/signin";
import Signup from "./src/screen/signup";
import Splash from "./src/screen/splash";
import SubServiceList from "./src/screen/subservice";
import { colors } from './src/theme/colors';
import Logout from "./src/screen/Button/logout";
import Back from "./src/screen/Button/back";
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ServiceHistory from "./src/screen/serviceHistory";

const stack = createNativeStackNavigator();
const App = () => {
    // const navigation=useNavigation()
    // const handleNavigation=(route)=>{
    //     navigation.navigate("ServiceHistory",{type:route.params.type,customer_id:route.params.customer_id})
    // }
    return (
        <NavigationContainer>
            <View>
                <StatusBar barStyle={"default"} />
            </View>
            <stack.Navigator screenOptions={{
                animationTypeForReplace: 'push', animation: 'slide_from_right',
                headerShown: false,
            }}>
                <stack.Screen
                    name="Splash"
                    component={Splash} />
                <stack.Screen
                    name="SignIn"
                    component={SignIn} />
                <stack.Screen
                    name="ForgetPass"
                    component={ForgetPass}
                    options={{
                        headerShown: true,
                        headerTitle: ('Forget Password'),
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white
                    }} />
                <stack.Screen
                    name="OTP"
                    component={OTP}
                    options={{
                        headerShown: true,
                        headerTitle: ('OTP Verification'),
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white
                    }} />
                <stack.Screen
                    name="ResetPass"
                    component={ResetPass}
                    options={{
                        headerShown: true,
                        headerTitle: ('Reset Password'),
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white
                    }} />
                <stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{
                        headerShown: true,
                        headerTitle: ('Signup'),
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white
                    }} />
                <stack.Screen
                    name="OTPSignup"
                    component={OTPSignup}
                    options={{
                        headerShown: true,
                        headerTitle: ('OTP Verification'),
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white
                    }} />
                <stack.Screen
                    name="Home"
                    component={Home} />
                <stack.Screen
                    name="AddCustomer"
                    component={AddCustomer}
                    options={({ route, navigation }) => ({
                        headerShown: true,
                        headerTitle: route.params.mode == "Edit" ? "Edit Customer" : "Add Customer",
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerTintColor: colors.white,
                        headerRight: () => (
                            <Logout />
                        ),
                        headerLeft: () => (
                            <Back navigation={navigation} />
                        )
                    })}
                />
                <stack.Screen
                    name="CustomerService"
                    component={CustomerService}
                    options={({ route, navigation }) => {
                        const handleNavigation = () => {
                          navigation.navigate('ServiceHistory',{customerType:route.params.type,customer_id:route.params.customer_id});
                        };
                    
                        return {
                          headerShown: true,
                          headerTitle: 'Customer Details',
                          headerStyle: { backgroundColor: colors.blueShade1 },
                          headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                          headerTitleAlign: 'center',
                          headerBackVisible: true,
                          headerTintColor: colors.white,
                          headerRight: () => (
                            <TouchableOpacity
                            style={{alignItems:"center"}}
                              onPress={handleNavigation}
                            >
                              <MaterialCommunityIcons name="history" size={30} color={colors.white}/>
                                <Text style={{fontSize:10,color:colors.white}}>Service History</Text>
                            </TouchableOpacity>
                          ),
                        };
                      }}
                    />
                <stack.Screen
                    name="ServiceHistory"
                    component={ServiceHistory}
                    options={{
                        headerShown: true,
                        headerTitle: ('Service History'),
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white,
                        headerRight: () => (
                            <Logout />
                        )
                    }} />
                <stack.Screen
                    name="SubServiceList"
                    component={SubServiceList}
                    options={{
                        headerShown: true,
                        headerTitle: ('Sub Service List'),
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white,
                        headerRight: () => (
                            <Logout />
                        )
                    }} />
                <stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                        headerShown: true,
                        headerTitle: ('Edit Profile'),
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white,
                        headerRight: () => (
                            <Logout />
                        )
                    }} />
                <stack.Screen
                    name="Bill"
                    component={Bill}
                    options={{
                        headerShown: true,
                        headerTitle: ('Bill List'),
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white,
                        headerRight: () => (
                            <Logout />
                        )
                    }} />
                <stack.Screen
                    name="AddBill"
                    component={AddBill}
                    options={({ route }) => ({
                        headerShown: true,
                        headerTitle: route.params.mode == "Edit" ? "Edit Bill" : "Add Bill",
                        headerStyle: { backgroundColor: colors.blueShade1 },
                        headerTitleStyle: { color: colors.white, fontSize: 17, fontWeight: '600' },
                        headerTitleAlign: "center",
                        headerBackVisible: true,
                        headerTintColor: colors.white,
                        headerRight: () => (
                            <Logout />
                        )
                    })} />

            </stack.Navigator>

        </NavigationContainer>
    )
}

export default App
