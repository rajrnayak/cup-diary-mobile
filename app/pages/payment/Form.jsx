import { useState } from "react";
import { Button, View } from "react-native-ui-lib";
import AxiosBaseUrl from "../../component/AxiosBaseUrl";

export default function Form() {
    const [fields, setFields] = useState({
        // 'id': 17,
        'vendor_id': 3,
        'payment_at': '2024-06-28T08:48:00.000Z',
        'type': 1,
        'amount': 200,
        'remark': 'raj',
        'created_by': 2,
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
        <View>
            <Button
                title="submit"
                onPress={handleSubmit}
            />
        </View>

    );
}