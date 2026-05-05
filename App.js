import { SQLiteProvider } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { initializeDatabase } from './database/init';
import TabNavigator from './navigation/TabNavigator';

export default function App() {
  return (
    <SQLiteProvider
      databaseName="termi.db"
      onInit={initializeDatabase}
    >
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SQLiteProvider>
  );
}
