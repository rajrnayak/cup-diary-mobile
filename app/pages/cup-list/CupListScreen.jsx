import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { Button, Card, GridList, Picker, SegmentedControl, Text, View } from "react-native-ui-lib";
import AxiosBaseUrl from "../../component/AxiosBaseUrl";
import Form from "./Form.jsx";

const CupListScreen = () => {
	const [filterDetails, setFilterDetails] = useState({
		type: 0,
		vendor: 0,
		product: 0,
	});
	const [vendors, setVendors] = useState([]);
	const [cupList, setCupList] = useState([]);
	const formRef = useRef(null);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		await loadVendor();
		// loadList(0, filterDetails.vendor);
	};

	const loadVendor = async () => {
		AxiosBaseUrl({
			method: "get",
			url: "load-vendor",
		})
			.then((response) => {
				let vendors = response.data ?? [];
				setVendors(vendors);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

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
				setCupList(response.data.cup_list);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const openFormModal = () => {
		formRef.current.open();
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
								value={filterDetails.product}
								placeholder={"Products"}
								onChange={(value) => setFilterDetails({ ...filterDetails, product: value })}>
								<Picker.Item value={0} label="All" />
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
			<Form ref={formRef} vendors={vendors} />
		</>
	);
};

export default CupListScreen;
