import { View, Text, StyleSheet, TextInput } from "react-native";
import { Colors } from "../../../constants/Color";

// create a component
function LabelAndInput({ label, keyboard = "default", required }) {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labeltext}>
        {" "}
        {label}
        {required && <Text style={styles.star}>*</Text>}{" "}
      </Text>
      <TextInput
        style={styles.input}
        keyboardType={keyboard}
        autoComplete="off"
        //autoCapitalize="words"
      />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  labeltext: {
    fontSize: 15,
    fontFamily: "poppins-regular",
  },
  input: {
    width: "100%",
    height: 30,
    borderBottomColor: Colors.gray2,
    borderBottomWidth: 2,
    marginVertical: 6,
    fontSize: 20,
    fontFamily: "poppins-medium",
    color: Colors.gray4,
  },
  labelContainer: {
    marginVertical: 6,
  },
  star: {
    color: "red",
  },
});

//make this component available to the app
export default LabelAndInput;
