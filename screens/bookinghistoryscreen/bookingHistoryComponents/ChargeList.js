import { StyleSheet, FlatList } from "react-native";
import { bookingHistory } from "../../../data/BookingHistoryData";
import RenderListItem from "./RenderListItem";

// create a component
const ChargeList = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={bookingHistory}
      keyExtractor={(item, index) => item.id}
      renderItem={(itemData) => <RenderListItem item={itemData.item} />}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default ChargeList;
