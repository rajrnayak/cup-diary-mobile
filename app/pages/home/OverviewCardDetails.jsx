import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native-ui-lib";

const OverviewCardDetails = ({ icon, text, value, amountIcon }) => {
	return (
		<>
			<View flex center padding-20>
				<View flex-1 row center gap-10>
					<Ionicons name={icon} size={32} color="#5AB2FF" />
					<Text>{text}</Text>
				</View>
				<View flex-1 center>
					<Text text30>{amountIcon ? "₹" + value : value}</Text>
				</View>
			</View>
		</>
	);
};

export default OverviewCardDetails;
