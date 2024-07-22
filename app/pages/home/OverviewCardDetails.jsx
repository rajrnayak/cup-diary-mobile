import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native-ui-lib";

const OverviewCardDetails = ({ icon, text, value, amountIcon }) => {
	return (
		<>
			<View width={180} flex padding-10 gap-3>
				<View flex-1 row center gap-10>
					{icon && <Ionicons name={icon} size={32} color="#5AB2FF" />}
					<Text>{text}</Text>
				</View>
				<View flex-1 center>
					<Text text50BL>{value ? (amountIcon ? "₹ " + value : value) : 0}</Text>
				</View>
			</View>
		</>
	);
};

export default OverviewCardDetails;
