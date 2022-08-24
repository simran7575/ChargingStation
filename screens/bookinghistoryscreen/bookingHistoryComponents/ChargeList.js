import { useNavigation } from "@react-navigation/native";
import { StyleSheet, FlatList, View, Image, Text } from "react-native";
import { Colors } from "../../../constants/Color";
import CustomButton from "../../signupscreen/signupComponents/CustomButton";
import RenderListItem from "./RenderListItem";

// create a component
const ChargeList = ({ bookingData }) => {
  const navigation = useNavigation();

  if (bookingData.length == 0) {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/3973477.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.detailText}>
          {"There is no data , sorry try \n again any later time."}
        </Text>
        <CustomButton onPress={() => navigation.navigate("Home")}>
          Back to Home
        </CustomButton>
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={bookingData}
      keyExtractor={(item, index) => item._id}
      renderItem={(itemData) => <RenderListItem item={itemData.item} />}
      // refreshControl={
      //   <RefreshControl
      //     colors={["#9Bd35A", "#689F38"]}
      //     refreshing={refreshing}
      //     onRefresh={() => {
      //       onRefresh();
      //       setRefreshing(false);
      //     }}
      //   />
      // }
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.appBackground,
  },
  image: {
    width: 250,
    height: 200,
  },
  imageContainer: {
    marginVertical: 12,
  },
  detailText: {
    fontSize: 16,
    fontFamily: "poppins-regular",
    textAlign: "center",
    marginBottom: 48,
  },
});

//make this component available to the app
export default ChargeList;
