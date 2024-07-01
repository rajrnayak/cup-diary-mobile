import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button, Chip, DateTimePicker, Modal, Picker, Text, TextField, Toast, View } from "react-native-ui-lib";
import Divider from "../../component/Divider";
import CupListCard from "./CupListCard";
import AxiosBaseUrl from "../../component/AxiosBaseUrl";

const Form = forwardRef(({ vendors }, ref) => {
	const [isVisible, setIsVisible] = useState({
		modalOpen: false,
		toastOpen: false,
	});
	const [products, setProducts] = useState([]);
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
		setIsVisible({ ...isVisible, modalOpen: true });
	};

	const close = () => {
		setIsVisible({ ...isVisible, modalOpen: false });
	};

	useEffect(() => {
		setProducts([]);
	}, [fields.vendor_id == 0]);

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

	const changeVendor = (id) => {
		setFields({ ...fields, vendor_id: id });
		getProducts(id);
	};

	const addCupList = () => {
		let data = { ...fields };
		data.cup_list.push({
			id: null,
			product_id: "",
			price: "",
			cups: "",
		});
		setFields(data);
	};

	const getProducts = (vendor_id) => {
		vendor_id != "" &&
			AxiosBaseUrl({
				method: "get",
				url: `get-products/${vendor_id}`,
			})
				.then(function (response) {
					let products = response.data;
					setProducts(products);
				})
				.catch(function (error) {
					console.log(error.response.data.errors);
				});
	};

	const deleteCupListField = async (index) => {
		let cupLists = [...fields.cup_list];
		if (cupLists.length > 1) {
			let changed_cup_lists = cupLists.filter((a, i) => i !== index);
			setFields({
				...fields,
				cup_list: changed_cup_lists,
			});
		} else {
			setIsVisible({ ...isVisible, toastOpen: true });
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setIsVisible({ ...isVisible, toastOpen: false });
		}
	};

	const changeCupListField = (index, name, value) => {
		let cupLists = [...fields.cup_list];
		let action = true;

		cupLists.forEach((cup) => {
			if (cup.product_id == value) {
				action = false;
				return;
			}
		});

		if (action && name == "product_id") {
			cupLists[index][name] = value;

			setFields({ ...fields, cup_list: cupLists });
			setPrice(value, index, cupLists);
		}

		if (name != "product_id") {
			cupLists[index][name] = value;

			setFields({ ...fields, cup_list: cupLists });
		}
	};

	const setPrice = (product_id, index, cupLists) => {
		let cupListPrice = cupLists[index]["price"];
		let productPrice = 0;

		products.forEach((product) => {
			if (product.id == product_id) {
				productPrice = product.price;
			}
		});

		if (productPrice != cupListPrice) {
			cupLists[index]["price"] = productPrice;
			setFields({ ...fields, cup_list: cupLists });
		}
	};

	return (
		<Modal visible={isVisible.modalOpen} transparent onRequestClose={() => close()} animationType="slide">
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
							<View flex gap-10>
								<View row gap-5 marginT-10>
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
								<View gap-5>
									<View flex>
										<Text text70BO color="#00A9FF">
											Vendor
										</Text>
									</View>
									<View flex-3>
										<Picker
											key="formVendor"
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
											placeholder="Vendors"
											value={fields.vendor_id}
											onChange={(value) => {
												changeVendor(value);
											}}>
											<Picker.Item value={0} label="Select Vendor." />
											{vendors && vendors.map((vendor, index) => <Picker.Item key={index} value={vendor.id} label={vendor.name} />)}
										</Picker>
									</View>
								</View>
								<View gap-5>
									<View flex>
										<Text text70BO color="#00A9FF">
											Entry At
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
								<View gap-5>
									<View flex>
										<Text text70BO color="#00A9FF">
											Remark
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
										/>
									</View>
								</View>
								<View flex row center>
									<View flex>
										<Text text50BO>CupList</Text>
									</View>
									<View>
										<Button onPress={addCupList} label={<Ionicons name="add-outline" size={20} color="white" />} backgroundColor="#00A9FF" borderRadius={10} />
									</View>
								</View>
								<Divider />
								<View>
									{
										// form start
									}
									{fields.cup_list.map((row, index) => {
										return <CupListCard key={index} index={index} cup_list={row} products={products} deleteCupListField={deleteCupListField} changeCupListField={changeCupListField} />;
									})}
									{
										// form end
									}
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
			<Toast visible={isVisible.toastOpen} position={"bottom"} backgroundColor="#ff5252" message="At least one Cup-List required!" />
		</Modal>
	);
});

export default Form;
