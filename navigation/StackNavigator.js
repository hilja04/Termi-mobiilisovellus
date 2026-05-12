import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DeckScreen from "../screens/DeckScreen";

const Stack = createNativeStackNavigator();
export default function HomeStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#505050' },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen name="DecksList" component={HomeScreen} options={{ title: 'Decks' }} />
            <Stack.Screen
                name="DeckDetails"
                component={DeckScreen}
                options={({ route }) => ({ title: route.params.deck.title })}
            />
        </Stack.Navigator>
    );

}