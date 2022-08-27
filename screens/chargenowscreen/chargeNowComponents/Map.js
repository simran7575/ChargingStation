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
import LoadingOverlay from "../../../components/LoadingOverlay";

// create a component
function Map({ onPickLocation, setIsBooking }) {
  const [focusedKey, setFocusedKey] = useState(1);
  const [currentFocusedRegion, setCurrentFocusedRegion] = useState({
    latitude: currentPosition ? currentPosition.lat : 37.78,
    longitude: currentPosition ? currentPosition.lng : -122.43,
    latitudeDelta: 0.0319,
    longitudeDelta: 0.0129,
  });
  const [socketList, setSocketList] = useState();
  const [currentPosition, setCurrentPosition] = useState();
  const [fetchSocketList, setFetchSocketList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFocussed = useIsFocused();
  const authCtx = useContext(AuthContext);
  const token = authCtx.user.token;

  const refetchSocketList = () => {
    setFetchSocketList(!fetchSocketList);
  };

  useEffect(() => {
    let cancel = false;
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant location permissions to use this app!"
        );
        setIsLoading(false);
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
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error in loading Sockets!", " please try again later!");
        setIsLoading(false);
      }

      setCurrentPosition({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setCurrentFocusedRegion((prevRegion) => {
        return {
          ...prevRegion,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      });
      setIsLoading(false);
    })();
    return () => {
      cancel = true;
    };
  }, [isFocussed, fetchSocketList]);

  useEffect(() => {
    function locationHandler() {
      if (currentPosition) {
        onPickLocation(currentPosition);
      }
    }
    locationHandler();
  }, [currentPosition]);

  if (!currentPosition || isLoading) {
    return <LoadingOverlay />;
  } else {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={currentFocusedRegion}
          provider={MapView.PROVIDER_GOOGLE}
          mapType="standard"
        >
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
            setFetchSocketList={refetchSocketList}
            setCurrentFocusedRegion={setCurrentFocusedRegion}
          />
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
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
