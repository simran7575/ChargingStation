import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Color";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.appBackground,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    fontFamily: "poppins-medium",
  },
});
