//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Color";

// create a component
const Divider = (style) => {
  return <View style={[styles.container, { ...style }]}></View>;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 6,
    backgroundColor: Colors.gray2,
    borderRadius: 18,
    alignSelf: "center",
    marginBottom: 18,
  },
});

//make this component available to the app
export default Divider;
