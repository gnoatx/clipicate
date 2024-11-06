import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, View, Text, Button, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';
import GalleryScreen from '../src/screens/GalleryScreen';
import LogoutScreen from '../src/screens/LogoutScreen';

const ProfileScreen = ({ navigation }) => {
  const handleEditProfile = () => {
    Alert.alert('Editar Cadastro', 'Aqui será a tela para editar o cadastro.');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil de Usuário</Text>
      <Button title="Editar Cadastro" onPress={handleEditProfile} />
    </View>
  );
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabIcon = ({ name, color, size, focused }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    if (focused) {
      iconRef.current?.animate({ 
        0: { scale: 1.5, rotate: '100deg' }, 
        1: { scale: 1, rotate: '360deg' } 
      });
    } else {
      iconRef.current?.animate({ 
        0: { scale: 1.5, rotate: '360deg' }, 
        1: { scale: 1, rotate: '360deg' } 
      });
    }
  }, [focused]);

  return (
    <Animatable.View ref={iconRef} duration={1000}>
      <Ionicons name={name} size={size} color={color} />
    </Animatable.View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="home" color={color} size={size} focused={focused} />
        ),

      }} 
    />
    <Tab.Screen 
      name="Gallery" 
      component={GalleryScreen} 
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="image" color={color} size={size} focused={focused} />
        ),
      }} 
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="person" color={color} size={size} focused={focused} />
        ),
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
        <Stack.Screen 
          name="LogoutScreen" 
          component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
