import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import Home from "./Home";
import Categories from "./Categories";
import Products from "./Products";
import Item from "./Item";

const Stack = createStackNavigator();

export default function Navigate() {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>
            <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false}}/>
            <Stack.Screen name="Products" component={Products} options={{ headerShown: false}}/>
            <Stack.Screen name="Item" component={Item} options={{ headerShown: false}}/>
        </Stack.Navigator>
    )
}
