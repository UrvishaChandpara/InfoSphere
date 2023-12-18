import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../theme/colors";

const Card = props => {
    return (
        <SafeAreaView style={[ styles.card,props.style]}>
            {props.children}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 5, 
        backgroundColor:colors.blueShade3
    }
})
export default Card;