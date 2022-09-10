import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors, titleStyle } from "../constants/Color";
import DrawerNavigation from "./Drawer";
import SignupScreen from "../screens/signupscreen/SignupScreen";
import LoginScreen from "../screens/loginscreen/LoginScreen";
import OtpScreen from "../screens/otpscreen/OtpScreen";
import NotificationsScreen from "../screens/notificationsscreen/NotificationsScreen";
import BookingDetails from "../screens/bookingdetails/BookingDetails";
import ChargeNow from "../screens/chargenowscreen/ChargeNowScreen";
import ChargingTransaction from "../screens/chargingtansaction/ChargingTransaction";
import BookingSummary from "../screens/bookingsummary/BookingSummary";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();
export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  );
}

export function AuthenticatedStackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.teal, height: 50 },
        headerTintColor: Colors.white,
        headerBackVisible: false,
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: "poppins-regular",
          textAlignVertical: "bottom",
          includeFontPadding: false,
        },
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerTitle: (props) => (
            <Text style={titleStyle.header}>Notifications</Text>
          ),
        }}
      />

      <Stack.Screen
        name="ChargeNow"
        component={ChargeNow}
        options={{
          headerTitle: (props) => (
            <Text style={titleStyle.header}>Charge Now</Text>
          ),
        }}
      />

      <Stack.Screen
        name="BookingDetails"
        component={BookingDetails}
        options={{
          headerTitle: (props) => (
            <Text style={titleStyle.header}>Booking Details</Text>
          ),
        }}
      />

      <Stack.Screen
        name="ChargingTransaction"
        component={ChargingTransaction}
        options={{
          headerTitle: (props) => (
            <Text style={titleStyle.header}>Charging Transaction</Text>
          ),
        }}
      />
      <Stack.Screen
        name="BookingSummary"
        component={BookingSummary}
        options={{
          headerTitle: (props) => (
            <Text style={titleStyle.header}>Booking Summary</Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
