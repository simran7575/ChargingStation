import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../constants/Color";
import DrawerNavigation from "./Drawer";
import SignupScreen from "../screens/signupscreen/SignupScreen";
import LoginScreen from "../screens/loginscreen/LoginScreen";
import OtpScreen from "../screens/otpscreen/OtpScreen";
import NotificationsScreen from "../screens/notificationsscreen/NotificationsScreen";
import BookingDetails from "../screens/bookingdetails/BookingDetails";
import ChargeLater from "../screens/chargelater/ChargeLaterScreen";
import ChargeNow from "../screens/chargenowscreen/ChargeNowScreen";
import ChargingTransaction from "../screens/chargingtansaction/ChargingTransaction";
import BookingSummary from "../screens/bookingsummary/BookingSummary";

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
        headerStyle: { backgroundColor: Colors.teal },
        headerTintColor: Colors.white,

        headerTitleStyle: {
          fontSize: 22,
          fontFamily: "poppins-regular",
          marginLeft: 18,
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
      <Stack.Screen name="Notifications" component={NotificationsScreen} />

      <Stack.Screen
        name="ChargeNow"
        component={ChargeNow}
        options={{
          headerTitle: "Charge Now",
        }}
      />

      <Stack.Screen
        name="ChargeLater"
        component={ChargeLater}
        options={{ headerTitle: "Charge Later" }}
      />

      <Stack.Screen
        name="BookingDetails"
        component={BookingDetails}
        options={{ headerTitle: "Booking Details" }}
      />
      <Stack.Screen
        name="ChargingTransaction"
        component={ChargingTransaction}
        options={{ headerTitle: "Charging Transaction" }}
      />
      <Stack.Screen
        name="BookingSummary"
        component={BookingSummary}
        options={{ headerTitle: "Booking Summary" }}
      />
    </Stack.Navigator>
  );
}
