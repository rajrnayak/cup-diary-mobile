import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Card, Modal, Text, View } from "react-native-ui-lib";
import Divider from "../../component/Divider";

const PaymentModal = forwardRef((props, ref) => {
	const [isVisible, setIsVisible] = useState(false);

	const paymentData = useRef({});

	const open = (payment) => {
		paymentData.current = payment;
		setIsVisible(true);
	};

	const close = () => {
		setIsVisible(false);
		paymentData.current = {};
	};

	useImperativeHandle(
		ref,
		() => {
			return {
				open,
				close,
			};
		},
		[]
	);

	return (
		<>
			<Modal visible={isVisible} onBackgroundPress={() => close()} animationType="slide" onRequestClose={() => close()} overlayBackgroundColor="rgba(0,0,0,0.6)" transparent>
				<View flex bottom margin-10>
					<Card blurOptions padding-20 onPress={() => close()}>
						<View gap-5 >
							<View row >
								<View flex left paddingB-10>
									<Text text50BO color="#00A9FF" marginB-10>
										{paymentData.current.vendors && paymentData.current.vendors.name}
									</Text>
								</View>
								<View flex right paddingB-10>
									<Text text50BO color={paymentData.current.type === 0 ? '#32de84' : '#ff514e'} marginB-10>
									₹ {paymentData.current.amount }
									</Text>
								</View>
							</View>
							<Divider />
							{/* <View row>
								<View flex center>
									<Text>Vendor</Text>
									<Text text60BO>{paymentData.current.vendors && paymentData.current.vendors.name}</Text>
								</View>
								<View flex center>
									<Text>Created By</Text>
									<Text text60BO>{paymentData.current.users && paymentData.current.users.username}</Text>
								</View>
							</View>
							<Divider /> */}
							<View row>
								<View flex center>
									<Text>Type</Text>
									<Text text60BO>{paymentData.current.type === 0 ? "Credit" : "Debit"}</Text>
								</View>
								<View flex center>
								<Text>Created By</Text>
								<Text text60BO>{paymentData.current.users && paymentData.current.users.username}</Text>
								</View>
							</View>
							<Divider />
							<View row>
								<Text flex center>
									Payment At :
								</Text>
								<Text flex text70BO>
									{paymentData.current.display_payment_at}
								</Text>
							</View>
							<View row>
								<Text flex center>
									Remark :
								</Text>
								<Text flex text70BO>
									{paymentData.current.remark ? paymentData.current.remark : "-"}
								</Text>
							</View>
						</View>
					</Card>
				</View>
			</Modal>
		</>
	);
});

export default PaymentModal;
