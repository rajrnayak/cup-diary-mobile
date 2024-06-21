import { useRef } from "react";
import { Card, Chip, GridList, SegmentedControl, Text, View } from "react-native-ui-lib";
import CupListModal from "./CupListModal.jsx";
import CupListCardDetails from "./CupListCardDetails.jsx";
import OverviewCardDetails from "./OverviewCardDetails.jsx";

const HomeScreen = () => {
	let cups = [
		// Vendor, Entry At, Total Cups, Total Amount, Remark, Created By
		{ vendor_name: "Ankit Bhai", entry_at: "2 May 2024", total_cups: 2, total_amount: 300, remark: "Nothing", user_name: "Raj" },
		{ vendor_name: "DaudBhai", entry_at: "3 May 2024", total_cups: 100, total_amount: 1000, remark: "", user_name: "Raj" },
	];

	const modalRef = useRef(null);

	const openModal = (cupList) => {
		modalRef.current.open(cupList);
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
								<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4 onPress={() => openModal(item)}>
									<CupListCardDetails cupList={item} />
								</Card>
							)}
						/>
					</View>
				</View>
			</View>
			<CupListModal ref={modalRef} />
		</>
	);
};

export default HomeScreen;
