//import liraries
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "../../../constants/Color";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";

// create a component
const NoBookings = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/3973477.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.detailText}>
        {"There is no data , sorry try \n again any later time."}
      </Text>
      <CustomButton onPress={() => navigation.navigate("Home")}>
        Back to Home
      </CustomButton>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.appBackground,
  },
  image: {
    width: 250,
    height: 200,
  },
  imageContainer: {
    marginVertical: 12,
  },
  detailText: {
    fontSize: 16,
    fontFamily: "poppins-regular",
    textAlign: "center",
    marginBottom: 48,
  },
});

//make this component available to the app
export default NoBookings;
