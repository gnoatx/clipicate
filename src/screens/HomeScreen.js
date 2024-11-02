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


//import React from 'react';
//import { View, Text, Button, StyleSheet } from 'react-native';
//import styles from '../../styles/StyleHomeScreen';

//export default function HomeScreen({ navigation }) {
  //return (
    //<View style={styles.container}>
      //<Text style={styles.title}> Clipicate!</Text>
      //<Button
      //  title="Ir para Galeria"
       // onPress={() => navigation.navigate('Gallery')}
       // color="#FF6F61"
      ///>
   // </View>
  //);
//}

import React from 'react';
import { View, Text, Image, FlatList, Button, StyleSheet } from 'react-native';
import styles from '../../styles/StyleHomeScreen';

export default function HomeScreen({ navigation }) {
  // Dados fictícios do usuário
  const user = {
    name: 'Nome do Usuário',
    photo: 'https://exemplo.com/foto.jpg', // URL da foto do usuário
    gifs: [
      'https://exemplo.com/gif1.gif',
      'https://exemplo.com/gif2.gif',
      'https://exemplo.com/gif3.gif',
    ],
  };

  return (
    <View style={styles.container}>
      {/* Seção de Informações do Usuário */}
      <View style={localStyles.userInfo}>
        <Image source={{ uri: user.photo }} style={localStyles.userPhoto} />
        <Text style={localStyles.userName}>{user.name}</Text>
      </View>

      {/* Lista de GIFs recém-criados */}
      <FlatList
        data={user.gifs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={localStyles.gifImage} />
        )}
        horizontal
        contentContainerStyle={localStyles.gifList}
      />

      {/* Botão para navegação à Galeria */}
      <Button
        title="Ir para Galeria"
        onPress={() => navigation.navigate('Gallery')}
        color="#FF6F61"
      />
    </View>
  );
}

// Estilos locais da UserScreen na Home
const localStyles = StyleSheet.create({
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  gifList: {
    paddingHorizontal: 10,
  },
  gifImage: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
