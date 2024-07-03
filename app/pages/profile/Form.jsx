import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, DateTimePicker, Modal, Picker, Text, TextField, View } from "react-native-ui-lib";
import AxiosInstance from "../../component/AxiosInstance";
import Dividers from "../../component/Divider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native";

const Form = forwardRef(({ loadData }, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fields, setFields] = useState({
        id: null,
        userName: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
    });

    const open = (user) => {
        setFields(user);
        setIsModalVisible(true);
    };

    const close = () => {
        setFields({
            id: null,
            userName: '',
            first_name: '',
            last_name: '',
            email: '',
            mobile_number: '',
        })
        setIsModalVisible(false);
    };

    useImperativeHandle(ref, () => {
        return {
            open,
            close,
        };
    });

    function handleSubmit() {
        AxiosInstance({
            method: "post",
            url: `profile/store-or-update/${fields.id}`,
            data: fields,
        })
            .then((response) => {
                console.log(response.data);
                loadData();
                close();
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

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
                                        User Name
                                    </Text>
                                </View>
                                <View flex-5>
                                    <TextField
                                        value={`${fields.username}`}
                                        placeholder={"Enter User Name"}
                                        fieldStyle={{
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            padding: 10,
                                        }}
                                        onChangeText={(value) => {
                                            setFields({ ...fields, username: value });
                                        }}
                                    />
                                </View>
                            </View>
                            <View gap-7 marginB-10>
                                <View flex-2>
                                    <Text text70BO color="#00A9FF">
                                        First Name
                                    </Text>
                                </View>
                                <View flex-5>
                                    <TextField
                                        value={`${fields.first_name}`}
                                        placeholder={"Enter First Name"}
                                        fieldStyle={{
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            padding: 10,
                                        }}
                                        onChangeText={(value) => {
                                            setFields({ ...fields, first_name: value });
                                        }}
                                    />
                                </View>
                            </View>
                            <View gap-7 marginB-10>
                                <View flex-2>
                                    <Text text70BO color="#00A9FF">
                                        Last Name
                                    </Text>
                                </View>
                                <View flex-5>
                                    <TextField
                                        value={`${fields.last_name}`}
                                        placeholder={"Enter Last Name"}
                                        fieldStyle={{
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            padding: 10,
                                        }}
                                        onChangeText={(value) => {
                                            setFields({ ...fields, last_name: value });
                                        }}
                                    />
                                </View>
                            </View>
                            <View gap-7 marginB-10>
                                <View flex-2>
                                    <Text text70BO color="#00A9FF">
                                        Email
                                    </Text>
                                </View>
                                <View flex-5>
                                    <TextField
                                        value={`${fields.email}`}
                                        placeholder={"Enter Email"}
                                        fieldStyle={{
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            padding: 10,
                                        }}
                                        onChangeText={(value) => {
                                            setFields({ ...fields, email: value });
                                        }}
                                    />
                                </View>
                            </View>
                            <View gap-7 marginB-10>
                                <View flex-2>
                                    <Text text70BO color="#00A9FF">
                                        Mobile Number
                                    </Text>
                                </View>
                                <View flex-5>
                                    <TextField
                                        value={`${fields.mobile_number}`}
                                        placeholder={"Enter Email"}
                                        fieldStyle={{
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            padding: 10,
                                        }}
                                        onChangeText={(value) => {
                                            setFields({ ...fields, mobile_number: value });
                                        }}
                                    />
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
                    <Button backgroundColor="#0d6efd" label={"Submit"} borderRadius={10} onPress={handleSubmit} />
                </View>
            </View>
        </Modal>
    );
});

export default Form;
