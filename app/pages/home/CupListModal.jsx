import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Card, Modal, Text, View } from "react-native-ui-lib";

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
			<Modal visible={isVisible} onBackgroundPress={() => close()} animationType="slide" onRequestClose={() => close()} transparent>
				<View flex bottom margin-10>
					<Card padding-20 onPress={() => close()} containerStyle={{ borderColor: "#00A9FF", borderWidth: 1 }}>
						<View gap-10>
							<View center paddingB-10>
								<Text text40BO color="#00A9FF">
									Cup-List Details
								</Text>
							</View>
							<View row>
								<Text flex>Vendor Name : </Text>
								<Text flex text60BO>
									{cupListData.current.vendor_name}
								</Text>
							</View>
							<View row>
								<Text flex>Entry At : </Text>
								<Text flex text70BO>
									{cupListData.current.entry_at}
								</Text>
							</View>
							<View row>
								<Text flex>Total Cups : </Text>
								<Text flex text70BO>
									{cupListData.current.total_cups}
								</Text>
							</View>
							<View row>
								<Text flex>Total Amount : </Text>
								<Text flex text70BO>
									{cupListData.current.total_amount}
								</Text>
							</View>
							<View row>
								<Text flex>Created By : </Text>
								<Text flex text70BO>
									{cupListData.current.user_name}
								</Text>
							</View>
							<View row>
								<Text flex>Remark : </Text>
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
