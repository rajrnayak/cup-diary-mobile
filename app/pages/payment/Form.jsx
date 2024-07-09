import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, DateTimePicker, Modal, Picker, Text, TextField, View } from "react-native-ui-lib";
import { useForm, Controller } from "react-hook-form";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native";
import AxiosInstance from "../../component/AxiosInstance";
import Dividers from "../../component/Divider";

const Form = forwardRef(({ vendors, types, loadData }, ref) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: null,
			vendor_id: "",
			payment_at: "",
			type: "",
			amount: "",
			remark: "",
			created_by: "1",
		},
	});

	const open = (payment) => {
		if (payment) {
			setValue("id", payment.id);
			setValue("vendor_id", payment.vendor_id);
			setValue("payment_at", payment.payment_at);
			setValue("type", payment.type);
			setValue("amount", `${payment.amount}`);
			setValue("remark", payment.remark);
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

	function submit(data) {
		let url = data.id ? `store-or-update/${data.id}` : `store-or-update/`;
		AxiosInstance({
			method: "post",
			url: `payment/${url}`,
			data: data,
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
									<Controller
										control={control}
										rules={{
											required: "Vendor field must be required.",
										}}
										name="vendor_id"
										render={({ field: { onChange, onBlur, value } }) => (
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
												onBlur={onBlur}
												onChange={onChange}
												value={value}
												placeholder="Select Vendor">
												{vendors && vendors.map((vendor, index) => <Picker.Item key={index} value={vendor.id} label={vendor.name} />)}
											</Picker>
										)}
									/>
									{errors.vendor_id && <Text color="red">{errors.vendor_id.message}</Text>}
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
										<Controller
											control={control}
											rules={{
												required: "Payment date field must be required.",
											}}
											name="payment_at"
											render={({ field: { onChange, onBlur, value } }) => (
												<DateTimePicker
													title={"Select time"}
													onChange={onChange}
													value={value}
													placeholder={"Enter Date"}
													mode={"date"}
													padding-10
													fieldStyle={{
														borderWidth: 1,
														borderRadius: 10,
													}}
												/>
											)}
										/>
									</View>
									<View flex>
										<Controller
											control={control}
											rules={{
												required: "Payment date field must be required.",
											}}
											name="payment_at"
											render={({ field: { onChange, onBlur, value } }) => (
												<DateTimePicker
													title={"Select time"}
													onChange={onChange}
													value={value}
													placeholder={"Enter Time"}
													mode={"time"}
													padding-10
													fieldStyle={{
														borderWidth: 1,
														borderRadius: 10,
													}}
												/>
											)}
										/>
									</View>
								</View>
								{errors.payment_at && <Text color="red">{errors.payment_at.message}</Text>}
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
										<Controller
											control={control}
											rules={{
												required: "type field must be required.",
											}}
											name="type"
											render={({ field: { onChange, onBlur, value } }) => (
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
													onBlur={onBlur}
													onChange={onChange}
													value={value}
													placeholder="Select Type">
													{types && types.map((type, index) => <Picker.Item key={index} value={type.id} label={type.name} />)}
												</Picker>
											)}
										/>
										{errors.type && <Text color="red">{errors.type.message}</Text>}
									</View>
									<View flex>
										<Controller
											control={control}
											rules={{
												required: "Amount field must be required.",
											}}
											name="amount"
											render={({ field: { onChange, onBlur, value } }) => (
												<TextField
													fieldStyle={{
														borderWidth: 1,
														borderRadius: 10,
														padding: 10,
													}}
													placeholder="Enter Amount"
													onBlur={onBlur}
													onChangeText={onChange}
													value={value}
												/>
											)}
										/>
										{errors.amount && <Text color="red">{errors.amount.message}</Text>}
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
									<Controller
										control={control}
										name="remark"
										render={({ field: { onChange, onBlur, value } }) => (
											<TextField
												numberOfLines={3}
												fieldStyle={{
													borderWidth: 1,
													borderRadius: 10,
													padding: 10,
												}}
												placeholder="Remark If Any"
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
											/>
										)}
									/>
									{errors.remark && <Text color="red">{errors.remark.message}</Text>}
								</View>
							</View>
						</View>
					</ScrollView>
				</GestureHandlerRootView>
				<View right marginB-10 marginR-5>
					<Button backgroundColor="#0d6efd" label={"Submit"} borderRadius={10} onPress={handleSubmit(submit)} />
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
