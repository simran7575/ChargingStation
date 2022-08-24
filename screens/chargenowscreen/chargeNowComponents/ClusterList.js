import { useState, useRef, useContext } from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "./BottomSheet";
import CardItem from "./CardItem";
import ConfirmBooking from "./ConfirmBooking";
import { AuthContext } from "../../../store/auth-context";
import { createBooking } from "../../../api-services/ApiServices";

const ClusterList = ({ setFocusedKey, listdata, setIsBooking }) => {
  const [isModalShown, setIsModalShown] = useState(true);
  const [showConfirmBooking, setShowConfirmBooking] = useState(false);
  const [data, setData] = useState();
  const authCtx = useContext(AuthContext);
  const token = authCtx.user.token;

  const navigation = useNavigation();

  const closeModal = () => {
    setIsModalShown(false);
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
    let focusedKey = viewableItems.viewableItems[0]["key"];
    setFocusedKey(focusedKey);
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  if (listdata.length == 0) {
    return <BottomSheet closeModal={closeModal} isModalShown={isModalShown} />;
  } else if (listdata && !showConfirmBooking) {
    return (
      <FlatList
        contentContainerStyle={styles.list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={listdata}
        keyExtractor={(item) => listdata.indexOf(item) + 1}
        renderItem={(item) => (
          <CardItem
            data={item.item}
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
    paddingHorizontal: 50,
  },
});

//make this component available to the app
export default ClusterList;
