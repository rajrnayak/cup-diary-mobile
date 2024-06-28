import Ionicons from "@expo/vector-icons/Ionicons";
import { Card, Picker, Text, TextField, View } from "react-native-ui-lib";

const CupListCard = () => {
	return (
		<>
			<Card flex row gap-20 marginB-10 padding-10 borderWidth={1}>
				<View flex-4 row gap-10>
					<View flex gap-10>
						<View flex row center>
							<View flex>
								<Text>Product</Text>
							</View>
							<View flex-2>
								<Picker
									fieldStyle={{
										borderWidth: 1,
										borderRadius: 10,
										padding: 5,
									}}
									style={{
										textAlign: "center",
										fontSize: 15,
									}}
									value={null}
									placeholder={"Products"}
									onChange={null}>
									<Picker.Item value={0} label="All" />
								</Picker>
							</View>
						</View>
						<View flex row center>
							<View flex>
								<Text>Price</Text>
							</View>
							<View flex-2>
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
									// enableErrors
									// validate={["required", "email", (value) => value.length > 6]}
									// validationMessage={["Field is required", "Email is invalid", "Password is too short"]}
								/>
							</View>
						</View>
						<View flex row center>
							<View flex>
								<Text>Cups</Text>
							</View>
							<View flex-2>
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
									// enableErrors
									// validate={["required", "email", (value) => value.length > 6]}
									// validationMessage={["Field is required", "Email is invalid", "Password is too short"]}
								/>
							</View>
						</View>
					</View>
				</View>
				<View flex gap-10>
					<Text flex>Total : 10</Text>
					<View center borderColor="red" borderWidth={1} borderRadius={10} padding-10>
						<Ionicons name="trash-outline" size={20} color="red" />
					</View>
				</View>
			</Card>
		</>
	);
};

export default CupListCard;
