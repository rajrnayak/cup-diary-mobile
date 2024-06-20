import { Card, Chip, GridList, SegmentedControl, Text, View } from "react-native-ui-lib";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = () => {
	let cups = [
		{ vendorName: "AnkitBha", date: "2 May 2024", tea: 2, coffee: 3 },
		{ vendorName: "AnkitBhi", date: "3 May 2024", tea: 3, coffee: 4 },
		{ vendorName: "AnkitBai", date: "4 May 2024", tea: 4, coffee: 5 },
		{ vendorName: "AnkitBha", date: "2 May 2024", tea: 2, coffee: 3 },
		{ vendorName: "AnkitBhi", date: "3 May 2024", tea: 3, coffee: 4 },
		{ vendorName: "AnkitBai", date: "4 May 2024", tea: 4, coffee: 5 },
		{ vendorName: "AnkitBha", date: "2 May 2024", tea: 2, coffee: 3 },
		{ vendorName: "AnkitBhi", date: "3 May 2024", tea: 3, coffee: 4 },
		{ vendorName: "AnkitBai", date: "4 May 2024", tea: 4, coffee: 5 },
	];

	const CardDetails = ({ icon, text, value, amountIcon }) => {
		return (
			<>
				<View flex center padding-20>
					<View flex-1 row center gap-10>
						<Ionicons name={icon} size={32} color="#5AB2FF" />
						<Text>{text}</Text>
					</View>
					<View flex-1 center>
						<Text text30>{amountIcon ? "₹" + value : value}</Text>
					</View>
				</View>
			</>
		);
	};

	return (
		<>
			<View flex>
				<View flex-1 paddingL-10 paddingR-10>
					<View flex-1 row center>
						<View flex-1 left>
							<Text text50>Overview</Text>
						</View>
						<View flex-2 right>
							<SegmentedControl backgroundColor="white" segmentLabelStyle={{ width: 40, textAlign: "center" }} activeColor="#5AB2FF" segments={[{ label: "Week" }, { label: "Month" }]} />
						</View>
					</View>
					<View flex-2 row gap-10>
						<Card flex backgroundColor="white">
							<CardDetails icon="cafe-outline" text="Total Orders" value="500" />
						</Card>
						<Card flex center backgroundColor="white">
							<CardDetails icon="cash-outline" text="Total Amounts" value="5000" amountIcon />
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
							data={cups}
							numColumns={1}
							itemSpacing={2}
							renderItem={({ item }) => (
								<Card backgroundColor="white" padding-6 paddingL-10 paddingR-10 margin-4>
									<Card.Section
										content={[
											{ text: item.date, style: { position: "absolute", top: 10, right: 10 } },
											{ text: item.vendorName, text50: true },
											{ text: `tea - ${item.tea}`, text70: true },
											{ text: `Coffee - ${item.coffee}`, text70: true },
											{ text: <Ionicons name="chevron-forward-outline" size={20} />, style: { position: "absolute", right: 10, bottom: 10 } },
										]}
									/>
								</Card>
							)}
						/>
					</View>
				</View>
			</View>
		</>
	);
};

export default HomeScreen;
