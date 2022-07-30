import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Card from "../../signupscreen/signupComponents/Card";
import ContactContainer from "../../contactusscreen/contactusComponents/ContactContainer";
import Status from "../../../components/Status";

// create a component
const RenderListItem = ({ item }) => {
  const navigation = useNavigation();

  const showDetailsScreen = () => {
    if (item.status == "Cancelled" || item.status == "Completed") {
      navigation.navigate("BookingSummary");
    } else {
      navigation.navigate("BookingDetails", { goToHistory: true });
    }
  };
  return (
    <Card style={styles.card} innerStyle={styles.innerCard}>
      <Pressable
        style={({ pressed }) => [{ flex: 1 }, pressed && { opacity: 0.6 }]}
        onPress={showDetailsScreen}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.id}</Text>
          <Status scale="small">{item.status}</Status>
        </View>

        <ContactContainer
          name="Location"
          description={item.location}
          icon={require("../../../assets/icons/placeholder.png")}
          scale="small"
        />
        <ContactContainer
          name={"Date & Time"}
          description={item.dateAndTime}
          icon={require("../../../assets/icons/date.png")}
          scale="small"
        />
        <ContactContainer
          name="Bill Amount"
          description={item.billAmount}
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
