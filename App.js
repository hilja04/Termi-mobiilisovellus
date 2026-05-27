import { SQLiteProvider } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { initializeDatabase } from './database/dbInit';
import TabNavigator from './navigation/TabNavigator';
import { Provider } from 'react-native-paper';

export default function App() {
  return (
    <Provider>
      <SQLiteProvider
        databaseName="termi.db"
        onInit={initializeDatabase}
      >

        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>

      </SQLiteProvider>
      </Provider>
    );
}
