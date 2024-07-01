import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Drawer, GridList, Picker, SegmentedControl, Text, View } from "react-native-ui-lib";
import AxiosBaseUrl from "../../component/AxiosBaseUrl";
import Form from "./Form.jsx";
import CupListDetails from "./CupListDetails.jsx";
import CupListDetailModal from "./CupListDetailModal.jsx";

const CupListScreen = () => {
	const [filterDetails, setFilterDetails] = useState({
		type: 1,
		vendor: 0,
		product: 0,
	});
	const [vendors, setVendors] = useState([]);
	const [products, setProducts] = useState([]);
	const [cupList, setCupList] = useState([]);
	const formRef = useRef(null);
	const detailModal = useRef(null);

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		if (filterDetails.vendor != 0) {
			getProducts(filterDetails.vendor);
			setFilterDetails({ ...filterDetails, product: 0 });
		} else {
			setProducts([]);
			setFilterDetails({ ...filterDetails, product: "" });
		}
	}, [filterDetails.vendor]);

	useEffect(() => {
		loadList(filterDetails.type, filterDetails.vendor, filterDetails.product);
	}, [filterDetails]);

	const loadData = async () => {
		await loadVendor();
		await loadList(filterDetails.type, filterDetails.vendor, filterDetails.product);
	};

	const loadVendor = async () => {
		AxiosBaseUrl({
			method: "get",
			url: "load-vendor",
		})
			.then((response) => {
				let vendors = response.data;
				setVendors(vendors);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const loadList = (type, vendor, product) => {
		data = {
			type: type,
			vendor: vendor,
			product: product,
		};

		AxiosBaseUrl({
			method: "post",
			url: "load-cup-list-data",
			data: data,
		})
			.then((response) => {
				// console.log(response.data.cup_list);
				setCupList(response.data.cup_list);
			})
			.catch(function (error) {
				console.log(error.response.data.message);
			});
	};

	const getProducts = (vendor_id) => {
		vendor_id != "" &&
			AxiosBaseUrl({
				method: "get",
				url: `get-products/${vendor_id}`,
			})
				.then(function (response) {
					let products = response.data ?? [];
					setProducts(products);
				})
				.catch(function (error) {
					console.log(error.response.data.errors);
				});
	};

	const editCupList = (id) => {
		AxiosBaseUrl({
			method: "get",
			url: `cup-list/edit-cup-list/${id}`,
		})
			.then(function (response) {
				// console.log(response.data);
				openFormModal(response.data);
			})
			.catch(function (error) {
				console.log(error.response.data.errors);
			});
	};

	const openFormModal = (cupList) => {
		formRef.current.open(cupList);
	};

	const openModal = (cupList) => {
		detailModal.current.open(cupList);
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
							<SegmentedControl backgroundColor="white" activeColor="#5AB2FF" onChangeIndex={(type) => setFilterDetails({ ...filterDetails, type: type })} segmentLabelStyle={{ width: 40, textAlign: "center" }} segments={[{ label: "All" }, { label: "Month" }, { label: "Year" }]} />
						</View>
					</View>
					<View flex-2 center row marginR-10 marginL-10 gap-10>
						<View flex gap-5>
							<Text text60BO center>
								Vendor
							</Text>
							<Picker
								key={vendors.length}
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
								onChange={(value) => setFilterDetails({ ...filterDetails, vendor: value })}>
								<Picker.Item value={0} label="All" />
								{vendors && vendors.map((vendor, index) => <Picker.Item key={index} value={vendor.id} label={vendor.name} />)}
							</Picker>
						</View>
						<View flex gap-5>
							<Text text60BO center>
								Product
							</Text>
							<Picker
								editable={filterDetails.vendor > 0 ? true : false}
								key={products.length}
								useWheelPicker
								fieldStyle={{
									borderWidth: 1,
									borderRadius: 10,
									borderColor: filterDetails.vendor > 0 ? "#00A9FF" : "gray",
									backgroundColor: "white",
									padding: 10,
								}}
								style={{
									textAlign: "center",
									fontSize: 18,
									color: filterDetails.vendor > 0 ? "#00A9FF" : "gray",
								}}
								placeholderTextColor={filterDetails.vendor > 0 ? "#00A9FF" : "gray"}
								value={filterDetails.product}
								placeholder={"Products"}
								onChange={(value) => setFilterDetails({ ...filterDetails, product: value })}>
								<Picker.Item value={0} label="All" />
								{products.map((product, index) => (
									<Picker.Item key={index} value={product.id} label={product.name} />
								))}
							</Picker>
						</View>
					</View>
					<View flex-10>
						<GridList
							listPadding={5}
							data={cupList}
							numColumns={1}
							itemSpacing={2}
							renderItem={({ item }) => (
								<Drawer rightItems={[{ text: "Delete", background: "red", onPress: () => console.log("delete pressed") }]} leftItem={{ text: "Update", background: "blue", onPress: () => editCupList(item.id) }}>
									<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4 onPress={() => openModal(item)}>
										<CupListDetails cupList={item} />
									</Card>
								</Drawer>
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
			<Form ref={formRef} vendors={vendors} />
			<CupListDetailModal ref={detailModal} />
		</>
	);
};

export default CupListScreen;
