import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native-ui-lib";

const CupListCardDetails = ({ cupList }) => {
	return (
		<>
			<View flex row padding-5>
				<View flex-6 gap-5 marginL-5>
					<Text text50BO color="#00A9FF">
						{cupList.vendor_name}
					</Text>
					<Text>{cupList.entry_at}</Text>
				</View>
				<View flex-5 gap-5>
					<View flex row gap-5 center>
						<Text>Total Cups :</Text>
						<Text text70BO color="#00A9FF">
							{cupList.total_cups}
						</Text>
					</View>
					<View flex row gap-5 center>
						<Text>Total Amount :</Text>
						<Text text70BO color="#00A9FF">
							{cupList.total_amount}
						</Text>
					</View>
				</View>
				<View flex-1 center marginL-10>
					<Ionicons name="chevron-forward-outline" size={20} />
				</View>
			</View>
		</>
	);
};

export default CupListCardDetails;
