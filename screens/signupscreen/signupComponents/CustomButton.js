import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../../constants/Color";

// create a component
function CustomButton({ children, onPress, styleouter, textstyle }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { ...styleouter },
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { ...textstyle }]}>{children}</Text>
      </Pressable>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    margin: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 42,
    backgroundColor: Colors.teal,
    paddingTop: 8,
    paddingBottom: 4,
    borderRadius: 28,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "poppins-semibold",
    marginBottom: 0,
    textAlign: "center",
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});

//make this component available to the app
export default CustomButton;
