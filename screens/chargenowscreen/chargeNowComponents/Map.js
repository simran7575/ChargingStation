//import liraries
import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "../../../constants/Color";
import ClusterList from "./ClusterList";
import CustomMarker from "./CustomMarker";
import CustomTextInput from "./CustomTextInput";
import { socketsInRange } from "../../../api-services/ApiServices";
import { AuthContext } from "../../../store/auth-context";

// create a component
function Map({ onPickLocation, setIsBooking }) {
  const [focusedKey, setFocusedKey] = useState(1);
  const [socketList, setSocketList] = useState();
  const [currentPosition, setCurrentPosition] = useState();
  const isFocussed = useIsFocused();
  const authCtx = useContext(AuthContext);
  const token = authCtx.user.token;

  useEffect(() => {
    let cancel = false;
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
      if (cancel) {
        return;
      }
      authCtx.addUserLocation([
        location.coords.latitude,
        location.coords.longitude,
      ]);

      try {
        const response = await socketsInRange(token, [
          location.coords.latitude,
          location.coords.longitude,
        ]);
        if (cancel) {
          return;
        }
        if (response.data.success) {
          setSocketList(response.data.sockets);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error in loading Sockets!", " please try again later!");
      }

      setCurrentPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    })();
    return () => {
      cancel = true;
    };
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
    latitudeDelta: 0.9199,
    longitudeDelta: 0.9119,
  };

  if (!currentPosition || !socketList) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  } else {
    return (
      <>
        <MapView style={styles.map} initialRegion={region}>
          {socketList.map((item) => (
            <Marker
              key={socketList.indexOf(item) + 1}
              coordinate={{
                latitude: item.location.coordinates[0],
                longitude: item.location.coordinates[1],
              }}
            >
              <CustomMarker
                focusedKey={focusedKey}
                id={socketList.indexOf(item) + 1}
              />
            </Marker>
          ))}
        </MapView>
        <CustomTextInput></CustomTextInput>

        <View style={styles.listBottom}>
          <ClusterList
            setFocusedKey={setFocusedKey}
            listdata={socketList}
            setIsBooking={setIsBooking}
          />
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
