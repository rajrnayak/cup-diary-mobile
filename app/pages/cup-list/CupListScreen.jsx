import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { Button, Card, Drawer, GridList, Picker, SegmentedControl, Text, View } from "react-native-ui-lib";
import AxiosInstance from "../../component/AxiosInstance";
import Form from "./Form.jsx";
import CupListDetails from "./CupListDetails.jsx";
import CupListDetailModal from "./CupListDetailModal.jsx";
import { ActivityIndicator } from "react-native";

const CupListScreen = () => {
	const [filterDetails, setFilterDetails] = useState({
		type: 1,
		vendor: 0,
		product: 0,
	});
	const [vendors, setVendors] = useState([]);
	const [products, setProducts] = useState([]);
	const [cupList, setCupList] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		loading: false,
		moreLoading: false,
		isListEnd: false,
		initialNumToRender: 10,
		total_record: null
	});
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
		// }, [filterDetails]);
	}, [filterDetails, pagination.page]);

	const loadData = async () => {
		await loadVendor();
		await loadList();
	};

	const loadVendor = async () => {
		AxiosInstance({
			method: "get",
			url: "cup-list/load-vendor",
		})
			.then((response) => {
				let vendors = response.data;
				setVendors(vendors);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const loadList = (type = filterDetails.type, vendor = filterDetails.vendor, product = filterDetails.product) => {
		data = {
			type: type,
			vendor: vendor,
			product: product,
			page: pagination.page,
			per_page: pagination.initialNumToRender
		};
		console.log(`total-${pagination.total_record}  cup-list-${cupList.length}`);
		pagination.page === 1 ? setPagination({ ...pagination, loading: true }) : setPagination({ ...pagination, moreLoading: true })

		if (pagination.total_record == cupList.length) {
			setPagination({ ...pagination, isListEnd: true });
		} else {
			AxiosInstance({
				method: "post",
				url: "cup-list/load-cup-list-data",
				data: data,
			})
				.then((response) => {
					// console.log(response.data.cup_list.data);
					const data = [...cupList,response.data.cup_list.data];
					setCupList(data);
					// if (data.length == 0) {
					// 	setPagination({ ...pagination, isListEnd: true });
					// 	// }else{
					// }
					setPagination({ ...pagination, loading: false, moreLoading: false, total_record: response.data.cup_list.total });
				})
				.catch(function (error) {
					console.log(error.response.data.message);
				});
		}
	};
	const getProducts = (vendor_id) => {
		vendor_id != "" &&
			AxiosInstance({
				method: "get",
				url: `cup-list/get-products/${vendor_id}`,
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
		AxiosInstance({
			method: "get",
			url: `cup-list/edit-cup-list/${id}`,
		})
			.then(function (response) {
				let cupList = response.data;
				cupList.entry_at = new Date(cupList.entry_at);
				openFormModal(cupList);
			})
			.catch(function (error) {
				console.log(error.response.data.errors);
			});
	};

	const destroyCupList = (id) => {
		AxiosInstance({
			method: "get",
			url: `cup-list/destroy/${id}`,
		})
			.then(function (response) {
				console.log(response.data);
				loadList();
			})
			.catch(function (error) {
				console.log(error.response.data);
			});
	};

	const openFormModal = (cupList) => {
		formRef.current.open(cupList);
	};

	const openModal = (cupList) => {
		detailModal.current.open(cupList);
	};

	const fetchMoreData = () => {
		// let my = [];
		// if(){
		// 	console.log(true);
		// }else{
		// 	console.log(false);
		// }
		if (!pagination.isListEnd && !pagination.moreLoading) {
			setPagination({ ...pagination, page: pagination.page + 1 })
		};
	}

	const renderFooter = () => {
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				{pagination.moreLoading && <ActivityIndicator size="large" />}
				{pagination.isListEnd && <Text>No More Data At The Moment...</Text>}
			</View>
		);
	}

	return (
		<>
			<GestureHandlerRootView>
				<View flex>
					<View flex-1 center row marginL-10 marginR-10 marginT-10>
						<View flex-2>
							<Text text50BO>Orders List</Text>
						</View>
						<View flex-2>
							<SegmentedControl
								initialIndex={filterDetails.type}
								backgroundColor="white"
								activeColor="#5AB2FF"
								onChangeIndex={(type) => setFilterDetails({ ...filterDetails, type: type })}
								segmentLabelStyle={{ width: 40, textAlign: "center" }}
								segments={[{ label: "All" }, { label: "Month" }, { label: "Year" }]}
							/>
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
						{pagination.loading ?
							<View style={{ position: 'absolute', top: 150, left: 180 }} >
								<ActivityIndicator size="large" />
							</View>
							:
							<GridList
								listPadding={5}
								data={cupList[0]}
								numColumns={1}
								ListFooterComponent={renderFooter}
								itemSpacing={2}
								onEndReached={fetchMoreData}
								onEndReachedThreshold={0.2}
								renderItem={({ item }) => (
									<Drawer rightItems={[{ text: "Delete", background: "red", onPress: () => destroyCupList(item.id) }]} leftItem={{ text: "Update", background: "blue", onPress: () => editCupList(item.id) }}>
										<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4 onPress={() => openModal(item)}>
											<CupListDetails cupList={item} />
										</Card>
									</Drawer>
								)}
							/>}
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
			<Form ref={formRef} vendors={vendors} loadList={loadList} />
			<CupListDetailModal ref={detailModal} />
		</>
	);
};

export default CupListScreen;
