import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import DeckScreen from "../components/DeckScreen";
import { StackScreen } from "react-native-screens";
import FlashCardScreen from "../components/FlashcardScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#505050' },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{ title: 'Decks' }} />
            <Stack.Screen
                name="DeckScreen"
                component={DeckScreen}
                options={({ route }) => ({ title: route.params.deck.title })}
            />
            <Stack.Screen
                name="FlashCards"
                component={FlashCardScreen}
                options={{title:"FlashCards"}}
            />
        </Stack.Navigator>
    );

}