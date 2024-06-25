import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { Badge, Button, Card, Chip, ChipsInput, DateTimePicker, GridList, Modal, Picker, SegmentedControl, Text, TextField, View } from "react-native-ui-lib";
import CupListCardDetails from "../home/CupListCardDetails";
import AxiosBaseUrl from "../../component/AxiosBaseUrl";
import Divider from "../../component/Divider";

const CupListScreen = () => {
	let vendors = [
		{ id: 1, name: "AnkitTea" },
		{ id: 2, name: "BabuLal" },
		{ id: 3, name: "ChiragTea" },
	];
	const [filterDetails, setFilterDetails] = useState({
		vendor: 0,
		product: 0,
		isVisible: false,
	});
	// const formRef = useRef(null);

	let cups = [{ created_by: 1, cup_list: [[Object]], entry_at: "Fri, May 31, 2024, 04:09 PM", id: 49, is_editable: 1, remark: null, total_amount: 40, total_cups: 4, users: { id: 1, username: "raj" }, vendor_id: 1, vendors: { id: 1, name: "Ankit Tea" } }];

	useEffect(() => {
		// loadList(0, filterDetails.vendor);
	}, []);

	const loadList = (type, vendor) => {
		data = {
			type: type,
			vendor_id: vendor,
		};

		AxiosBaseUrl({
			method: "post",
			url: "load-cup-list-data",
			data: data,
		})
			.then((response) => {
				console.log(response.data.cup_list);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const openFormModal = () => {
		setFilterDetails({ ...filterDetails, isVisible: true });
	};

	const closeFormModal = () => {
		setFilterDetails({ ...filterDetails, isVisible: false });
	};

	return (
		<>
			<GestureHandlerRootView>
				<View flex>
					<View flex-1 center row marginL-10 marginR-10 marginT-10>
						<View flex-2>
							<Text text50BO>Orders List</Text>
						</View>
						<View flex-2>
							<SegmentedControl backgroundColor="white" activeColor="#5AB2FF" onChangeIndex={loadList} segmentLabelStyle={{ width: 40, textAlign: "center" }} segments={[{ label: "All" }, { label: "Month" }, { label: "Year" }]} />
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
					<View flex-10>
						<GridList
							listPadding={5}
							data={cups}
							numColumns={1}
							itemSpacing={2}
							renderItem={({ item }) => (
								<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4>
									<CupListCardDetails cupList={item} />
								</Card>
							)}
						/>
					</View>
				</View>
			</GestureHandlerRootView>
			<Button
				onPress={() => openFormModal()}
				label={<Ionicons name="create" size={20} color="white" />}
				backgroundColor="#00A9FF"
				style={{
					position: "absolute",
					right: 10,
					bottom: 10,
				}}
			/>
			<Modal visible={filterDetails.isVisible} onBackgroundPress={() => closeFormModal()} transparent onRequestClose={() => closeFormModal()} animationType="slide">
				<View flex backgroundColor="white" padding-10>
					<View flex>
						<View paddingB-7 row center>
							<Text text40BO>Create CupList</Text>
							<View flex right>
								<Text color="#0d6efd" text70BO onPress={() => closeFormModal()}>
									Cancel
								</Text>
							</View>
						</View>
						<Divider />
						<View flex>
							<View row gap-5 marginT-10 marginB-10>
								<Chip
									flex-2
									label={"Total Cups"}
									padding-10
									onPress={() => console.log("pressed")}
									labelStyle={{ fontSize: 15 }}
									badgeProps={{
										label: "40",
										labelStyle: {
											fontSize: 15,
										},
										backgroundColor: "#00A9FF",
									}}
								/>
								<Chip
									flex-3
									label={"Total Amount"}
									padding-10
									onPress={() => console.log("pressed")}
									labelStyle={{ fontSize: 15 }}
									badgeProps={{
										label: "100",
										labelStyle: {
											fontSize: 15,
										},
										backgroundColor: "#00A9FF",
									}}
								/>
							</View>
							<View row>
								<View flex center>
									<Text text70BO color="#00A9FF">
										Vendor :
									</Text>
								</View>
								<View flex-3>
									<Picker
										useWheelPicker
										fieldStyle={{
											borderWidth: 1,
											borderRadius: 10,
											padding: 10,
										}}
										style={{
											textAlign: "center",
											fontSize: 18,
										}}
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
							<View row marginT-20>
								<View flex center>
									<Text text70BO color="#00A9FF">
										Entry At :
									</Text>
								</View>
								<View flex-3 row gap-5>
									<View flex>
										<DateTimePicker
											title={"Select time"}
											placeholder={"Enter Date"}
											mode={"date"}
											padding-10
											fieldStyle={{
												borderWidth: 1,
												borderRadius: 10,
											}}
										/>
									</View>
									<View flex>
										<DateTimePicker
											title={"Select time"}
											placeholder={"Enter Time"}
											mode={"time"}
											padding-10
											fieldStyle={{
												borderWidth: 1,
												borderRadius: 10,
											}}
										/>
									</View>
								</View>
							</View>
							<View row>
								<View flex center>
									<Text text70BO color="#00A9FF">
										Remark :
									</Text>
								</View>
								<View flex-3>
									<TextField
										padding-10
										fieldStyle={{
											borderWidth: 1,
											borderRadius: 10,
										}}
										placeholder={"Enter Remark."}
										floatingPlaceholder
										onChangeText={() => {}}
										enableErrors
										validate={["required", "email", (value) => value.length > 6]}
										validationMessage={["Field is required", "Email is invalid", "Password is too short"]}
									/>
								</View>
							</View>
							<View flex padding-10 borderWidth={1} borderRadius={10}>
								<View row center>
									<View flex>
										<Text text50BO>CupList</Text>
									</View>
									<View>
										<Button onPress={() => openFormModal()} label={<Ionicons name="add-outline" size={20} color="white" />} backgroundColor="#00A9FF" borderRadius={10} />
									</View>
								</View>
								<Divider />
								<GestureHandlerRootView>
									<ScrollView>
										<View>
											<Text text10>1</Text>
											<Text text10>2</Text>
											<Text text10>3</Text>
											<Text text10>4</Text>
											<Text text10>5</Text>
											<Text text10>6</Text>
											<Text text10>7</Text>
											<Text text10>8</Text>
											<Text text10>9</Text>
											<Text text10>10</Text>
										</View>
									</ScrollView>
								</GestureHandlerRootView>
							</View>
						</View>
						<View>
							<View right marginT-10>
								<Button label="Submit" backgroundColor="#0d6efd" onPress={() => console.log("Submitted")} borderRadius={10} />
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default CupListScreen;
