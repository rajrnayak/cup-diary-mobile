import Ionicons from "@expo/vector-icons/Ionicons";
import { Card, Chip, Picker, Text, TextField, View } from "react-native-ui-lib";

const CupListCard = ({ index, cup_list, products, deleteCupListField, changeCupListField }) => {
	let total = cup_list.cups * cup_list.price;
	return (
		<>
			<Card flex gap-10 marginB-10 padding-10 borderWidth={1}>
				<View flex center row>
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
				</View>
			</Card>
		</>
	);
};

export default CupListCard;
