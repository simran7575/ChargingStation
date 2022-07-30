//import liraries
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../../constants/Color";

// create a component
const ContactContainer = ({ name, description, icon, scale }) => {
  const isSmall = scale == "small";
  return (
    <View style={[styles.container, isSmall && { marginBottom: 8 }]}>
      <View style={[styles.iconContainer, isSmall && { marginRight: 8 }]}>
        <Image
          source={icon}
          style={[styles.icon, isSmall && { width: 20, height: 20 }]}
        />
      </View>
      <View>
        <Text style={[styles.name, isSmall && { fontSize: 10 }]}>{name}</Text>
        <Text style={[styles.description, isSmall && { fontSize: 12 }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 30,
    height: 30,
  },
  name: {
    fontSize: 12,
    fontFamily: "poppins-regular",
    color: Colors.gray3, //"#bdbbbb",
  },
  description: {
    fontFamily: "poppins-medium",
    color: Colors.black,
  },
});

//make this component available to the app
export default ContactContainer;
