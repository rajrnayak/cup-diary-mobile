import { useEffect, useRef, useState } from "react";
import { Card, Chip, GridList, SegmentedControl, Text, View } from "react-native-ui-lib";
import CupListModal from "./CupListModal.jsx";
import CupListCardDetails from "./CupListCardDetails.jsx";
import OverviewCardDetails from "./OverviewCardDetails.jsx";
import AxiosInstance from "../../component/AxiosInstance.jsx";
import { FlatList, ScrollView } from "react-native";

const HomeScreen = () => {
	const [cupListTotal, setCupListTotal] = useState({
		total_cups: 0,
		total_amount: 0,
	});
	const [cupList, setCupList] = useState([]);
	const modalRef = useRef(null);

	const openModal = (cupList) => {
		modalRef.current.open(cupList);
	};

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		await loadCupListTotal(0);
		await loadCupList();
	};

	const loadCupListTotal = (durationNumber) => {
		data = { type: durationNumber };
		AxiosInstance({
			method: "post",
			url: "home/load-cup-list-total",
			data: data,
		})
			.then((response) => {
				setCupListTotal(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const loadCupList = () => {
		AxiosInstance({
			method: "get",
			url: "home/load-last-7-days-record",
		})
			.then((response) => {
				setCupList(response.data.last_7_days);
			})
			.catch(function (error) {
				console.log(error);
			});
	};


	return (
		<>
			<ScrollView nestedScrollEnabled={true}>
				<View flex>
					<View flex-1 marginT-10 marginB-15 paddingL-10 paddingR-10>
						<View flex-1 row center marginB-10>
							<View flex-1 left>
								<Text text50>Overview</Text>
							</View>
							<View flex-2 right>
								<SegmentedControl initialIndex={0} backgroundColor="white" onChangeIndex={loadCupListTotal} segmentLabelStyle={{ width: 40, textAlign: "center" }} activeColor="#5AB2FF" segments={[{ label: "Week" }, { label: "Month" }]} />
							</View>
						</View>
						<View flex-2 row gap-10>
							<Card flex backgroundColor="white">
								<OverviewCardDetails icon="cafe-outline" text="Total Orders" value={cupListTotal.total_cups} />
							</Card>
							<Card flex center backgroundColor="white">
								<OverviewCardDetails icon="cash-outline" text="Total Amounts" value={cupListTotal.total_amount} amountIcon />
							</Card>
						</View>
					</View>
					<View flex-2 marginB-10>
						<View flex-1 marginB-10 row center paddingL-10 paddingR-10>
							<View flex-1 left>
								<Text text50>Cup List</Text>
							</View>
							<View flex-2 right>
								<Text>
									<Chip label={"Last 7 Days Details"} />
								</Text>
							</View>
						</View>
						<View flex-6>
							<GridList
								scrollEnabled={false}
								listPadding={5}
								data={cupList}
								numColumns={1}
								itemSpacing={2}
								renderItem={({ item }) => (
									<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4 onPress={() => openModal(item)}>
										<CupListCardDetails cupList={item} />
									</Card>
								)}
							/>
						</View>
					</View>
					<View flex-2 marginB-10>
						<View flex-1 marginB-10 row center paddingL-10 paddingR-10>
							<View flex-1 left>
								<Text text50>Vendor</Text>
							</View>
							<View flex-2 right>
								<Text>
									<Chip label={"Last 7 Days Details"} />
								</Text>
							</View>
						</View>
						<View flex-6>
							
						</View>
					</View>
				</View>
			</ScrollView>
			<CupListModal ref={modalRef} />
		</>
	);
};

export default HomeScreen;

/*
	<View flex>
				<View flex-1 paddingL-10 paddingR-10>
					<View flex-1 row center>
						<View flex-1 left>
							<Text text50>Overview</Text>
						</View>
						<View flex-2 right>
							<SegmentedControl initialIndex={0} backgroundColor="white" onChangeIndex={loadCupListTotal} segmentLabelStyle={{ width: 40, textAlign: "center" }} activeColor="#5AB2FF" segments={[{ label: "Week" }, { label: "Month" }]} />
						</View>
					</View>
					<View flex-2 row gap-10>
						<Card flex backgroundColor="white">
							<OverviewCardDetails icon="cafe-outline" text="Total Orders" value={cupListTotal.total_cups} />
						</Card>
						<Card flex center backgroundColor="white">
							<OverviewCardDetails icon="cash-outline" text="Total Amounts" value={cupListTotal.total_amount} amountIcon />
						</Card>
					</View>
				</View>
				<View flex-2>
					<View flex-1 row center paddingL-10 paddingR-10>
						<View flex-1 left>
							<Text text50>Cup List</Text>
						</View>
						<View flex-2 right>
							<Text>
								<Chip label={"Last 7 Days Details"} />
							</Text>
						</View>
					</View>
					<View flex-6>
						<GridList
							listPadding={5}
							data={cupList}
							numColumns={1}
							itemSpacing={2}
							renderItem={({ item }) => (
								<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4 onPress={() => openModal(item)}>
									<CupListCardDetails cupList={item} />
								</Card>
							)}
						/>
					</View>
				</View>
				</View>
				<CupListModal ref={modalRef} />
*/