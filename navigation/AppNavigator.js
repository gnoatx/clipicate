import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../src/screens/HomeScreen';
import GalleryScreen from '../src/screens/GalleryScreen';
//import CameraScreen from '../src/screens/CameraScreen';
import LoginScreen from '../src/screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
      }} 
    />
    <Tab.Screen 
      name="Gallery" 
      component={GalleryScreen} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="image" size={24} color={color} />,
      }} 
    />
    <Tab.Screen 
      name="Camera" 
      component={CameraScreen} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="camera" size={24} color={color} />,
      }} 
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;