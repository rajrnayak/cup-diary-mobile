import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../pages/home/HomeScreen.jsx";
import CupListScreen from "../pages/cup-list/CupListScreen.jsx";
import PaymentScreen from "../pages/payment/PaymentScreen.jsx";
import ProfileScreen from "../pages/profile/ProfileScreen.jsx";

const Tab = createBottomTabNavigator();

const Root = () => {
	return (
		<>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: "#00A9FF",
					},
					tabBarStyle: {
						height: 70,
						margin: 10,
						padding: 10,
						paddingBottom: 10,
						borderRadius: 20,
					},
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						color = "#00A9FF";

						if (route.name === "HomeScreen") {
							iconName = focused ? "home" : "home-outline";
						} else if (route.name === "CupListScreen") {
							iconName = focused ? "cafe" : "cafe-outline";
						} else if (route.name === "PaymentScreen") {
							iconName = focused ? "cash" : "cash-outline";
						} else if (route.name === "ProfileScreen") {
							iconName = focused ? "person" : "person-outline";
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: "#00A9FF",
					tabBarInactiveTintColor: "gray",
				})}>
				<Tab.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{
						title: "Home",
					}}
				/>
				<Tab.Screen
					name="CupListScreen"
					component={CupListScreen}
					options={{
						title: "Cup-List",
					}}
				/>
				<Tab.Screen
					name="PaymentScreen"
					component={PaymentScreen}
					options={{
						title: "Payment",
					}}
				/>
				<Tab.Screen
					name="ProfileScreen"
					component={ProfileScreen}
					options={{
						title: "Profile",
					}}
				/>
			</Tab.Navigator>
		</>
	);
};

export default Root;
