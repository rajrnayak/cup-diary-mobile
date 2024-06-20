import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Root from "./Root";
import LoginScreen from "../pages/LoginScreen.jsx";

const Layout = () => {
	const Stack = createNativeStackNavigator();

	return (
		<>
			<Stack.Navigator initialRouteName="Root">
				<Stack.Group
					screenOptions={{
						headerStyle: {
							backgroundColor: "#00A9FF",
						},
						headerTitleAlign: "center",
						headerShown: false,
					}}>
					<Stack.Screen name="Root" component={Root} options={{ title: "Root" }} />
					<Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Login" }} />
				</Stack.Group>
			</Stack.Navigator>
		</>
	);
};

export default Layout;
