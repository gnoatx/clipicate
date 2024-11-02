import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import Styles from '../../styles/StyleLoginScreen';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.navigate('Home');
    } else {
      alert('Por favor, insira as credenciais.');
    }
  };

  return (
    <View style={Styles.container}>
      <Image source={require('../../assets/baixados.png')} style={Styles.image} />
      <Text style={Styles.title}>Transforme Momentos em GIFs!</Text>
      <Text style={Styles.title}>Login</Text>
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={Styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={Styles.input}
      />
      <TouchableOpacity style={Styles.button} onPress={handleLogin}>
        <Text style={Styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}