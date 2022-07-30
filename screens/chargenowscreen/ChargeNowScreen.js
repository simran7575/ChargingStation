import { useLayoutEffect, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import HeaderIcon from "../../components/HeaderIcon";
import Map from "../chargenowscreen/chargeNowComponents/Map";

// create a component
function ChargeNow({ navigation }) {
  const [pickedLocation, setPickedLocation] = useState();
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
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  return (
    <>
      <Map onPickLocation={pickLocationHandler} />
    </>
  );
}

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default ChargeNow;
