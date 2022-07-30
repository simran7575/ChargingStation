import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../../constants/Color";
import { Ionicons } from "@expo/vector-icons";

function CustomMarker({ focusedKey, id }) {
  let isFocused = focusedKey == id;
  return (
    <View style={styles.marker}>
      <Ionicons
        name="location-sharp"
        color={isFocused ? Colors.teal : Colors.gray3}
        size={isFocused ? 80 : 52}
      />
    </View>
  );
}
//styles for our custom marker.
const styles = StyleSheet.create({
  marker: {},
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default CustomMarker;
