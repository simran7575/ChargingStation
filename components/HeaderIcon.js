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
      <Image
        source={source}
        style={source == 44 ? styles.menu : styles.menuback}
      />
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  menu: {
    width: 24,
    height: 24,
    marginHorizontal: 6,
  },
  menuback: {
    width: 24,
    height: 24,
    // marginRight: 24,
  },
});

//make this component available to the app
export default HeaderIcon;
