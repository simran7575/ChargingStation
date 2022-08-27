import { StyleSheet, BackHandler } from "react-native";
import Card from "../../signupscreen/signupComponents/Card";
import TitleText from "../../../components/TitleText";
import ContactContainer from "../../contactusscreen/contactusComponents/ContactContainer";
import { titleStyle } from "../../../constants/Color";

// create a component
const BottomCard = ({ data }) => {
  return (
    <Card style={styles.cardBottom} innerStyle={styles.innerCard}>
      <TitleText textstyle={titleStyle.title19}>
        Socket specific details
      </TitleText>
      <ContactContainer
        name="Plug Type"
        description={data.socket.plugType}
        icon={require("../../../assets/icons/power-plug.png")}
      />
      <TitleText textstyle={titleStyle.title17}>
        Instructions for the user
      </TitleText>
      <TitleText textstyle={titleStyle.text12}>
        {
          "Lorem Ipsum is some dummy text of the printing\nand typesetting industry. Lorem Ipsum has been\nthe industry's standard tummy text. "
        }
      </TitleText>
    </Card>
  );
};

// define your styles
const styles = StyleSheet.create({
  cardBottom: {
    marginVertical: 24,
    justifyContent: "flex-start",
    position: "relative",
  },
  innerCard: {
    paddingVertical: 24,
  },
});

//make this component available to the app
export default BottomCard;
