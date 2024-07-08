import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button, Chip, DateTimePicker, GridList, Modal, Picker, Text, TextField, Toast, View } from "react-native-ui-lib";
import Divider from "../../component/Divider";
import CupListCard from "./CupListCard";
import AxiosInstance from "../../component/AxiosInstance";
import { Alert } from "react-native";

const defaultField = {
	id: null,
	vendor_id: "1",
	entry_at: "",
	total_cups: "",
	total_amount: "",
	remark: "",
	user_id: 1,
	cup_list: [
		{
			id: null,
			product_id: "",
			price: "",
			cups: "",
		},
	],
};

const Form = forwardRef(({ vendors, loadList }, ref) => {
	const [isVisible, setIsVisible] = useState({
		modalOpen: false,
		toastOpen: false,
	});
	const [products, setProducts] = useState([]);
	const [fields, setFields] = useState(defaultField);

	const open = async (cupList) => {
		if (cupList) {
			await setFields(cupList);
		} else {
			await setFields({ ...fields, entry_at: new Date() });
			await getProducts(fields.vendor_id);
		}
		setIsVisible({ ...isVisible, modalOpen: true });
	};

	const close = () => {
		setIsVisible({ ...isVisible, modalOpen: false });
		setFields(defaultField);
		setProducts([]);
	};

	useEffect(() => {
		setCupList();
	}, [products]);

	useEffect(() => {
		setTotal();
	}, [fields.cup_list]);

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

	const setTotal = async () => {
		if (fields.cup_list[0].price != "") {
			let cups = 0;
			let amount = 0;

			fields.cup_list.forEach((cup_list, index) => {
				cups += Number(cup_list.cups);
				amount += cup_list.price * cup_list.cups;
			});

			await setFields({
				...fields,
				total_amount: amount,
				total_cups: cups,
			});
		}
	};

	const changeVendor = async (id) => {
		if (fields.id !== null) {
			Alert.alert("Vendor Change!", "Are you sure? you want to change vendor. you'r CupList will be removed.", [
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: async () => {
						await setFields({
							...fields,
							total_amount: "",
							total_cups: "",
							vendor_id: id,
							cup_list: [
								{
									id: null,
									product_id: "",
									price: "",
									cups: "",
								},
							],
						});
						await getProducts(id);
					},
				},
			]);
		} else {
			await setFields({
				...fields,
				total_amount: "",
				total_cups: "",
				vendor_id: id,
				cup_list: [
					{
						id: null,
						product_id: "",
						price: "",
						cups: "",
					},
				],
			});
			await getProducts(id);
		}
	};

	const getProducts = async (vendor_id) => {
		vendor_id != "" &&
			(await AxiosInstance({
				method: "get",
				url: `cup-list/get-products/${vendor_id}`,
			})
				.then(function (response) {
					let products = response.data;
					setProducts(products);
				})
				.catch(function (error) {
					console.log("product", error);
				}));
	};

	const setCupList = async () => {
		let cupList = [];
		products.forEach((product, index) => {
			cupList.push({
				id: null,
				name: product.name,
				product_id: product.id,
				price: product.price,
				cups: 0,
			});
		});
		cupList.length > 0 && setFields({ ...fields, cup_list: cupList });
	};

	const changeCupListField = (index, value) => {
		if (value >= 0) {
			let cupLists = [...fields.cup_list];
			cupLists[index]["cups"] = value;

			setFields({ ...fields, cup_list: cupLists });
		}
	};

	async function handleSubmit(data) {
		let url = "";
		data.id ? (url = `cup-list/store-or-update/${data.id}`) : (url = "cup-list/store-or-update");

		let cupList = [...fields.cup_list];

		data.cup_list = cupList.filter((a) => a.cups != 0);

		await AxiosInstance({
			method: "post",
			url: url,
			data: data,
		})
			.then((response) => {
				console.log(response.data);
				close();
				loadList();
			})
			.catch(function (error) {
				console.log(error.response.data.errors);
			});
	}

	return (
		<Modal visible={isVisible.modalOpen} transparent onRequestClose={() => close()} animationType="slide">
			<GestureHandlerRootView>
				<View flex gap-5 backgroundColor="white">
					<View flex center>
						<View row center padding-10>
							<Text text40BO>Create CupList</Text>
							<View flex right>
								<Text color="#0d6efd" text70BO onPress={() => close()}>
									Cancel
								</Text>
							</View>
						</View>
					</View>
					<View flex-12 gap-10>
						<ScrollView>
							<View flex-2>
								<ScrollView horizontal>
									{vendors.map((item, index) => {
										return fields.vendor_id == item.id ? (
											<View key={index} flex margin-5 marginB-10 marginT-10 padding-10 center style={{ backgroundColor: "#00A9FF", borderRadius: 10 }} onTouchEnd={() => changeVendor(item.id)}>
												<Text color="white">{item.name}</Text>
											</View>
										) : (
											<View key={index} flex margin-5 marginB-10 marginT-10 padding-10 center style={{ borderWidth: 1, borderColor: "black", borderRadius: 10 }} onTouchEnd={() => changeVendor(item.id)}>
												<Text>{item.name}</Text>
											</View>
										);
									})}
								</ScrollView>
								<View flex-3 row gap-10 marginL-10 marginR-10>
									<Chip
										flex-2
										label={"Total Cups"}
										padding-5
										labelStyle={{ fontSize: 15 }}
										badgeProps={{
											label: `${fields.total_cups != "" ? fields.total_cups : "0"}`,
											labelStyle: {
												fontSize: 15,
											},
											backgroundColor: "#00A9FF",
										}}
									/>
									<Chip
										flex-3
										label={"Total Amount"}
										padding-5
										labelStyle={{ fontSize: 15 }}
										badgeProps={{
											label: `${fields.total_amount != "" ? fields.total_amount : "0"}`,
											labelStyle: {
												fontSize: 15,
											},
											backgroundColor: "#00A9FF",
										}}
									/>
								</View>
							</View>
							<View flex-7 marginL-5 marginR-5 marginT-10>
								{fields.cup_list.map((cupList, index) => {
									return <CupListCard key={index} index={index} cup_list={cupList} changeCupListField={changeCupListField} />;
								})}
							</View>
							<View marginL-10 marginR-10 marginT-10>
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
											value={fields.remark}
											placeholder={"Enter Remark."}
											onChangeText={(remark) => setFields({ ...fields, remark: remark })}
										/>
									</View>
									<View>
										<View right marginT-10>
											<Button label="Submit" backgroundColor="#0d6efd" onPress={() => handleSubmit(fields)} borderRadius={10} />
										</View>
									</View>
								</View>
							</View>
						</ScrollView>
					</View>
				</View>
			</GestureHandlerRootView>
		</Modal>
	);
});

export default Form;

// const deleteCupListField = async (index) => {
// 	let cupLists = [...fields.cup_list];
// 	if (cupLists.length > 1) {
// 		let changed_cup_lists = cupLists.filter((a, i) => i !== index);
// 		setFields({
// 			...fields,
// 			cup_list: changed_cup_lists,
// 		});
// 	} else {
// 		setIsVisible({ ...isVisible, toastOpen: true });
// 		await new Promise((resolve) => setTimeout(resolve, 2000));
// 		setIsVisible({ ...isVisible, toastOpen: false });
// 	}
// };

// const addCupList = () => {
// 	if (products.length > fields.cup_list.length) {
// 		let data = { ...fields };
// 		data.cup_list.push({
// 			id: null,
// 			product_id: "",
// 			price: "",
// 			cups: "",
// 		});
// 		setFields(data);
// 	}
// };

// const setPrice = (product_id, index, cupLists) => {
// 	let cupListPrice = cupLists[index]["price"];
// 	let productPrice = 0;

// 	products.forEach((product) => {
// 		if (product.id == product_id) {
// 			productPrice = product.price;
// 		}
// 	});

// 	if (productPrice != cupListPrice) {
// 		cupLists[index]["price"] = productPrice;
// 		setFields({ ...fields, cup_list: cupLists });
// 	}
// };

{
	/* <View flex backgroundColor="white" padding-10>
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
											label: `${fields.total_cups != "" ? fields.total_cups : "0"}`,
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
											label: `${fields.total_amount != "" ? fields.total_amount : "0"}`,
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
											value={fields.remark}
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
							<Button label="Submit" backgroundColor="#0d6efd" onPress={() => handleSubmit(fields)} borderRadius={10} />
						</View>
					</View>
				</View>
			</View>
			<Toast visible={isVisible.toastOpen} position={"bottom"} backgroundColor="#ff5252" message="At least one Cup-List required!" /> */
}
