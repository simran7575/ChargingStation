import { useState, useRef, useContext } from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "./BottomSheet";
import CardItem from "./CardItem";
import ConfirmBooking from "./ConfirmBooking";
import { AuthContext } from "../../../store/auth-context";
import { createBooking } from "../../../api-services/ApiServices";

const ClusterList = ({
  setFocusedKey,
  listdata,
  setIsBooking,
  setFetchSocketList,
  setCurrentFocusedRegion,
}) => {
  const [isModalShown, setIsModalShown] = useState(true);
  const [showConfirmBooking, setShowConfirmBooking] = useState(false);
  const [data, setData] = useState();
  const authCtx = useContext(AuthContext);
  const token = authCtx.user.token;
  const ref = useRef(null);

  const navigation = useNavigation();

  const closeModal = () => {
    setIsModalShown(false);
    navigation.navigate("Home");
  };

  const showBookingScreen = (data, dist) => {
    setData({ ...data, distance: dist });
    setShowConfirmBooking(true);
  };

  async function createNewBooking() {
    setIsBooking(true);
    setShowConfirmBooking(false);
    try {
      const socketId = data._id;
      const response = await createBooking(token, socketId);

      if (response.data.success) {
        Alert.alert("Socket Booked Sucessfully!");
        setIsBooking(false);
        navigation.navigate("BookingDetails", {
          bookingId: response.data.booking._id,
          status: "Upcoming",
        });
      } else {
        setIsBooking(false);
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error in Booking Socket!", " please try again later!");
      setIsBooking(false);
    }
  }

  const onViewRef = useRef((viewableItems) => {
    let focusedKey = viewableItems.viewableItems[0].key
      ? viewableItems.viewableItems[0].key
      : 1;

    let latitude = viewableItems.viewableItems[0].item.location.coordinates[0];
    let longitude = viewableItems.viewableItems[0].item.location.coordinates[1];
    setFocusedKey(focusedKey);
    setCurrentFocusedRegion((prevRegion) => {
      return { ...prevRegion, latitude, longitude };
    });

    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  if (listdata.length == 0) {
    return (
      <BottomSheet
        closeModal={closeModal}
        isModalShown={isModalShown}
        setFetchSocketList={setFetchSocketList}
        setIsModalShown={setIsModalShown}
      />
    );
  } else if (listdata && !showConfirmBooking) {
    return (
      <FlatList
        contentContainerStyle={styles.list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        ref={ref}
        data={listdata}
        keyExtractor={(item) => listdata.indexOf(item) + 1}
        renderItem={(item) => (
          <CardItem
            data={item.item}
            listSize={listdata.length}
            identity={listdata.indexOf(item.item) + 1}
            onPress={showBookingScreen}
          />
        )}
      />
    );
  } else {
    return (
      <ConfirmBooking
        data={data}
        cancelBooking={() => setShowConfirmBooking(false)}
        finalBooking={createNewBooking}
      />
    );
  }
};

// define your styles
const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 35,
    // position: "absolute",
    //flex: 1,
  },
});

//make this component available to the app
export default ClusterList;
