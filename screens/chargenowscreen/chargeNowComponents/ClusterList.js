import { useState, useRef } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListData } from "../../../data/ListData";
import BottomSheet from "./BottomSheet";
import CardItem from "./CardItem";
import ConfirmBooking from "./ConfirmBooking";

const ClusterList = ({ setFocusedKey }) => {
  const [isModalShown, setIsModalShown] = useState(true);
  const [showConfirmBooking, setShowConfirmBooking] = useState(false);
  const [data, setData] = useState();

  const navigation = useNavigation();

  const closeModal = () => {
    setIsModalShown(false);
  };

  const showBookingScreen = (data) => {
    setData(data);
    setShowConfirmBooking(true);
  };

  const onViewRef = useRef((viewableItems) => {
    let focusedKey = viewableItems.viewableItems[0]["key"];
    setFocusedKey(focusedKey);
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  if (!ListData) {
    return <BottomSheet closeModal={closeModal} isModalShown={isModalShown} />;
  } else if (ListData && !showConfirmBooking) {
    return (
      <FlatList
        contentContainerStyle={styles.list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={ListData}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <CardItem data={item.item} onPress={showBookingScreen} />
        )}
      />
    );
  } else {
    return (
      <ConfirmBooking
        data={data}
        cancelBooking={() => setShowConfirmBooking(false)}
        finalBooking={() => {
          setShowConfirmBooking(false);
          navigation.navigate("BookingDetails");
        }}
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
