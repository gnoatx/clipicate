import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import Styles from '../../styles/StyleLoginScreen';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/api/login', {
        username,
        password,
      });

      if (response.data.success) {
        Alert.alert('Login bem-sucedido!', 'Bem-vindo!');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
      console.error(error);
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