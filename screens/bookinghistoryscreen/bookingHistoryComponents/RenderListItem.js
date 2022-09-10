import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Card from "../../signupscreen/signupComponents/Card";
import ContactContainer from "../../contactusscreen/contactusComponents/ContactContainer";
import Status from "../../../components/Status";
import { getFormattedDate } from "../../../utils/date";

// create a component
const RenderListItem = ({ item }) => {
  const navigation = useNavigation();

  const showDetailsScreen = () => {
    if (item.status == "Cancelled" || item.status == "Completed") {
      navigation.navigate("BookingSummary", {
        bookingId: item._id,
        status: item.status,
        prevScreen: "BookingHistory",
      });
    } else if (item.status == "Upcoming") {
      navigation.navigate("BookingDetails", {
        bookingId: item._id,
        status: item.status,
        prevScreen: "BookingHistory",
      });
    } else {
      navigation.navigate("ChargingTransaction", {
        bookingId: item._id,
        status: item.status,
        prevScreen: "BookingHistory",
      });
    }
  };

  const formattedDate = getFormattedDate(new Date(item.createdAt));
  return (
    <Card style={styles.card} innerStyle={styles.innerCard}>
      <Pressable
        style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.6 }]}
        onPress={showDetailsScreen}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{`B#${item._id.slice(18, 24)}`}</Text>
          <Status scale="small">{item.status}</Status>
        </View>

        <ContactContainer
          name="Location"
          description={item.socket.address}
          icon={require("../../../assets/icons/placeholder.png")}
          scale="small"
        />
        <ContactContainer
          name={"Date & Time"}
          description={formattedDate}
          icon={require("../../../assets/icons/date.png")}
          scale="small"
        />
        <ContactContainer
          name="Bill Amount"
          description={item.cost}
          icon={require("../../../assets/icons/rupee.png")}
          scale="small"
        />
      </Pressable>
    </Card>
  );
};

// define your styles
const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    justifyContent: "flex-start",
    position: "relative",
  },
  innerCard: {
    paddingVertical: 12,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 16,
    marginBottom: 4,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

//make this component available to the app
export default RenderListItem;
