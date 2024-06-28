import Ionicons from "@expo/vector-icons/Ionicons";
import { Card, Chip, Picker, Text, TextField, View } from "react-native-ui-lib";

const CupListCard = ({ index, cup_list, products, deleteCupListField, changeCupListField }) => {
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
								label: "10",
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
								key={`productPiker${index}`}
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
								// value={fields.vendor_id}
								// onChange={(value) => {
								// 	changeVendor(value);
							>
								<Picker.Item value={0} label="All" />
								{products && products.map((product, index) => <Picker.Item key={index} value={product.id} label={product.name} />)}
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
									onChangeText={() => {}}
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
									onChangeText={() => {}}
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
