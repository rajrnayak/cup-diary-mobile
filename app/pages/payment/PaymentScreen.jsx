import { Card, GridList,Picker, SegmentedControl, Text, View } from "react-native-ui-lib";
import { useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PaymentCardDetails from "./PaymentCardDetails";
import Axios from "../../component/AxiosBaseUrl";
import PaymentModal from "./PaymentModal";
// import { Picker } from "@react-native-picker/picker";

const PaymentScreen = () => {
	const [filterDetails, setFilterDetails] = useState({
		type: 0,
		vendor_id: 0,
		payment_type: 2,
	});
	const [paymentLits, setPaymentList] = useState([]);
	const [vendors1, setVendors] = useState([]);
	const modalRef = useRef(null);
	let vendors = [];
	// let vendors = [
	// 	{ id: 1, name: "AnkitTea" },
	// 	{ id: 2, name: "BabuLal" },
	// 	{ id: 3, name: "ChiragTea" },
	// ];

	let types = [
		{ id: 0, name: 'credit' },
		{ id: 1, name: 'debit' },
	];

	const openModal = (payment) => {
		modalRef.current.open(payment);
	};


	function loadData(filterDetails) {
		Axios({
			method: 'post',
			url: 'load-payments',
			data: filterDetails
		})
			.then((response) => {
				// console.log(response.data.payment_lits);
				setPaymentList(response.data.payment_lits);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	async function loadVendors() {
		await Axios({
			method: 'get',
			url: 'load-vendor',
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
		loadData(filterDetails);
		loadVendors();
	}, [filterDetails]);

	return (
		<>
			<GestureHandlerRootView>
				<View flex>
					<View flex-1 center row margin-10 >
						<View flex-2>
							<Text text50BO>Payments List</Text>
						</View>
						<View flex-2>
							<SegmentedControl
								backgroundColor="white"
								activeColor="#5AB2FF"
								segmentLabelStyle={{ width: 40, textAlign: "center" }}
								onChangeIndex={(index) => setFilterDetails({ ...filterDetails, type: index })}
								segments={[{ label: "All" }, { label: "Month" }, { label: "Year" }]} />
						</View>
					</View>
					<View flex-2 center row marginR-10 marginL-10 gap-10>
						<View flex gap-5>
							<Text text60BO center>
								Vendor
							</Text>
							<Picker
							useSafeArea
								style={{ backgroundColor: '#c9cdd49c', marginBottom: 20 }}
								// mode="dropdown"
								// selectedValue={value} //route.params.firstName ??
								// onValueChange={onChange}
								// onBlur={onBlur}

							>
								{vendors1 && vendors1.map((vendor, index) => (
									<Picker.Item label={vendor.name} value={vendor.id} key={index} />
								))}
							</Picker>
						</View>
						<View flex gap-5>
							<Text text60BO center>
								Type
							</Text>
							{/* <Picker
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
							</Picker> */}
						</View>
					</View>
					<View flex-10 >
						<View>
							{vendors1 && vendors1.map((vendor, index) => (
								<Text key={index}>{vendor.id}</Text>
							))}
						</View>
						{/* <GridList
							listPadding={5}
							data={paymentLits}
							numColumns={1}
							itemSpacing={2}
							renderItem={({ item }) => (
								<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4 onPress={() => openModal(item)}>
									<PaymentCardDetails payment={item} />
								</Card>
							)}
						/> */}
					</View>
				</View>
			</GestureHandlerRootView>
			<PaymentModal ref={modalRef} />
		</>
	);
};

export default PaymentScreen;



{/* 
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
								{vendors1 && vendors1.map((vendor, index) => ( 
									<Picker.Item key={index} value={vendor.id} label={vendor.name} />
								))}
							</Picker>

*/}