import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import SettingsScreen from '../components/SettingsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeStackNavigator from './StackNavigator';

//Tab navigator (Home & Settings)
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Settings') {
                        iconName = 'settings';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: '#505050',

                },
                headerStyle: { backgroundColor: '#505050' },
                headerTintColor: '#fff',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackNavigator}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen} />
        </Tab.Navigator>

    );
}
