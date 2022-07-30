//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, titleStyle } from "../constants/Color";
import CustomButton from "../screens/signupscreen/signupComponents/CustomButton";

// create a component
const Status = ({ children, scale }) => {
  const isSmall = scale == "small";

  if (children == "Upcoming") {
    return (
      <View
        style={[
          styles.primarybutton,
          isSmall && { paddingTop: 2, paddingBottom: 0 },
        ]}
      >
        <Text style={[styles.buttonText, isSmall && { fontSize: 10 }]}>
          {children}
        </Text>
      </View>
    );
  }
  if (children == "Ongoing") {
    return (
      <View
        style={[
          styles.ongoingbutton,
          isSmall && { paddingTop: 2, paddingBottom: 0 },
        ]}
      >
        <Text style={[styles.ongoingbuttonText, isSmall && { fontSize: 10 }]}>
          {children}
        </Text>
      </View>
    );
  }

  if (children == "Cancelled") {
    return (
      <View
        style={[
          styles.cancelbutton,
          isSmall && { paddingTop: 2, paddingBottom: 0 },
        ]}
      >
        <Text style={[styles.cancelbuttonText, isSmall && { fontSize: 10 }]}>
          {children}
        </Text>
      </View>
    );
  }
  return (
    <View
      style={[styles.button, isSmall && { paddingTop: 2, paddingBottom: 0 }]}
    >
      <Text style={[styles.buttonText, isSmall && { fontSize: 10 }]}>
        {children}
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingTop: 3,
    paddingBottom: 1,
    backgroundColor: Colors.gray3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  primarybutton: {
    paddingHorizontal: 12,
    paddingTop: 3,
    paddingBottom: 1,
    backgroundColor: Colors.teal,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  cancelbutton: {
    paddingHorizontal: 12,
    paddingTop: 3,
    paddingBottom: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.gray3,
  },
  ongoingbutton: {
    paddingHorizontal: 12,
    paddingTop: 3,
    paddingBottom: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.teal,
  },
  buttonText: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: "poppins-regular",
  },
  cancelbuttonText: {
    fontSize: 12,
    color: Colors.gray4,
    fontFamily: "poppins-regular",
  },
  ongoingbuttonText: {
    fontSize: 12,
    color: Colors.teal,
    fontFamily: "poppins-medium",
  },
});

//make this component available to the app
export default Status;
