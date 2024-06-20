import { Picker, SegmentedControl, Text, View } from "react-native-ui-lib";
import { useState } from "react";

{
	/* Vendor, Entry At, Total Cups, Total Amount, Remark, Created By,
		{
			Product, Cups, Price, Amount
		} */
}

const CupListScreen = () => {
	let vendors = [
		{ id: 1, name: "AnkitTea" },
		{ id: 2, name: "BabuLal" },
		{ id: 3, name: "ChiragTea" },
	];
	const [filterDetails, setFilterDetails] = useState({
		vendor: 0,
		product: 0,
	});

	return (
		<>
			<View flex>
				<View flex-1 center row margin-10 backgroundColor="#fff">
					<View flex-2>
						<Text text50BO>Orders List</Text>
					</View>
					<View flex-2>
						<SegmentedControl backgroundColor="white" activeColor="#5AB2FF" segmentLabelStyle={{ width: 40, textAlign: "center" }} segments={[{ label: "Month" }, { label: "Year" }, { label: "All" }]} />
					</View>
				</View>
				<View flex-1 center row marginR-10 marginL-10 marginB-10 backgroundColor="#fff">
					<View flex-2>
						<Picker value={filterDetails.vendor} placeholder={"Vendors"} onChange={(value) => setFilterDetails({ ...filterDetails, vendor: value })}>
							{vendors.map((vendor, index) => (
								<Picker.Item key={index} value={vendor.id} label={vendor.name} />
							))}
						</Picker>
					</View>
					<View flex-2></View>
				</View>
				<View flex-10 marginR-10 marginL-10 backgroundColor="#fff"></View>
			</View>
		</>
	);
};

export default CupListScreen;
