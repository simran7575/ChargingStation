import { useContext, useState, useEffect } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { BottomSheet } from "@rneui/themed";
import LogoutAlert from "./logoutComponents/LogoutAlert";
import { AuthContext } from "../../store/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";

// create a component
function LogoutScreen({ navigation }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(true);

  const authCtx = useContext(AuthContext);

  const moveToHomeScreen = () => {
    setShowLogoutAlert(false);
  };

  const logout = () => {
    authCtx.logout();
  };

  useEffect(() => {
    setShowLogoutAlert(true);
    return () => {
      setShowLogoutAlert(false);
    };
  }, []);
  {
    console.log(showLogoutAlert);
  }
  return (
    <SafeAreaProvider>
      <View>
        <Modal
          animationType="slide"
          visible={showLogoutAlert}
          style={styles.modal}
        >
          <LogoutAlert logoutNo={moveToHomeScreen} logoutYes={logout} />
        </Modal>
      </View>
    </SafeAreaProvider>
  );
}

// define your styles
const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#858282AA",
    justifyContent: "flex-end",
  },
});

//make this component available to the app
export default LogoutScreen;
