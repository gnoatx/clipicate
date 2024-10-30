import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo à Home!</Text>
      <Button title="Ir para Galeria" onPress={() => navigation.navigate('Gallery')}  />
    </View>
  );
}