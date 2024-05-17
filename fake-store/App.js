import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Image, Text } from 'react-native';
import Navigate from './src/components/Navigate';
import Cart from './src/components/Cart';
import splashImage from './src/images/splash.webp';
import Store from './src/redux/Store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider, useSelector } from 'react-redux';
import CartIconWithBadge from './src/components/Badge';

const Tabs = createBottomTabNavigator()

export default function App() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashScreen}>
      <Image
        source={splashImage}
        onError={() => alert('Failed to load image.')}
      />
      </View>
    );
  }

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tabs.Navigator initialRouteName='Navigate'>
          <Tabs.Screen 
            name="PRODUCTS" 
            component={Navigate} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen 
            name="SHOPPING CART" 
            component={Cart}
            options={{  
              headerShown: false,            
              tabBarIcon: ({ size, color }) => (
                <CartIconWithBadge size={size} color={color} />
              )
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
