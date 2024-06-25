import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Card, Modal, Text, View } from "react-native-ui-lib";
import Divider from "../../component/Divider";

const CupListModal = forwardRef((props, ref) => {
	const [isVisible, setIsVisible] = useState(false);

	const cupListData = useRef({});

	const open = (cupList) => {
		cupListData.current = cupList;
		setIsVisible(true);
	};

	const close = () => {
		setIsVisible(false);
		cupListData.current = {};
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
						<View gap-5>
							<View center paddingB-10>
								<Text text40BO color="#00A9FF" marginB-10>
									Cup-List Details
								</Text>
							</View>
							<View row>
								<View flex center>
									<Text>Vendor</Text>
									<Text text60BO>{cupListData.current.vendors && cupListData.current.vendors.name}</Text>
								</View>
								<View flex center>
									<Text>Created By</Text>
									<Text text60BO>{cupListData.current.users && cupListData.current.users.username}</Text>
								</View>
							</View>
							<Divider />
							<View row>
								<View flex center>
									<Text>Cups</Text>
									<Text text60BO>{cupListData.current.total_cups}</Text>
								</View>
								<View flex center>
									<Text>Amount</Text>
									<Text text60BO>{cupListData.current.total_amount}</Text>
								</View>
							</View>
							<Divider />
							<View row>
								<Text flex center>
									Entry At :
								</Text>
								<Text flex text70BO>
									{cupListData.current.entry_at}
								</Text>
							</View>
							<View row>
								<Text flex center>
									Remark :
								</Text>
								<Text flex text70BO>
									{cupListData.current.remark ? cupListData.current.remark : "-"}
								</Text>
							</View>
						</View>
					</Card>
				</View>
			</Modal>
		</>
	);
});

export default CupListModal;
