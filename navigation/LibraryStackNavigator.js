import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LibraryScreen from "../components/LibraryScreen";
import { StackScreen } from "react-native-screens";
const Stack = createNativeStackNavigator();

export default function LibraryStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#2e2e2e' },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen
                name="LibraryMain"
                component={LibraryScreen}
                options={{ title: "Library" }}
            />
        </Stack.Navigator>
    );
}