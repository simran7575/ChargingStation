import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderIcon from "../../components/HeaderIcon";
import { Colors } from "../../constants/Color";
import ChargeList from "./bookingHistoryComponents/ChargeList";

// create a component
function BookingHistory({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderIcon
          navigation={navigation}
          source={require("../../assets/icons/back-white.png")}
        />
      ),
      headerTransparent: false,
      headerStyle: { backgroundColor: Colors.teal },
      headerTitleAlign: "center",
    });
  });
  return (
    <View style={styles.container}>
      <ChargeList />
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
});

//make this component available to the app
export default BookingHistory;
