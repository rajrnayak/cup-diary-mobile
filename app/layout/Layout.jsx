import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Root from "./Root";
import LoginScreen from "../pages/LoginScreen.jsx";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { authUser } from "../manage-state/auth-state/userAuthSlice.js";
import Ionicons from "@expo/vector-icons/Ionicons";

const Layout = () => {
	const Stack = createNativeStackNavigator();
	const dispatch = useDispatch();
	const [isLoad, setIsLoad] = useState(false);

	useEffect(() => {
		loadLoginData();
	}, []);

	async function loadLoginData() {
		let data = await AsyncStorage.getItem("login");
		let value = JSON.parse(data);
		value && dispatch(authUser({ userName: value.user, token: value.token, isLogin: true }));
		setIsLoad(true);
	}

	const isLogin = useSelector((state) => state.authUser.isLogin);

	return (
		<>
			{isLoad && (
				<Stack.Navigator initialRouteName="LoginScreen">
					<Stack.Group
						screenOptions={{
							headerStyle: {
								backgroundColor: "#00A9FF",
							},
							headerTitleAlign: "center",
							headerShown: false,
						}}>
						{!isLogin ? <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Login" }} /> : <Stack.Screen name="Root" component={Root} options={{ title: "Root" }} />}
					</Stack.Group>
				</Stack.Navigator>
			)}
		</>
	);
};

export default Layout;
