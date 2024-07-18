import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ToastAndroid } from "react-native";
import { Button, Text, TextField, View } from "react-native-ui-lib";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../manage-state/auth-state/userAuthSlice";

const LoginScreen = () => {
	const dispatch = useDispatch();
	const [loginError, setLoginError] = useState('');
	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(data) {
		// console.log(data);
		axios({
			method: 'post',
			url: 'http://192.168.1.9:8000/api/login-post',
			data: data
		})
			.then((response) => {
				// console.log(response.data);
				if (response.data.userData) {
					ToastAndroid.showWithGravity(
						response.data.message,
						ToastAndroid.SHORT,
						ToastAndroid.CENTER,
					)
					dispatch(authUser({
						userName: response.data.userData,
						token: response.data.token,
						isLogin: true
					}));
				} else {
					setLoginError(response.data.message);
				}
				reset;
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View marginB-20 centerH>
					<Text text40>LOG IN</Text>
				</View>
				<View>
					<Controller
						control={control}
						rules={{
							required: 'Email must be Required',
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextField
								value={value}
								onBlur={onBlur}
								onChangeText={(event) => {
									onChange(event), loginError != '' && setLoginError('');
								}}
								placeholder='Email'
								placeholderTextColor='black'
								validationMessage="Email is invalid"
								validate={'email'}
								marginL-40
								marginT-20
								containerStyle={{ borderBottomWidth: 2, width: '80%' }}
								validateOnChange
							/>
						)}
						name="email"
					/>
					{errors.email && <Text color='red' marginL-40 marginT-10>{errors.email.message}</Text>}
				</View>
				<View>
					<Controller
						control={control}
						rules={{
							required: 'Password must be Required',
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextField
								value={value}
								onChangeText={(event) => {
									onChange(event), loginError != '' && setLoginError('');
								}}
								onBlur={onBlur}
								placeholder='Password'
								placeholderTextColor='black'
								// style={{borderBottomWidth:2}}
								// floatingPlaceholder
								marginL-40
								marginT-30
								containerStyle={{ borderBottomWidth: 2, width: '80%' }}
							/>
						)}
						name="password"
					/>
					{errors.password && <Text color='red' marginL-40 marginT-10>{errors.password.message}</Text>}
					{loginError && <Text color='red' marginL-40 marginT-10>{loginError}</Text>}
				</View>
				<View margin-40 marginT-30>
					<Button
						label='Login'
						backgroundColor='#00A9FF'
						onPress={handleSubmit(onSubmit)}
					/>
				</View>
			</View>
		</>
	);
};

export default LoginScreen;
