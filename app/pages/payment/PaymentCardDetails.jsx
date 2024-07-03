import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native-ui-lib";

const PaymentCardDetails = ({ payment }) => {
	return (
		<>
			<View flex row padding-5>
				<View flex-6 gap-5 marginL-5>
					<Text text50BO color="#00A9FF">
						{payment.vendors.name}
					</Text>
					<Text>{payment.display_payment_at}</Text>
				</View>
				<View flex-5 gap-5>
					<View flex row gap-5 center>
						<Text>Type :</Text>
						<Text text70BO color="#00A9FF">
							{payment.type === 0 ? 'Credit' : 'Debit'}
						</Text>
					</View>
					<View flex row gap-5 center>
						<Text>Amount :</Text>
						<Text text70BO color="lightgreen">
							{payment.amount}
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

export default PaymentCardDetails;
