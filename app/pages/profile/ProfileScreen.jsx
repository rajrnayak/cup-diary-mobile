import { Button, Text, View } from "react-native-ui-lib";
import { Ionicons } from '@expo/vector-icons';
import Divider from "../../component/Divider";
import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import AxiosInstance from "../../component/AxiosInstance";
import store from "../../manage-state/auth-state/store";
import { logOut } from "../../manage-state/auth-state/userAuthSlice";
import axios from "axios";

const ProfileScreen = () => {
	const [userData, setUserData] = useState({
		id: null,
		username: '',
		first_name: '',
		last_name: '',
		email: '',
		mobile_number: '',
		role: '',
		joining_date: ''
	});
	const formRef = useRef(null);
	const dispatch = useDispatch();

	function openForm(user) {
		formRef.current.open(user);
	}

	useEffect(() => {
		loadData();
		handleSubmit();
	}, []);

	function handleSubmit() {
		// const fileUri = fields.profile_image_file;

		let data = new FormData();
		let file =("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fcup-diary-mobile-77c0559f-39cd-46e0-a372-9e1c411bb34f/ImagePicker/9fbafdda-4651-4a44-9ff5-e37f57ab7e61.jpeg");

		data.append('profile_image_file',{uri : file.toFile()});
		console.log(data);

		axios.post(`http://192.168.1.9:8000/api/update-profile1`, data, {
			headers: {
				"Accept": 'application/json',
				"Content-type": "multipart/form-data",
			}
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

	function loadData() {
		const { user } = store.getState().authUser;
		AxiosInstance({
			method: "get",
			url: `profile/get-user/${user.id}`,
		})
			.then((response) => {
				// console.log(response.data);
				setUserData(response.data);
			})
			.catch(function (error) {
				console.log(error.response);
			});
	}

	function LogOut() {
		AxiosInstance({
			method: "get",
			url: `/logout`,
		})
			.then((response) => {
				// console.log(response.data);
			})
			.catch(function (error) {
				console.log(error.response);
			});
		dispatch(logOut());
	}
	return (
		<>
			<View flex gap-5 >
				<View flex-3 center margin-10 backgroundColor="white" style={{ borderRadius: 20 }}>

					<View flex center gap-10>
						<View backgroundColor="#4bc2ff21" height={80} width={80} style={{ borderRadius: 40, borderColor: '#5cc0b6', borderWidth: 1.5 }} center>
							<Text text30BO color='#68b6dd'>MS</Text>
						</View>
						<Text text60>{userData.username}</Text>
						<Text text70L>{userData.role.display_name}</Text>
					</View>
				</View>
				<View flex-5 margin-10 backgroundColor="#4bc2ff21" style={{ borderRadius: 20 }}>
					<View flex-2>
						<View flex row margin-5 padding-5>
							<View flex centerV>
								<Text centerH text60BO>User Detail</Text>
							</View>
							<View>
								<Ionicons name='create-outline' color={'blue'} size={30} onPress={() => { openForm(userData) }} />
							</View>
						</View>
						<Divider />
						<View flex row margin-5 padding-5>
							<View >
								<Ionicons name='person-outline' size={30} />
							</View>
							<View paddingL-10>
								<Text centerH text70>{userData.first_name + " " + userData.last_name}</Text>
							</View>
						</View>
						<View flex row margin-5 padding-5>
							<View >
								<Ionicons name='call-outline' size={30} />
							</View>
							<View paddingL-10>
								<Text centerH text70>{userData.mobile_number}</Text>
							</View>
						</View>
						<View flex row margin-5 padding-5>
							<View >
								<Ionicons name='mail-outline' size={30} />
							</View>
							<View paddingL-10>
								<Text centerH text70>{userData.email}</Text>
							</View>
						</View>
						<View flex row margin-5 padding-5>
							<View >
								<Ionicons name='calendar' size={30} />
							</View>
							<View paddingL-10>
								<Text centerH text70>{userData.joining_date}</Text>
							</View>
						</View>
					</View>
					<View flex-0>
					</View>
				</View>
				<View flex-2 center margin-10 backgroundColor="#4bc2ff21" style={{ borderRadius: 20 }}>
					{/* <Text>helloo</Text> */}
					<View flex-0 margin-5 padding-5>
						{/* <Ionicons name='lock-closed-outline' size={30} /> */}
						<Text centerH text70 color='blue'>forgot password</Text>
					</View>
					<View flex-0 margin-5 padding-5>
						{/* <Ionicons name='lock-closed-outline' size={30} /> */}
						<Text centerH text70 color='red' onPress={LogOut}>Log out</Text>
					</View>
				</View>
			</View>
			<Form ref={formRef} loadData={loadData} />
		</>
	);
};

export default ProfileScreen;
