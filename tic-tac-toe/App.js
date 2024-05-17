import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Rules from './src/screens/Rules';
import Credits from './src/screens/Credits';
import Load from './src/screens/Load';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="Credits" component={Credits} />
        <Stack.Screen name="Load" component={Load} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

