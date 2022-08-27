import { View, Text, StyleSheet } from "react-native";
import BottomPopup from "../../../components/BottomPopup";
import TitleText from "../../../components/TitleText";
import { Colors } from "../../../constants/Color";
import ContactContainer from "../../contactusscreen/contactusComponents/ContactContainer";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";

// create a component
const ConfirmBooking = ({ data, cancelBooking, finalBooking }) => {
  return (
    <BottomPopup isModalShown={true} setIsModalShown={cancelBooking}>
      <TitleText textstyle={styles.title}>Booking Overview</TitleText>
      <ContactContainer
        name="Location"
        description={data.address}
        icon={require("../../../assets/icons/placeholder.png")}
      />
      <ContactContainer
        name="No of available sockets"
        description="10"
        icon={require("../../../assets/icons/power-plug.png")}
      />
      <ContactContainer
        name="Distance from current location"
        description={data.distance}
        icon={require("../../../assets/icons/meter.png")}
      />
      <ContactContainer
        name="Estimated cost for full charge"
        description="100"
        icon={require("../../../assets/icons/rupee1.png")}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          styleouter={styles.secondarybutton}
          textstyle={styles.buttonText}
          onPress={cancelBooking}
        >
          CANCEL
        </CustomButton>
        <CustomButton
          styleouter={styles.button}
          textstyle={styles.buttonText}
          onPress={finalBooking}
        >
          CONFIRM
        </CustomButton>
      </View>
    </BottomPopup>
  );
};

// define your styles
const styles = StyleSheet.create({
  title: {
    fontFamily: "poppins-medium",
    fontSize: 20,
    marginBottom: 12,
    textAlign: "left",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  secondarybutton: {
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 140,
    maxWidth: 170,
    backgroundColor: Colors.gray3,
  },

  button: {
    paddingHorizontal: 24,
    paddingTop: 5,
    paddingBottom: 3,
    minWidth: 140,
    maxWidth: 170,
    backgroundColor: Colors.teal,
  },

  buttonText: {
    fontSize: 16,
  },
});

//make this component available to the app
export default ConfirmBooking;
