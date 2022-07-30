//import liraries
import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

// create a component
const HeaderIcon = ({ navigation, source, toggle, onPress }) => {
  return (
    <Pressable
      onPress={
        onPress
          ? onPress
          : () => {
              toggle ? navigation.toggleDrawer() : navigation.goBack();
            }
      }
    >
      <Image source={source} style={styles.menu} />
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  menu: {
    width: 24,
    height: 24,
    marginHorizontal: 18,
  },
});

//make this component available to the app
export default HeaderIcon;
