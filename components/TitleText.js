import { View, Text, StyleSheet } from "react-native";

// create a component
function TitleText({ children, outerstyle, textstyle }) {
  return (
    <View style={[styles.container, { ...outerstyle }]}>
      <Text style={[styles.text, { ...textstyle }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "poppins-regular",
    marginBottom: 8,
  },
});

//make this component available to the app
export default TitleText;
