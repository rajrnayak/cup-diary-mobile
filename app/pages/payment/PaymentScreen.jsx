import { Card, GridList, Button, Picker, SegmentedControl, Text, Toast, View, Drawer } from "react-native-ui-lib";
import { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PaymentCardDetails from "./PaymentCardDetails";
import PaymentModal from "./PaymentModal";
import AxiosInstance from "../../component/AxiosInstance";
import Ionicons from "@expo/vector-icons/Ionicons";
import Form from "./Form";
// import { Picker } from "@react-native-picker/picker";

const PaymentScreen = () => {
	const [filterDetails, setFilterDetails] = useState({
		type: 0,
		vendor_id: 0,
		payment_type: 2,
	});
	const [isToast, setIsToast] = useState(false);
	const [paymentLits, setPaymentList] = useState([]);
	const [vendors, setVendors] = useState([]);
	const modalRef = useRef(null);
	const formRef = useRef(null);

	let types = [
		{ id: 0, name: "credit" },
		{ id: 1, name: "debit" },
	];

	const openForm = (payment) => {
		if (payment.id) {
			payment.payment_at = new Date(payment.payment_at);
		}
		formRef.current.open(payment);
	};

	const openModal = (payment) => {
		modalRef.current.open(payment);
	};

	function loadData() {
		AxiosInstance({
			method: "post",
			url: "payment/load-payments",
			data: filterDetails,
		})
			.then((response) => {
				// console.log(response.data.payment_lits);
				setPaymentList(response.data.payment_lits);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function destroy(id) {
		AxiosInstance({
			method: "get",
			url: `payment/destroy/${id}`,
		})
			.then((response) => {
				console.log(response.data);
				loadData();
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	}

	async function loadVendors() {
		await AxiosInstance({
			method: "get",
			url: "payment/load-vendor",
		})
			.then((response) => {
				// console.log(response.data);
				setVendors(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	useEffect(() => {
		loadData();
		loadVendors();
	}, [filterDetails]);

	// async function myfun() {
	// 	setIsToast(true);
	// 	await new Promise(resolve => setTimeout(resolve, 1000));
	// 	setIsToast(false);
	// }

	return (
		<>
			<GestureHandlerRootView>
				<View flex>
					<View flex-1 center row margin-10>
						<View flex-2>
							<Text text50BO>Payments List</Text>
						</View>
						<View flex-2>
							<SegmentedControl backgroundColor="white" activeColor="#5AB2FF" segmentLabelStyle={{ width: 40, textAlign: "center" }} onChangeIndex={(index) => setFilterDetails({ ...filterDetails, type: index })} segments={[{ label: "All" }, { label: "Month" }, { label: "Year" }]} />
						</View>
					</View>
					<View flex-2 center row marginR-10 marginL-10 gap-10>
						<View flex gap-5>
							<Text text60BO center>
								Vendor
							</Text>
							<Picker
								useWheelPicker
								key={vendors.length}
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
								value={filterDetails.vendor_id}
								placeholder={"Vendors"}
								onChange={(value) => setFilterDetails({ ...filterDetails, vendor_id: value })}>
								<Picker.Item value={0} label="All" />
								{vendors && vendors.map((vendor, index) => <Picker.Item key={index} value={vendor.id} label={vendor.name} />)}
							</Picker>
						</View>
						<View flex gap-5>
							<Text text60BO center>
								Type
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
								value={filterDetails.payment_type}
								placeholder={"Types"}
								onChange={(value) => setFilterDetails({ ...filterDetails, payment_type: value })}>
								<Picker.Item value={2} label="All" />
								{types.map((type, index) => (
									<Picker.Item key={index} value={type.id} label={type.name} />
								))}
							</Picker>
						</View>
					</View>
					<View flex-10>
						<GridList
							listPadding={5}
							data={paymentLits}
							numColumns={1}
							itemSpacing={2}
							renderItem={({ item }) => (
								<Drawer
									rightItems={[
										{
											text: "Delete",
											background: "red",
											onPress: () => {
												destroy(item.id);
											},
										},
									]}
									leftItem={{
										text: "Edit",
										background: "blue",
										onPress: () => {
											openForm(item);
										},
									}}>
									<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4 onPress={() => openModal(item)}>
										<PaymentCardDetails payment={item} />
									</Card>
								</Drawer>
							)}
						/>
					</View>
				</View>
			</GestureHandlerRootView>
			<Button
				style={{
					bottom: 10,
					right: 10,
					position: "absolute",
				}}
				onPress={openForm}
				label={<Ionicons name="create" size={20} color="white" />}
				backgroundColor="#00A9FF"
			/>
			<Form ref={formRef} vendors={vendors} types={types} loadData={loadData} />
			<PaymentModal ref={modalRef} />
		</>
	);
};

export default PaymentScreen;

{
	/* 
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
									height: 50, width: 150
								}}
								placeholderTextColor="#00A9FF"
								value={filterDetails.vendor_id}
								placeholder={"Vendors"}
								onChange={(value) => setFilterDetails({ ...filterDetails, vendor_id: value })}>
								<Picker.Item value={0} label="All" />
								{vendors && vendors.map((vendor, index) => ( 
									<Picker.Item key={index} value={vendor.id} label={vendor.name} />
								))}
							</Picker>

*/
}
