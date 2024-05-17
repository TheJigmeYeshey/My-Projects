import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Todo from './src/screens/Todo';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Todo" component={Todo}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}