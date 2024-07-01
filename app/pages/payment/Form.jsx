import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Button, DateTimePicker, Modal, Picker, Text, TextField, View } from "react-native-ui-lib";
import AxiosBaseUrl from "../../component/AxiosBaseUrl";
import Dividers from '../../component/Divider';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native";

const Form = forwardRef(({ vendors }, ref) => {
    const [isModalVisible, setIsModalVisible] = useState(false);


    const open = () => {
        setIsModalVisible(true);
    }

    const close = () => {
        setIsModalVisible(false);
    }

    useImperativeHandle(ref, () => {
        return {
            open,
            close
        }
    })
    const [fields, setFields] = useState({
        'id': null,
        'vendor_id': 0,
        'payment_at': '',
        'type': null,
        'amount': null,
        'remark': '',
        'created_by': null,
    });


    function handleSubmit() {
        const id = 17;
        AxiosBaseUrl({
            method: "post",
            url: `payment/store-or-update/${id}`,
            data: fields,
        })
            .then((response) => {
                console.log(response.data);
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
                    <View right flex >
                        <Text text70BO onPress={close} color="#0d6efd">Close</Text>
                    </View>
                </View>
                <Dividers />
                <GestureHandlerRootView>
                    <ScrollView>
                        <View flex >
                            <View gap-7 marginB-10>
                                <View flex-2 >
                                    <Text text70BO color="#00A9FF">Vendor</Text>
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
                                            changeVendor(value);
                                        }}>
                                        <Picker.Item value={0} label="Select Vendor" />
                                        {vendors && vendors.map((vendor, index) => <Picker.Item key={index} value={vendor.id} label={vendor.name} />)}
                                    </Picker>
                                </View>
                            </View>
                            <View flex-5 gap-7 marginB-10>
                                <View flex-2 gap-6>
                                    <Text color='#00A9FF' text70BO>Payment At</Text>
                                </View>
                                <View row gap-5>
                                    <View flex>
                                        <DateTimePicker
                                            title={"Select time"}
                                            value={fields.entry_at}
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
                                            value={fields.entry_at}
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
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </GestureHandlerRootView>
            </View>
        </Modal>
    );
});

export default Form