import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, View, Text, Button, Alert, Pressable } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { launchImagePicker } from '../src/services/imagePicker';
import * as FileSystem from 'expo-file-system';
import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';
import GalleryScreen from '../src/screens/GalleryScreen';
import LogoutScreen from '../src/screens/LogoutScreen';
import PreviewScreen from '../src/screens/PreviewScreen'
import FeedScreen from '../src/screens/FeedScreen';

import { styles as globalStyles } from '../src/globalStyles';
import axios from 'axios';

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

  const [isLoading, setIsLoading] = useState(false);

  const handleImagePicker = async (setIsLoading) => {
    console.log("iniciando o handle image picker");
    try {
      const videoUri = await launchImagePicker(true);
      if (!videoUri) {
        console.log("Nenhum vídeo carregado...");
        return
      }
      console.log(videoUri)
      const fileInfo = await FileSystem.getInfoAsync(videoUri)

      
      if (fileInfo.exists) {
        let file = {
          uri: fileInfo.uri,
          name: 'video.mov',
          type: 'video/quicktime'
        };
        // if (fileInfo.uri.endsWith('mov')) {
        //   file.name = 'video.mov'
        //   file.type = 'video/quicktime'
        // }

        const formData = new FormData();
        formData.append('file', file);

        console.log("Chamando API");
        const response = await axios.post('http://192.168.10.4:8080/api/gif/create-gif', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });

        console.log(`Resposta da API: ${response.data}`);
      } else {
        console.log("Arquivo não encontrado");
      }



      // const response = await axios.get('http://10.0.2.2:8080/api/gif/hello')
      // Remover após testes


    } catch (error) {
      console.error(`Erro ao enviar vídeo: ${error}`)
      console.error(error.data)
    } finally {
      setIsLoading(false);
    }
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
              onPress={() => handleImagePicker(setIsLoading)}
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
  )
};

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