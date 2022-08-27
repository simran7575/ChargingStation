//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../constants/Color";
import Divider from "./Divider";

// create a component
const deviceHeight = Dimensions.get("window").height;
const BottomPopup = ({ isModalShown, children, setIsModalShown }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalShown}
      onRequestClose={() => {
        setIsModalShown(false);
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onPressOut={() => setIsModalShown(false)}
      >
        <TouchableWithoutFeedback>
          <View style={styles.innerContainer}>
            <Divider></Divider>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#858282AA",
  },
  innerContainer: {
    backgroundColor: Colors.white,
    width: "100%",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});

//make this component available to the app
export default BottomPopup;
