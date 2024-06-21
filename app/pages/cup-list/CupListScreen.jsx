import { Picker, SegmentedControl, Text, View, WheelPicker } from "react-native-ui-lib";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
			<GestureHandlerRootView>
				<View flex>
					<View flex-1 center row marginL-10 marginR-10 marginT-10>
						<View flex-2>
							<Text text50BO>Orders List</Text>
						</View>
						<View flex-2>
							<SegmentedControl backgroundColor="white" activeColor="#5AB2FF" segmentLabelStyle={{ width: 40, textAlign: "center" }} segments={[{ label: "All" }, { label: "Month" }, { label: "Year" }]} />
						</View>
					</View>
					<View flex-2 center row marginR-10 marginL-10 gap-10>
						<View flex gap-5>
							<Text text60BO center>
								Vendor
							</Text>
							<Picker
								useWheelPicker
								fieldStyle={{
									borderWidth: 1,
									borderRadius: 10,
									borderColor: "#00A9FF",
									backgroundColor: "white",
									padding: 10,
								}}
								style={{
									textAlign: "center",
									fontSize: 18,
									color: "#00A9FF",
								}}
								placeholderTextColor="#00A9FF"
								value={filterDetails.vendor}
								placeholder={"Vendors"}
								onChange={(value) => setFilterDetails({ ...filterDetails, vendor: value })}>
								<Picker.Item value={0} label="All" />
								{vendors.map((vendor, index) => (
									<Picker.Item key={index} value={vendor.id} label={vendor.name} />
								))}
							</Picker>
						</View>
						<View flex gap-5>
							<Text text60BO center>
								Product
							</Text>
							<Picker
								useWheelPicker
								fieldStyle={{
									borderWidth: 1,
									borderRadius: 10,
									borderColor: "#00A9FF",
									backgroundColor: "white",
									padding: 10,
								}}
								style={{
									textAlign: "center",
									fontSize: 18,
									color: "#00A9FF",
								}}
								placeholderTextColor="#00A9FF"
								value={filterDetails.vendor}
								placeholder={"Vendors"}
								onChange={(value) => setFilterDetails({ ...filterDetails, vendor: value })}>
								<Picker.Item value={0} label="All" />
								{vendors.map((vendor, index) => (
									<Picker.Item key={index} value={vendor.id} label={vendor.name} />
								))}
							</Picker>
						</View>
					</View>
					<View flex-10 marginR-10 marginL-10 backgroundColor="#fff"></View>
				</View>
			</GestureHandlerRootView>
		</>
	);
};

export default CupListScreen;
