import { NavigationContainer } from "@react-navigation/native";
import Layout from "./app/layout/Layout.jsx";
import { Provider } from "react-redux";
import store from "./app/manage-state/auth-state/store.js";

export default function App() {
	return (
		<>
			<Provider store={store}>
				<NavigationContainer>
					<Layout />
				</NavigationContainer>
			</Provider>
		</>
	);
}
