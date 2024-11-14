import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, View, Text, Button, Alert, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { launchImagePicker } from '../src/services/imagePicker';

import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';
import GalleryScreen from '../src/screens/GalleryScreen';
import LogoutScreen from '../src/screens/LogoutScreen';
import PreviewScreen from '../src/screens/PreviewScreen'
import FeedScreen from '../src/screens/FeedScreen';

import { styles as globalStyles } from '../src/globalStyles';

const OptionsScreen = ({ navigation }) => {
  const handleEditOptions = () => {
    Alert.alert('Editar Cadastro', 'Aqui será a tela para editar o cadastro.');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Perfil de Usuário</Text>
      <Button title="Editar Configurações" onPress={handleEditOptions} />
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
        0: { scale: 1.5, rotate: '0deg' }, 
        1: { scale: 1, rotate: '360deg' } 
      });
    } else {
      iconRef.current?.animate({ 
        0: { scale: 1.5, rotate: '360deg' }, 
        1: { scale: 1, rotate: '0deg' } 
      });
    }
  }, [focused]);

  return (
    <Animatable.View ref={iconRef} duration={1000}>
      <Ionicons name={name} size={size} color={color} />
    </Animatable.View>
  );
};



const TabNavigator = () => {

  function handleCamera() {
    const recordedVideo = launchImagePicker(true)

  }

  return (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        position: 'absolute',
        overflow: 'visible',
        backgroundColor: "#F0E8E0",
        height: 50,
      },
      tabBarShowLabel: false,
      // tabBarBackground: () => (
      //   <BlurView tint='light' intensity={100} experimentalBlurMethod='dimezisBlurView'/>
      // )
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="home" color={color} size={size} focused={focused} />
        ),
        tabBarIconStyle: {
          bottom: 0,
          height: 50,
        }

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
      name="Camera"
      component={PreviewScreen}
      options={{
        // tabBarItemStyle: globalStyles.cameraButton,
        // tabBarIconStyle: {
        //   opacity: 0,
        // }
        tabBarButton: () => (
          <Pressable
            style={{
              backgroundColor: "#F0E8E0",
              width: 75,
              height: 75,
              marginTop: -25,
              position: "relative",
              borderRadius: 99,
              borderColor: "#FF3403",
              borderWidth: 5,
              display: "flex",
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={handleCamera}
          >
            <View
              style={{
                backgroundColor: "#FF3403",
                width: 55,
                height: 55,
                borderRadius: 99,
              }}
            ></View>
          </Pressable>
        )
      }}
    />

    <Tab.Screen 
      name="Feeds" 
      component={FeedScreen} 
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name="logo-octocat" color={color} size={size} focused={focused} />
        ),
      }} 
    />
  </Tab.Navigator>
)};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#FF3403"
      />
      <Stack.Navigator initialRouteName="Home">
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
          component={LogoutScreen} 
        />
        <Stack.Screen 
          name="Feed" 
          component={FeedScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
