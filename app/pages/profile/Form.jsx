import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, DateTimePicker, Image, Modal, Picker, Text, TextField, View } from "react-native-ui-lib";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "../../component/AxiosInstance";
import Dividers from "../../component/Divider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const Form = forwardRef(({ loadData }, ref) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: null,
			username: "",
			first_name: "",
			last_name: "",
			email: "",
			mobile_number: "",
		},
	});
	const [image, setImage] = useState({});

	const open = (user) => {
		setValue("id", user.id);
		setValue("username", user.username);
		setValue("first_name", user.first_name);
		setValue("last_name", user.last_name);
		setValue("email", user.email);
		setValue("mobile_number", `${user.mobile_number}`);
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

	function submit(fields) {
		let data = new FormData();

		data.append("id", fields.id);
		data.append("username", fields.username);
		data.append("first_name", fields.first_name);
		data.append("last_name", fields.last_name);
		data.append("email", fields.email);
		data.append("mobile_number", fields.mobile_number);
		image.uri &&
			data.append("profile_image_file", {
				uri: image.uri,
				type: image.mimeType,
				name: image.fileName,
			});

		AxiosInstance({
			method: "post",
			url: `profile/update-profile/${fields.id}`,
			headers: {
				Accept: "application/json",
				"Content-type": "multipart/form-data",
			},
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

		// let data = new FormData();

		// data.append('profile_image_file', {
		//     file: fields.profile_image_file[0],
		//     uri: fields.profile_image_file[0].uri,
		//     type: fields.profile_image_file[0].mimeType,
		//     name: fields.profile_image_file[0].fileName
		// });

		// axios.post(`http://192.168.1.9:8000/api/update-profile1`, data, {
		//     headers: {
		//         "Accept": 'application/json',
		//         "Content-type": "multipart/form-data",
		//     }
		// })
		//     .then((response) => {
		//         console.log(response.data);
		//         loadData();
		//         close();
		//     })
		//     .catch(function (error) {
		//         console.log(error.response.data);
		//     });
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0]);
		}
	};

	return (
		<Modal visible={isModalVisible} onRequestClose={close} animationType="slide">
			<View flex padding-10>
				<View row paddingB-10 center>
					<Text text40BO>Update Profile</Text>
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
										Username
									</Text>
								</View>
								<View flex-5>
									<Controller
										control={control}
										rules={{
											required: "Username field must be required.",
										}}
										name="username"
										render={({ field: { onChange, onBlur, value } }) => (
											<TextField
												fieldStyle={{
													borderWidth: 1,
													borderRadius: 10,
													padding: 10,
												}}
												placeholder={"Enter User Name"}
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
											/>
										)}
									/>
									{errors.username && <Text color="red">{errors.username.message}</Text>}
								</View>
							</View>
							<View gap-7 marginB-10>
								<View flex-2>
									<Text text70BO color="#00A9FF">
										First Name
									</Text>
								</View>
								<View flex-5>
									<Controller
										control={control}
										rules={{
											required: "First Name field must be required.",
											pattern: {
												value: /^[a-zA-Z ]*$/,
												message: "Please enter only letters.",
											},
										}}
										name="first_name"
										render={({ field: { onChange, onBlur, value } }) => (
											<TextField
												fieldStyle={{
													borderWidth: 1,
													borderRadius: 10,
													padding: 10,
												}}
												placeholder={"Enter First Name"}
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
											/>
										)}
									/>
									{errors.first_name && <Text color="red">{errors.first_name.message}</Text>}
								</View>
							</View>
							<View gap-7 marginB-10>
								<View flex-2>
									<Text text70BO color="#00A9FF">
										Last Name
									</Text>
								</View>
								<View flex-5>
									<Controller
										control={control}
										rules={{
											required: "Last Name field must be required.",
											pattern: {
												value: /^[a-zA-Z ]*$/,
												message: "Please enter only letters.",
											},
										}}
										name="last_name"
										render={({ field: { onChange, onBlur, value } }) => (
											<TextField
												fieldStyle={{
													borderWidth: 1,
													borderRadius: 10,
													padding: 10,
												}}
												placeholder={"Enter Last Name"}
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
											/>
										)}
									/>
									{errors.last_name && <Text color="red">{errors.last_name.message}</Text>}
								</View>
							</View>
							<View gap-7 marginB-10>
								<View flex-2>
									<Text text70BO color="#00A9FF">
										Email
									</Text>
								</View>
								<View flex-5>
									<Controller
										control={control}
										rules={{
											required: "Email field must be required.",
											pattern: {
												value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
												message: "Please enter valid email.",
											},
										}}
										name="email"
										render={({ field: { onChange, onBlur, value } }) => (
											<TextField
												fieldStyle={{
													borderWidth: 1,
													borderRadius: 10,
													padding: 10,
												}}
												placeholder={"Enter Email"}
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
											/>
										)}
									/>
									{errors.email && <Text color="red">{errors.email.message}</Text>}
								</View>
							</View>
							<View gap-7 marginB-10>
								<View flex-2>
									<Text text70BO color="#00A9FF">
										Mobile Number
									</Text>
								</View>
								<View flex-5>
									<Controller
										control={control}
										rules={{
											required: "Mobile Number field must be required.",
											pattern: {
												value: /^(0|[1-9]\d*)(\.\d+)?$/,
												message: "Please enter only digits.",
											},
											minLength: {
												value: 10,
												message: "Mobile Number must be 10 digit longer.",
											},
											maxLength: {
												value: 13,
												message: "Mobile Number max length is 13.",
											},
										}}
										name="mobile_number"
										render={({ field: { onChange, onBlur, value } }) => (
											<TextField
												fieldStyle={{
													borderWidth: 1,
													borderRadius: 10,
													padding: 10,
												}}
												placeholder={"Enter Mobile Number"}
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
											/>
										)}
									/>
									{errors.mobile_number && <Text color="red">{errors.mobile_number.message}</Text>}
								</View>
							</View>
							<View gap-7 marginB-10>
								<View flex-2>
									<Text text70BO color="#00A9FF">
										Upload Image
									</Text>
								</View>
								<View flex-5>
									<Button title="Pick an image from camera roll" onPress={pickImage} label={"Choose Image"} />
									{/* <Text>{fields.profile_image_file && fields.profile_image_file.fileName}</Text>
									{fields.profile_image_file && <Image source={{ uri: fields.profile_image_file.uri }} style={styles.thumbnail} />} */}
								</View>
							</View>
							{/* <View flex-5 gap-7 marginB-10>
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
							</View> */}
						</View>
					</ScrollView>
				</GestureHandlerRootView>
				<View right marginB-10 marginR-5>
					<Button backgroundColor="#0d6efd" label={"Submit"} borderRadius={10} onPress={handleSubmit(submit)} />
				</View>
			</View>
		</Modal>
	);
});

export default Form;

const styles = StyleSheet.create({
	thumbnail: {
		width: 300,
		height: 300,
		resizeMode: "contain",
		marginBottom: 50,
	},
});
