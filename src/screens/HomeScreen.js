import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Modal, Switch, useColorScheme, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BallIndicator } from 'react-native-indicators';
import localStyles from '../../styles/StyleHomeScreen';
import { launchImagePicker } from '../services/imagePicker';

export default function HomeScreen({ navigation }) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  
  const toggleSwitch = () => setIsDarkMode((prev) => !prev);

  // Estilos condicionais
  const styles = isDarkMode ? darkTheme : lightTheme;

  const user = {
    name: 'João João',
    photo: 'https://th.bing.com/th/id/OIP.dHTpXsUFGaLoDQJWZzPUkgHaHE?w=960&h=917&rs=1&pid=ImgDetMain',
    gifs: [
      'https://i.pinimg.com/originals/95/bc/de/95bcdeda8fd273fd794d4bbbf715f7fe.gif',
      'https://3.bp.blogspot.com/-6XpCCjTmRu0/UmXUTg34KlI/AAAAAAAAADkE/lnQ47XMgcz0/s1600/Gif_animado_para_orkut9xgoi8t1.gif',
      'https://2.bp.blogspot.com/-vQF_6LCIeaA/V5vSWrsvhEI/AAAAAAAAK9g/-4tcqCQBkOgJw6qHMZAmMcXdLS7tNHLGQCLcB/s1600/gifs+animados+2.gif',
      'https://support.discord.com/hc/user_images/IeJrMGtT1V3y96nC9MPfvQ.gif',
    ],
  };

const [gifs, setGifs] = useState([
    { id: '1', uri: 'https://th.bing.com/th/id/R.6dcf3a15e0b17ea5742892e4ae220b4a?rik=O7xK9qmJYBMkDQ&pid=ImgRaw&r=0' },
    { id: '2', uri: 'https://media1.tenor.com/m/qs5pVKHIyTUAAAAd/kakashi-hatake-kakashi.gif' },
    { id: '3', uri: 'https://media1.tenor.com/m/o7ZwUccm6OAAAAAd/x.gif' },
    { id: '4', uri: 'https://media1.tenor.com/m/5el2GMHhUiQAAAAd/elon-musk-x-app.gif' },
    { id: '5', uri: 'https://media1.tenor.com/m/hBwkISiqNI0AAAAd/shura-hiwa-lamer.gif' },
  ]);

  const [selectedGif, setSelectedGif] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGifs, setShowGifs] = useState(true); 

const openModal = (gif) => {
    setSelectedGif(gif);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGif(null);
  };
  

  const handleImagePicker = async (setIsLoading) => {
    console.log("iniciando o handle image picker");
    try {
      const videoUri = await launchImagePicker(true);
      if(!videoUri){
        console.log("Nenhum vídeo carregado...");
        return
      }

      // Verifica se o usuário quer enviar aquele vídeo ou refazer

      const formData = new FormData();
      formData.append('file', {
        uri: videoUri,
        name: 'video.mp4',
        type: 'video.mp4'
      })

      setIsLoading(true);

      console.log("Chamando API");
      
      const response = await axios.post('http://192.168.10.1:8080/api/gif/create-gif', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      // Remover após testes
      console.log(`Resposta da API: ${response.data}`);

    } catch (error) {
      console.error(`Erro ao enviar vídeo: ${error}`)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={[localStyles.container, styles.container]}>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Modo{isDarkMode ? 'Escuro' : 'Claro'}</Text>
        <Switch onValueChange={toggleSwitch} value={isDarkMode} />
      </View>
      <ImageBackground source={{ uri: 'https://img.freepik.com/vetores-premium/fundo-de-bokeh-suave-simples-e-bonito_125452-556.jpg' }} style={localStyles.userBackground}>
        <View style={localStyles.userInfo}>
          <Image source={{ uri: user.photo }} style={localStyles.userPhoto} />
          <Text style={localStyles.userName}>{user.name}</Text>
          <TouchableOpacity
            style={localStyles.logoutButton}
            onPress={() => navigation.navigate('LogoutScreen')}
          >
            <Text style={localStyles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

<Text style={localStyles.sectionTitle}>GIFs Recentes</Text>
      <Switch
        value={showGifs}
        onValueChange={setShowGifs}
        style={localStyles.toggleSwitch}
      />
      {showGifs && (
        <FlatList
          data={user.gifs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal({ uri: item })} style={localStyles.gifContainer}>
              <Image source={{ uri: item }} style={localStyles.gifImage} />
            </TouchableOpacity>
          )}
          horizontal
          contentContainerStyle={localStyles.gifList}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <Text style={localStyles.sectionTitle}>Galeria</Text>
      {isLoading ? (
        <BallIndicator size={30} color="#FF3403" />
      ) : (
        <FlatList
          data={gifs}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={localStyles.gifListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)} style={localStyles.gifContainer}>
              <Image source={{ uri: item.uri }} style={localStyles.gifImage} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={localStyles.emptyText}>Nenhum GIF encontrado</Text>}
        />
      )}

      <TouchableOpacity style={localStyles.cameraButton} onPress={() => handleImagePicker()}>
        <Text style={localStyles.cameraButtonText}>Abrir Câmera</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={localStyles.modalBackground}>
          <View style={localStyles.modalContainer}>
            {selectedGif && (
              <Image source={{ uri: selectedGif.uri }} style={localStyles.modalImageLarge} />
            )}
            <TouchableOpacity style={localStyles.closeButton} onPress={closeModal}>
              <Text style={localStyles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#000000',
  },
  switchContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  text: {
    color: '#ffffff',
  },
  switchContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});


