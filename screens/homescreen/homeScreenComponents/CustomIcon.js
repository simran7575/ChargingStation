import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../../constants/Color";

// create a component
const CustomIcon = ({ icon, style, iconstyle }) => {
  return (
    <View style={[styles.container, { ...style }]}>
      <Image source={icon} style={[styles.iconImage, { ...iconstyle }]} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.appBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 70,
    height: 70,
  },
});

//make this component available to the app
export default CustomIcon;
