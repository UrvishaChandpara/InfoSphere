import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { images } from "../assets/image/index";
import { colors } from "../theme/colors";
import { SCREEEN_WIDTH, SCREEN_HEIGHT } from '../theme/index'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      const details = await AsyncStorage.getItem('UserDetails');
      try {
        if (details === null) {
          navigation.navigate('SignIn')
        }
        else {
          navigation.navigate('Home')
        }
      }
      catch (error) {
        // Handle error if AsyncStorage retrieval fails
        console.error("Error retrieving UserDetails:", error);
      }
    }, 1000);
  }, []);

  return (

    <SafeAreaView style={styles.containt}>
      <Image source={images.logo} style={styles.Image} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containt: {
    backgroundColor: colors.white,
    height: SCREEN_HEIGHT,
    width: SCREEEN_WIDTH,
    alignItems: "center",
    justifyContent: 'center'
  },
  Image: {
    height: SCREEN_HEIGHT / 3.5,
    width: SCREEEN_WIDTH / 1.5,
  },
})

export default Splash;





