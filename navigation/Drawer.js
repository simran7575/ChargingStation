import { Image, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "../constants/Color";
import AccountDetails from "../screens/accountdetailsscreen/AccountDetailsScreen";
import ContactUsScreen from "../screens/contactusscreen/ContactUsScreen";
import HomeScreen from "../screens/homescreen/HomeScreen";
import LogoutScreen from "../screens/logoutscreen/LogoutScreen";
import CustomDrawer from "./CustomDrawer";
import BookingHistory from "../screens/bookinghistoryscreen/BookingHistoryScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTintColor: Colors.white,

        headerTitleStyle: {
          fontSize: 22,
          fontFamily: "poppins-regular",
          textAlign: "left",
          textAlignVertical: "center",
          includeFontPadding: false,
        },
        headerLeftContainerStyle: { paddingHorizontal: 18 },
        drawerActiveBackgroundColor: Colors.appBackground,
        drawerActiveTintColor: Colors.black,
        drawerInactiveTintColor: Colors.black,
        drawerLabelStyle: {
          fontSize: 18,
          fontFamily: "poppins-medium",
        },
        drawerStyle: {
          width: 330,
          backgroundColor: Colors.appBackground,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Image
              source={require("../assets/icons/home.png")}
              style={styles.icon}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="BookingHistory"
        component={BookingHistory}
        options={{
          unmountOnBlur: true,
          drawerLabel: "Booking History",
          headerTitle: "Booking History",
          headerTitleAlign: "left",
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={require("../assets/icons/booking-clr.png")}
              style={styles.icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{
          drawerLabel: "Account Details",
          headerTitle: "Account Details",
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={require("../assets/icons/account-1.png")}
              style={styles.icon}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          drawerLabel: "Contact Us",
          headerTitle: "Contact Us",
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={require("../assets/icons/call-1.png")}
              style={styles.icon}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Image
              source={require("../assets/icons/logout.png")}
              style={styles.icon}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
    marginLeft: 18,
  },
});

export default DrawerNavigation;
