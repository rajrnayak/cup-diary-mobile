import Ionicons from "@expo/vector-icons/Ionicons";
import { Card, Chip, Text, View } from "react-native-ui-lib";

const CupListCard = ({ index, cup_list, changeCupListField }) => {
	let total = cup_list != undefined && cup_list.price != "" && cup_list.cups * cup_list.price;
	return (
		cup_list != undefined &&
		cup_list.price != "" && (
			<>
				<Card flex gap-10 marginB-5 marginT-5 margin-10 padding-10 borderWidth={1}>
					<View flex row style={{ justifyContent: "space-between" }}>
						<View marginL-5>
							<Text text60BO>{cup_list.name}</Text>
						</View>
						<View marginR-5>
							<Text text70BO>₹{cup_list.price}</Text>
						</View>
					</View>
					<View flex row style={{ justifyContent: "space-between" }} center>
						<View row>
							<View padding-5 paddingL-15 paddingR-15 style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} borderColor="#ff4f4f" borderWidth={1} onTouchEnd={() => changeCupListField(index, cup_list.cups - 1)}>
								<Text color="#ff4f4f">-</Text>
							</View>
							<View padding-5 paddingL-15 paddingR-15 backgroundColor="#ff4f4f">
								<Text color="white" text70BO>
									{cup_list.cups}
								</Text>
							</View>
							<View padding-5 paddingL-15 paddingR-15 borderColor="#ff4f4f" style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }} borderWidth={1} onTouchEnd={() => changeCupListField(index, cup_list.cups + 1)}>
								<Text color="#ff4f4f">+</Text>
							</View>
						</View>
						<View>
							<Chip
								label={"Total Price"}
								padding-5
								labelStyle={{ fontSize: 15 }}
								badgeProps={{
									label: `${total != "" ? total : 0}`,
									labelStyle: {
										padding: 3,
										fontSize: 15,
									},
									backgroundColor: "#ff4f4f",
								}}
							/>
						</View>
					</View>
				</Card>
			</>
		)
	);
};

export default CupListCard;

{
	/* <View flex center row>
					<View flex left>
						<Chip
							label={"Total Price"}
							padding-5
							onPress={() => console.log("pressed")}
							labelStyle={{ fontSize: 15 }}
							badgeProps={{
								label: `${total != "" ? total : 0}`,
								labelStyle: {
									padding: 3,
									fontSize: 15,
								},
								backgroundColor: "#00A9FF",
							}}
						/>
					</View>
					<View
						center
						borderColor="red"
						borderWidth={1}
						borderRadius={10}
						padding-10
						onTouchEnd={() => {
							deleteCupListField(index);
						}}>
						<Ionicons name="trash-outline" size={20} color="red" />
					</View>
				</View>
				<View flex gap-10>
					<View flex row center>
						<View flex>
							<Picker
								key={"productPiker" + index + products.length}
								useWheelPicker
								fieldStyle={{
									borderWidth: 1,
									borderRadius: 10,
									padding: 5,
								}}
								style={{
									textAlign: "center",
									fontSize: 15,
								}}
								placeholder={"Products"}
								value={cup_list.product_id}
								onChange={(value) => changeCupListField(index, "product_id", value)}>
								<Picker.Item key={index} value={0} label="Select Product." />
								{products.map((product, key) => (
									<Picker.Item key={key} value={product.id} label={product.name} />
								))}
							</Picker>
						</View>
					</View>
					<View row gap-10>
						<View flex row center>
							<View flex>
								<TextField
									style={{
										textAlign: "center",
									}}
									containerStyle={{
										borderWidth: 1,
										borderRadius: 10,
										height: 40,
										alignItems: "center",
										justifyContent: "center",
									}}
									placeholder={"price"}
									value={`${cup_list.price}`}
									onChangeText={(price) => changeCupListField(index, "price", price)}
								/>
							</View>
						</View>
						<View flex row center>
							<View flex>
								<TextField
									style={{
										textAlign: "center",
									}}
									containerStyle={{
										borderWidth: 1,
										borderRadius: 10,
										height: 40,
										alignItems: "center",
										justifyContent: "center",
									}}
									placeholder={"Cups"}
									value={`${cup_list.cups}`}
									onChangeText={(cups) => changeCupListField(index, "cups", cups)}
								/>
							</View>
						</View>
					</View>
				</View> */
}
