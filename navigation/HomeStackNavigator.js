import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import DeckScreen from "../components/DeckScreen";
import { StackScreen } from "react-native-screens";
import FlashCardScreen from "../components/FlashcardScreen";
import MultipleScreen from "../components/MultipleScreen";
import WritingScreen from "../components/WritingScreen";
import LibraryScreen from "../components/LibraryScreen";
const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#2e2e2e" },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{ title: 'Decks' }}
            />
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
            <Stack.Screen
                name="MultipleChoice"
                component={MultipleScreen}
                options={{title:"Multiple-Choice"}}
            />
            <Stack.Screen
                name="WritingScreen"
                component={WritingScreen}
                options={{title:"Written exam"}}
            />
        </Stack.Navigator>
    );

}