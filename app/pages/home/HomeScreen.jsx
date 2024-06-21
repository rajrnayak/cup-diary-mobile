import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Card, Chip, Dialog, GridList, Modal, SegmentedControl, Text, View } from "react-native-ui-lib";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = () => {
	let cups = [
		// Vendor, Entry At, Total Cups, Total Amount, Remark, Created By
		{ vendor_name: "Ankit Bhai", entry_at: "2 May 2024", total_cups: 2, total_amount: 300, remark: "Nothing", user_name: "Raj" },
	];

	const dialogBoxRef = useRef(null);

	const openDialogBox = (cupList) => {
		dialogBoxRef.current.open(cupList);
	};

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

	const CupListCardDetails = ({ cupList }) => {
		return (
			<>
				<View flex row padding-5>
					<View flex-6 gap-5>
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
					<View flex-1 center>
						<Ionicons name="chevron-forward-outline" size={20} />
					</View>
				</View>
			</>
		);
	};

	return (
		<>
			<View flex>
				<View flex-1 paddingL-10 paddingR-10>
					<View flex-1 row center>
						<View flex-1 left>
							<Text text50>Overview</Text>
						</View>
						<View flex-2 right>
							<SegmentedControl backgroundColor="white" segmentLabelStyle={{ width: 40, textAlign: "center" }} activeColor="#5AB2FF" segments={[{ label: "Week" }, { label: "Month" }]} />
						</View>
					</View>
					<View flex-2 row gap-10>
						<Card flex backgroundColor="white">
							<OverviewCardDetails icon="cafe-outline" text="Total Orders" value="500" />
						</Card>
						<Card flex center backgroundColor="white">
							<OverviewCardDetails icon="cash-outline" text="Total Amounts" value="5000" amountIcon />
						</Card>
					</View>
				</View>
				<View flex-2>
					<View flex-1 row center paddingL-10 paddingR-10>
						<View flex-1 left>
							<Text text50>Cup List</Text>
						</View>
						<View flex-2 right>
							<Text>
								<Chip label={"Last 7 Days Details"} />
							</Text>
						</View>
					</View>
					<View flex-6>
						<GridList
							listPadding={5}
							data={cups}
							numColumns={1}
							itemSpacing={2}
							renderItem={({ item }) => (
								<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4 onPress={() => openDialogBox(item)}>
									<CupListCardDetails cupList={item} />
								</Card>
							)}
						/>
					</View>
				</View>
			</View>
			<CupListDialogBox ref={dialogBoxRef} />
		</>
	);
};

const CupListDialogBox = forwardRef((props, ref) => {
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
					<Card padding-20 onPress={() => close()}>
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
								<Text flex>User Name : </Text>
								<Text flex text70BO>
									{cupListData.current.user_name}
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
						</View>
					</Card>
				</View>
			</Modal>
		</>
	);
});

export default HomeScreen;
