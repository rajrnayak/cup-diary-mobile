import { useEffect, useRef, useState } from "react";
import { Card, Chip, GridList, SegmentedControl, Text, View } from "react-native-ui-lib";
import CupListModal from "./CupListModal.jsx";
import CupListCardDetails from "./CupListCardDetails.jsx";
import OverviewCardDetails from "./OverviewCardDetails.jsx";
import AxiosInstance from "../../component/AxiosInstance.jsx";
import { FlatList, ScrollView } from "react-native";
// import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const HomeScreen = () => {
	const [cupListTotal, setCupListTotal] = useState({
		total_cups: 0,
		total_amount: 0,
	});
	const [cupList, setCupList] = useState([]);
	const [vendorsChartData, setVendorsChartData] = useState([]);
	const modalRef = useRef(null);
	const screenWidth = Dimensions.get("window").width;

	const openModal = (cupList) => {
		modalRef.current.open(cupList);
	};

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		await loadCupListTotal(0);
		await loadCupList();
		await loadVendorsChartData();
	};

	const loadCupListTotal = (durationNumber) => {
		let data = { type: durationNumber };
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

	const loadVendorsChartData = () => {
		AxiosInstance({
			method: "get",
			url: "home/chart-data",
		})
			.then((response) => {
				console.log(response.data.data);
				let chartData = [];
				// odd => red 
				// even => green
				response.data.data.map((d, index) => {
					if (index % 2 == 0) {
						chartData.push({ label: d.label, value: d.value, spacing: 6, frontColor: 'red', gradientColor: '#fb8e8e' });
					} else {
						chartData.push({ value: d.value, frontColor: 'green', gradientColor: '#7ffcad' });
					}
				});
				setVendorsChartData(chartData);
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
					<View flex-2 >
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
					<View flex-2 >
						<View flex-1 marginB-10 row center paddingL-10 paddingR-10>
							<View flex-1 left>
								<Text text50>Vendors Chart</Text>
							</View>
							{/* <View flex-2 right>
								<Text>
									<Chip label={"Last 7 Days Details"} />
								</Text>
							</View> */}
						</View>
						<View flex-6 >
							<View style={{ backgroundColor: '#ddecf4'}} flex-4>
								<BarChart
									width={400}
									data={vendorsChartData && vendorsChartData}
									barWidth={16}
									// rotateLabel={20}
									initialSpacing={10}
									spacing={30}
									barBorderRadius={4}
									showGradient
									yAxisThickness={0}
									xAxisType={'dashed'}
									// xAxisColor={'lightgray'}
									yAxisTextStyle={{ color: 'black' }}
									// stepValue={1000}
									// maxValue={6000}
									// noOfSections={6}
									// yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}
									labelWidth={40}
									xAxisLabelTextStyle={{ color: 'black', textAlign: 'center' }}
								// showLine
								// lineConfig={{
								// 	color: '#F29C6E',
								// 	thickness: 3,
								// 	curved: true,
								// 	hideDataPoints: true,
								// 	shiftY: 20,
								// 	initialSpacing: -30,
								// }}
								/>
								{/* <BarChart
									style={{
										marginVertical: 8,
										borderRadius: 16
									}}
									data={{
										labels: vendorsChartData.label && vendorsChartData.label,
										datasets: [
											{
												data: vendorsChartData.data && vendorsChartData.data,

											},
										],
									}}
									width={screenWidth}
									height={300}
									yAxisLabel="₹"
									chartConfig={{
										backgroundColor: "#B9D9EB",
										backgroundGradientFrom: "#B9D9EB",
										backgroundGradientTo: "#B9D9EB",
										decimalPlaces: 2, // optional, defaults to 2dp
										color: (opacity = 1) => `rgba(19,10,10, ${opacity})`,
										// color: vendorsChartData.status && vendorsChartData.status,
										labelColor: (opacity = 1) => `black`,
										style: {
											borderRadius: 16
										},
										propsForDots: {
											r: "6",
											strokeWidth: "2",
											stroke: "black"
										},
										// fillShadowGradient: '#FF493B',
										// fillShadowGradientOpacity: 1,
									}}
									verticalLabelRotation={30}
								/> */}
							</View>
							{/* <View flex></View> */}
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