import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, DateTimePicker, Modal, Picker, Text, TextField, View } from "react-native-ui-lib";
import AxiosInstance from "../../component/AxiosInstance";
import Dividers from "../../component/Divider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native";

const Form = forwardRef(({ vendors, types, loadData }, ref) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	// const {
	// 	control,
	// 	handleSubmit,
	// 	setValue,
	// 	reset,
	// 	formState: { errors },
	// } = useForm({
	// 	defaultValues: {
	// 		id: null,
	// 		vendor_id: 0,
	// 		payment_at: "",
	// 		type: 2,
	// 		amount: "",
	// 		remark: "",
	// 		created_by: 1,
	// 	},
	// });
	// const [fields, setFields] = useState({
	// 	id: null,
	// 	vendor_id: 0,
	// 	payment_at: "",
	// 	type: 2,
	// 	amount: "",
	// 	remark: "",
	// 	created_by: 1,
	// });

	const open = (payment) => {
		if (payment.id) {
			setValue(payment);
		}
		setIsModalVisible(true);
	};

	const close = () => {
		reset();
		setIsModalVisible(false);
	};

	useImperativeHandle(ref, () => {
		return {
			open,
			close,
		};
	});

	function handleSubmit() {
		// const id = 17;
		let url = fields.id ? `store-or-update/${fields.id}` : `store-or-update/`;
		AxiosInstance({
			method: "post",
			url: `payment/${url}`,
			data: fields,
		})
			.then((response) => {
				console.log(response.data);
				loadData();
				close();
			})
			.catch(function (error) {
				console.log(error.response.data);
			});
	}

	return (
		// <View>
		// 			<Controller
		// 				control={control}
		// 				rules={{
		// 					required: 'Email must be Required',
		// 				}}
		// 				render={({ field: { onChange, onBlur, value } }) => (
		// 					<TextField
		// 						value={value}
		// 						onBlur={onBlur}
		// 						onChangeText={(event) => {
		// 							onChange(event), loginError != '' && setLoginError('');
		// 						}}
		// 						placeholder='Email'
		// 						placeholderTextColor='black'
		// 						validationMessage="Email is invalid"
		// 						validate={'email'}
		// 						marginL-40
		// 						marginT-20
		// 						containerStyle={{ borderBottomWidth: 2, width: '80%' }}
		// 						validateOnChange
		// 					/>
		// 				)}
		// 				name="email"
		// 			/>
		// 			{errors.email && <Text color='red' marginL-40 marginT-10>{errors.email.message}</Text>}
		// 		</View>
		<Modal visible={isModalVisible} onRequestClose={close} animationType="slide">
			<View flex padding-10>
				<View row paddingB-10 center>
					<Text text40BO>Create Payment</Text>
					<View right flex>
						<Text text70BO onPress={close} color="#0d6efd">
							Close
						</Text>
					</View>
				</View>
				<Dividers />
				<GestureHandlerRootView>
					<ScrollView>
						<View flex>
							<View gap-7 marginB-10>
								<View flex-2>
									<Text text70BO color="#00A9FF">
										Vendor
									</Text>
								</View>
								<View flex-5>
									<Picker
										key="formVendor"
										useWheelPicker
										fieldStyle={{
											borderWidth: 1,
											borderRadius: 10,
											padding: 10,
										}}
										style={{
											textAlign: "center",
											fontSize: 18,
										}}
										value={fields.vendor_id}
										onChange={(value) => {
											setFields({ ...fields, vendor_id: value });
										}}>
										<Picker.Item value={0} label="Select Vendor" />
										{vendors && vendors.map((vendor, index) => <Picker.Item key={index} value={vendor.id} label={vendor.name} />)}
									</Picker>
								</View>
							</View>
							<View flex-5 gap-7 marginB-10>
								<View flex-2 gap-6>
									<Text color="#00A9FF" text70BO>
										Payment At
									</Text>
								</View>
								<View row gap-5>
									<View flex>
										<DateTimePicker
											title={"Select time"}
											value={fields.payment_at}
											onChange={(date) => setFields({ ...fields, payment_at: date })}
											placeholder={"Enter Date"}
											mode={"date"}
											padding-10
											fieldStyle={{
												borderWidth: 1,
												borderRadius: 10,
											}}
										/>
									</View>
									<View flex>
										<DateTimePicker
											title={"Select time"}
											value={fields.payment_at}
											onChange={(time) => setFields({ ...fields, payment_at: time })}
											placeholder={"Enter Time"}
											mode={"time"}
											padding-10
											fieldStyle={{
												borderWidth: 1,
												borderRadius: 10,
											}}
										/>
									</View>
								</View>
							</View>
							<View flex-5 gap-7 marginB-10>
								<View row flex-2 gap-6>
									<View flex gap-5>
										<Text color="#00A9FF" text70BO>
											Type
										</Text>
									</View>
									<View flex gap-5>
										<Text color="#00A9FF" text70BO>
											Amount
										</Text>
									</View>
								</View>
								<View row gap-5>
									<View flex>
										<Picker
											key="type"
											useWheelPicker
											fieldStyle={{
												borderWidth: 1,
												borderRadius: 10,
												padding: 10,
											}}
											style={{
												textAlign: "center",
												fontSize: 18,
											}}
											value={fields.type}
											onChange={(value) => {
												setFields({ ...fields, type: value });
											}}>
											<Picker.Item value={2} label="Select Type" />
											{types && types.map((type, index) => <Picker.Item key={index} value={type.id} label={type.name} />)}
										</Picker>
									</View>
									<View flex>
										<TextField
											value={`${fields.amount}`}
											placeholder={"Enter Amount"}
											fieldStyle={{
												borderWidth: 1,
												borderRadius: 10,
												padding: 10,
											}}
											onChangeText={(value) => {
												setFields({ ...fields, amount: value });
											}}
										/>
									</View>
								</View>
							</View>
							<View gap-7 marginB-10>
								<View flex-2>
									<Text text70BO color="#00A9FF">
										Remark
									</Text>
								</View>
								<View flex-5>
									<TextField
										value={fields.remark}
										placeholder={"Remark If Any"}
										numberOfLines={3}
										fieldStyle={{
											borderWidth: 1,
											borderRadius: 10,
											padding: 10,
										}}
										onChangeText={(value) => {
											setFields({ ...fields, remark: value });
										}}
									/>
								</View>
							</View>
						</View>
					</ScrollView>
				</GestureHandlerRootView>
				<View right marginB-10 marginR-5>
					<Button backgroundColor="#0d6efd" label={"Submit"} borderRadius={10} onPress={handleSubmit} />
					{/* <Button
						label='Login'
						backgroundColor='#00A9FF'
						onPress={handleSubmit(onSubmit)}
					/> */}
				</View>
			</View>
		</Modal>
	);
});

export default Form;
