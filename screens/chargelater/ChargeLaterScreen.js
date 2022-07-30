import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderIcon from "../../components/HeaderIcon";

// create a component
function ChargeLater({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderIcon
          navigation={navigation}
          source={require("../../assets/icons/back-white.png")}
        />
      ),
    });
  });
  return (
    <View style={styles.container}>
      <Text>ChargeLater</Text>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

//make this component available to the app
export default ChargeLater;
