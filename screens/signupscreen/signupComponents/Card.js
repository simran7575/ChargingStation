//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
function Card({ children, style, innerStyle }) {
  return (
    <View style={[styles.cardContainer, { ...style }]}>
      <View style={[styles.card, { ...innerStyle }]}>{children}</View>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
  },
  card: {
    marginHorizontal: 24,
    paddingHorizontal: 18,
    paddingVertical: 32,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0,
    backgroundColor: "white",
  },
});

//make this component available to the app
export default Card;
