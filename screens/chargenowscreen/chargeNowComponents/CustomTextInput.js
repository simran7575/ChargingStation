import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Color";

// create a component
const CustomTextInput = () => {
  return (
    <View style={styles.textinputContainer}>
      <TextInput style={styles.textinput} placeholder="Search Location..." />
      <Pressable style={styles.icon}>
        <Ionicons name="search" color={Colors.gray3} size={24} />
      </Pressable>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  textinputContainer: {
    position: "absolute",
    top: 40,
    backgroundColor: "transparent",
    paddingHorizontal: 24,
    width: "100%",
    flexDirection: "row",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 0,
    elevation: 6,
  },
  textinput: {
    flex: 4,
    height: 50,
    backgroundColor: Colors.white,
    color: Colors.black,
    fontFamily: "poppins-regular",
    fontSize: 18,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});

//make this component available to the app
export default CustomTextInput;
