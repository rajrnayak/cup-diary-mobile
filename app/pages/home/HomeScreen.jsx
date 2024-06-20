import { Text, View } from "react-native-ui-lib";

const HomeScreen = () => {
	return (
		<>
			<View backgroundColor="blue" flex>
				<View backgroundColor="red" flex-1>
					<Text>Row 1</Text>
				</View>
				<View backgroundColor="orange" flex-3>
					<Text>Row 2</Text>
				</View>
				<View backgroundColor="purple" flex-1>
					<Text>Row 3</Text>
				</View>
				<View backgroundColor="green" flex-6>
					<Text>Row 4</Text>
				</View>
			</View>
		</>
	);
};

export default HomeScreen;
