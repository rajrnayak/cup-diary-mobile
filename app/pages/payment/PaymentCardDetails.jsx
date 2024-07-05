import Ionicons from "@expo/vector-icons/Ionicons";
import { Chip, Text, View } from "react-native-ui-lib";

const PaymentCardDetails = ({ payment }) => {
	return (
		<>
			<View flex row padding-5>
				<Text style={{ top: 0, right: 5, position: 'absolute' }}>{payment.display_payment_at}</Text>
				<View flex-6 gap-5 marginL-5>
					<Text text60BO color="#00A9FF">
						{payment.vendors.name}
					</Text>
					<Text text70BO color={payment.type === 0 ? '#32de84' : '#ff514e'}>
						₹ {payment.amount}
					</Text>
					{/* <Text text70BO color="#00A9FF" style={{ 
							color:payment.type === 0 ? '#32de84':'#ff514e' 
						}}>
							{payment.type === 0 ? 'Credit' : 'Debit'}
						</Text> */}
				</View>
				
				<View flex-1 bottom marginL-10>
					<Ionicons name="chevron-forward-outline" size={20} />
				</View>
			</View>
		</>
	);
};

export default PaymentCardDetails;
