import { StyleSheet } from "react-native";
import Card from "../../signupscreen/signupComponents/Card";
import TitleText from "../../../components/TitleText";
import ContactContainer from "../../contactusscreen/contactusComponents/ContactContainer";
import { titleStyle } from "../../../constants/Color";

// create a component
const BottomCard = ({ data }) => {
  return (
    <Card style={styles.cardBottom}>
      <TitleText textstyle={titleStyle.title20}>
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
});

//make this component available to the app
export default BottomCard;
