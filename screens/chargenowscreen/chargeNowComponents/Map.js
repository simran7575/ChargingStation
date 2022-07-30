//import liraries
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "../../../constants/Color";
import ClusterList from "./ClusterList";
import CustomMarker from "./CustomMarker";
import CustomTextInput from "./CustomTextInput";

// create a component
function Map({ onPickLocation }) {
  const [currentPosition, setCurrentPosition] = useState();
  const [focusedKey, setFocusedKey] = useState(1);
  const isFocussed = useIsFocused();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant location permissions to use this app!"
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
  }, [isFocussed]);

  useEffect(() => {
    function locationHandler() {
      if (currentPosition) {
        onPickLocation(currentPosition);
      }
    }
    locationHandler();
  }, [currentPosition]);

  let region = {
    latitude: currentPosition ? currentPosition.lat : 37.78,
    longitude: currentPosition ? currentPosition.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (!currentPosition) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  } else {
    return (
      <>
        <MapView style={styles.map} initialRegion={region}>
          <Marker
            coordinate={{
              latitude: currentPosition.lat,
              longitude: currentPosition.lng,
            }}
          >
            <CustomMarker focusedKey={focusedKey} id={1} />
          </Marker>
          {/* <Marker
            coordinate={{
              latitude: currentPosition.lat - 30,
              longitude: currentPosition.lng - 10,
            }}
          ></Marker>
          <Marker
            coordinate={{
              latitude: currentPosition.lat - 10,
              longitude: currentPosition.lng - 30,
            }}
          ></Marker> */}
        </MapView>
        <CustomTextInput></CustomTextInput>

        <View style={styles.listBottom}>
          <ClusterList setFocusedKey={setFocusedKey} />
        </View>
      </>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  listBottom: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "transparent",
  },
});

//make this component available to the app
export default Map;
