//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomPopup from "../../../components/BottomPopup";
import TitleText from "../../../components/TitleText";
import { titleStyle } from "../../../constants/Color";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import { Colors } from "../../../constants/Color";

// create a component
const InstructionAlert = ({ isModalShown, removeInstructionScreen }) => {
  return (
    <BottomPopup isModalShown={isModalShown}>
      <TitleText textstyle={titleStyle.title17}>
        Check your charger connections
      </TitleText>
      <TitleText textstyle={titleStyle.text12}>
        {
          "Make sure the cable and charger are properly\nConnected.\nIf you are usinga cover case, try removing it"
        }
      </TitleText>
      <View style={styles.buttonContainer}>
        <CustomButton
          styleouter={styles.button}
          textstyle={styles.buttonText}
          onPress={removeInstructionScreen}
        >
          OK
        </CustomButton>
      </View>
    </BottomPopup>
  );
};

// define your styles
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  button: {
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 140,
    maxWidth: 170,
    backgroundColor: Colors.teal,
  },
  buttonText: {
    fontSize: 16,
  },
});

//make this component available to the app
export default InstructionAlert;
