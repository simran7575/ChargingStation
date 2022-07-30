import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../../constants/Color";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import ContactContainer from "../../contactusscreen/contactusComponents/ContactContainer";

// create a component
const CardItem = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Cluster ${data.id}`}</Text>

      <ContactContainer
        name="Location"
        description={data.location}
        icon={require("../../../assets/icons/placeholder.png")}
        scale="small"
      />
      <ContactContainer
        name="No of available sockets"
        description={data.noOfAvailableSockets}
        icon={require("../../../assets/icons/power-plug.png")}
        scale="small"
      />
      <ContactContainer
        name="Distance from current location"
        description={data.distanceFromCurrentLocation}
        icon={require("../../../assets/icons/meter.png")}
        scale="small"
      />
      <ContactContainer
        name="Estimated cost for full charge"
        description={data.estimatedCostForFullCharge}
        icon={require("../../../assets/icons/rupee1.png")}
        scale="small"
      />
      <CustomButton
        styleouter={styles.button}
        textstyle={styles.buttonText}
        onPress={onPress.bind(this, data)}
      >
        BOOK
      </CustomButton>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    margin: 12,
    backgroundColor: Colors.appBackground,
    width: 300,
    borderRadius: 10,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  title: {
    fontFamily: "poppins-regular",
    fontSize: 18,
    marginBottom: 4,
  },
  button: {
    paddingHorizontal: 36,
    paddingTop: 2,
    paddingBottom: 0,
  },

  buttonText: {
    fontSize: 14,
  },
});

//make this component available to the app
export default CardItem;