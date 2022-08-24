import { useLayoutEffect, useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import HeaderIcon from "../../components/HeaderIcon";
import LoadingOverlay from "../../components/LoadingOverlay";
import { titleStyle } from "../../constants/Color";
import Map from "../chargenowscreen/chargeNowComponents/Map";

// create a component
function ChargeNow({ navigation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const [isBooking, setIsBooking] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={titleStyle.stackheader}>
          <HeaderIcon
            navigation={navigation}
            source={require("../../assets/icons/back-white.png")}
          />
        </View>
      ),
    });
  });
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  if (isBooking) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Map onPickLocation={pickLocationHandler} setIsBooking={setIsBooking} />
    </>
  );
}

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default ChargeNow;
