import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button, Chip, DateTimePicker, Modal, Picker, Text, TextField, View } from "react-native-ui-lib";
import Divider from "../../component/Divider";
import CupListCard from "./CupListCard";
import AxiosBaseUrl from "../../component/AxiosBaseUrl";

const Form = forwardRef((props, ref) => {
	const [isVisible, setIsVisible] = useState(false);
	const [vendors, setVendors] = useState([]);
	const [fields, setFields] = useState({
		id: null,
		vendor_id: 0,
		entry_at: "",
		total_cups: "",
		total_amount: "",
		remark: "",
		cup_list: [
			{
				id: null,
				product_id: "",
				price: "",
				cups: "",
			},
		],
	});

	const open = () => {
		setIsVisible(true);
	};

	const close = () => {
		setIsVisible(false);
	};

	useEffect(() => {
		loadVendor();
	}, []);

	const loadVendor = () => {
		AxiosBaseUrl({
			method: "get",
			url: "load-vendor",
		})
			.then((response) => {
				setVendors(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
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

	console.log(fields);

	return (
		<Modal visible={isVisible} transparent onRequestClose={() => close()} animationType="slide">
			<View flex backgroundColor="white" padding-10>
				<View flex>
					<View paddingB-7 row center>
						<Text text40BO>Create CupList</Text>
						<View flex right>
							<Text color="#0d6efd" text70BO onPress={() => close()}>
								Cancel
							</Text>
						</View>
					</View>
					<Divider />
					<GestureHandlerRootView>
						<ScrollView>
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
											key="formVendor"
											// useWheelPicker
											fieldStyle={{
												borderWidth: 1,
												borderRadius: 10,
												padding: 10,
											}}
											style={{
												textAlign: "center",
												fontSize: 18,
											}}
											value={fields.vendor_id}
											onChange={(value) => setFields({ ...fields, vendor_id: value })}>
											<Picker.Item value={0} label="All" />
											{vendors && vendors.map((vendor, index) => <Picker.Item key={index} value={vendor.id} label={vendor.name} />)}
										</Picker>
									</View>
								</View>
								<View row marginT-10>
									<View flex center>
										<Text text70BO color="#00A9FF">
											Entry At :
										</Text>
									</View>
									<View flex-3 row gap-5>
										<View flex>
											<DateTimePicker
												title={"Select time"}
												value={fields.entry_at}
												onChange={(date) => setFields({ ...fields, entry_at: date })}
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
												value={fields.entry_at}
												onChange={(time) => setFields({ ...fields, entry_at: time })}
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
								<View row marginT-10>
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
											onChangeText={(remark) => setFields({ ...fields, remark: remark })}
											// enableErrors
											// validate={["required", "email", (value) => value.length > 6]}
											// validationMessage={["Field is required", "Email is invalid", "Password is too short"]}
										/>
									</View>
								</View>
								<View flex row center marginT-10>
									<View flex>
										<Text text50BO>CupList</Text>
									</View>
									<View>
										<Button label={<Ionicons name="add-outline" size={20} color="white" />} backgroundColor="#00A9FF" borderRadius={10} />
									</View>
								</View>
								<Divider />
								<View marginT-10>
									<CupListCard />
								</View>
							</View>
						</ScrollView>
					</GestureHandlerRootView>
					<View>
						<View right marginT-10>
							<Button label="Submit" backgroundColor="#0d6efd" onPress={() => console.log("Submitted")} borderRadius={10} />
						</View>
					</View>
				</View>
			</View>
		</Modal>
	);
});

export default Form;
