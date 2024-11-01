//import React from 'react';
//import { View, Text, Button } from 'react-native';

//export default function HomeScreen({ navigation }) {
  //return (
    //<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     // <Text>Bem-vindo à Home!</Text>
      //<Button title="Ir para Galeria" onPress={() => navigation.navigate('Gallery')}  />
    //</View>
  //);
//}


import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Clipicate!</Text>
      <Button
        title="Ir para Galeria"
        onPress={() => navigation.navigate('Gallery')}
        color="#FF6F61"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  button: {
    width: 200,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#FF6F61',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});