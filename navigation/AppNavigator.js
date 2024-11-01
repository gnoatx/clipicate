import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';
import GalleryScreen from '../src/screens/GalleryScreen';
import LogoutScreen from '../src/screens/LogoutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        tabBarLabel: () => null,
      }} 
    />
    <Tab.Screen 
      name="Gallery" 
      component={GalleryScreen} 
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="image" size={size} color={color} />,
      }} 
    />
    <Tab.Screen 
      name="Logout" 
      component={LogoutScreen} 
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="log-out" size={size} color={color} />,
      }} 
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <StatusBar 
            barStyle="light-content"
            backgroundColor="#6200EE"
        />
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;