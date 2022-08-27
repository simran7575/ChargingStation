import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../../constants/Color";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import ContactContainer from "../../contactusscreen/contactusComponents/ContactContainer";
import { useContext } from "react";
import { AuthContext } from "../../../store/auth-context";
import { getDistanceFromLatLonInKm } from "../../../utils/distance";

// create a component
const CardItem = ({ data, onPress, identity, listSize }) => {
  const authCtx = useContext(AuthContext);
  const lat = authCtx.user.userLocation[0];
  const lng = authCtx.user.userLocation[1];
  const dist = getDistanceFromLatLonInKm(
    lat,
    lng,
    data.location.coordinates[0],
    data.location.coordinates[1]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Cluster ${identity} / ${listSize}`}</Text>

      <ContactContainer
        name="Location"
        description={data.address}
        icon={require("../../../assets/icons/placeholder.png")}
        scale="small"
      />
      <ContactContainer
        name="No of available sockets"
        description="10"
        icon={require("../../../assets/icons/power-plug.png")}
        scale="small"
      />
      <ContactContainer
        name="Distance from current location"
        description={`${dist} Kms`}
        icon={require("../../../assets/icons/meter.png")}
        scale="small"
      />
      <ContactContainer
        name="Estimated cost for full charge"
        description={100}
        icon={require("../../../assets/icons/rupee1.png")}
        scale="small"
      />
      <CustomButton
        styleouter={styles.button}
        textstyle={styles.buttonText}
        onPress={onPress.bind(this, data, dist)}
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
    //position: "absolute",
  },
  title: {
    fontFamily: "poppins-regular",
    fontSize: 18,
    marginBottom: 4,
  },
  button: {
    paddingHorizontal: 36,
    paddingTop: 4,
    paddingBottom: 2,
  },

  buttonText: {
    fontSize: 14,
  },
});

//make this component available to the app
export default CardItem;
