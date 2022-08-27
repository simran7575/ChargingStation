import { Image, StyleSheet } from "react-native";
import Card from "../../signupscreen/signupComponents/Card";
import TitleText from "../../../components/TitleText";
import ContactContainer from "../../contactusscreen/contactusComponents/ContactContainer";
import { titleStyle } from "../../../constants/Color";

// create a component
function MiddleCard({ data }) {
  return (
    <Card style={styles.card} innerStyle={styles.innerCard}>
      <TitleText textstyle={titleStyle.title19}>Booking Details</TitleText>
      <ContactContainer
        name="Booking Id"
        description={`B#${data._id.slice(18, 24)}`}
        icon={require("../../../assets/icons/booking.png")}
      />
      <ContactContainer
        name="Socket Id"
        description={`S#${data.socket._id.slice(18, 24)}`}
        icon={require("../../../assets/icons/plugging.png")}
      />
      <ContactContainer
        name="Socket Address"
        description={data.socket.address}
        icon={require("../../../assets/icons/placeholder.png")}
      />
      <ContactContainer
        name="Landmark"
        description="__________"
        icon={require("../../../assets/icons/landmark.png")}
      />
      <TitleText textstyle={titleStyle.title17}>Socket Photo</TitleText>
      <Image
        source={require("../../../assets/images/socket.png")}
        style={styles.socketImage}
      />
    </Card>
  );
}

// define your styles
const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    justifyContent: "flex-start",
    position: "relative",
  },
  innerCard: {
    paddingVertical: 24,
  },
  socketImage: {
    width: 100,
    height: 60,
  },
});

//make this component available to the app
export default MiddleCard;
