import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Button, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from "expo-image-picker"
import styles from '../../styles/StyleGalleryScreen';
import { BallIndicator } from 'react-native-indicators';
import * as FileSystem from 'expo-file-system';


export function GalleryScreen() {
  const [gifs, setGifs] = useState([
    { uri: 'https://media.giphy.com/media/3o6Mbfal9W7w1WgB9i/giphy.gif' }, // Exemplo de GIF
    { uri: 'https://media.giphy.com/media/1d5E2Wf38BIRLajm/giphy.gif' },
  ]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [video, setVideo] = useState(null);
  const [video64, setVideo64] = useState('')
  const [loading, setLoading] = useState(false);
  
  const pickerOptions = {
    base64: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    videoMaxDurationn: 10,
    quality: 0.1,
  }
  
  const openModal = (gif) => {
    setSelectedGif(gif);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedGif(null);
  };
  
  // const convertVideoToBase64 = async (videoPath) => {
  //   try {
  //     const base64 = await RNFS.readFile(videoPath, 'base64');
  //     setVideo64(base64)
  //     return base64;
  //   } catch (error) {
  //     console.error('Error converting image to base64:', error);
  //     return null;
  //   }
  // };

  const convertVideoToBase64 = async (fileUri) => {
    try {
      const base64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64Data;
    } catch (error) {
      console.error('Error converting Video to base64:', error);
      return null;
    }
  };
  
  const launchGallery = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
    while (permission.granted === false && permission.canAskAgain === true) {
      alert('Por favor, permita o acesso à galeria.')
      permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    }
    
    if (permission.granted === false) {
      alert('Você precisa permitir o acesso à galeria. Por favor abra suas configurações do celular.')
      return
    }
    
    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions)
    
    console.log(result)
    
    console.log(result.assets[0].uri)
    return;
  }

  const launchCamera = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync()

    while (permission.granted === false && permission.canAskAgain === true) {
      alert('Por favor, permita o acesso à câmera.')
      permission = await ImagePicker.requestCameraPermissionsAsync()
    }

    if (permission.granted === false) {
      alert('Você precisa permitir o acesso à câmera. Por favor abra suas configurações do celular.')
      return
    }

    result = await ImagePicker.launchCameraAsync(pickerOptions)
    setVideo(result)
    convertVideoToBase64(result.assets[0].uri)
  }

  useEffect(() => {
    console.log(video)
    console.log(video64)
  }, [video, video64])

  // ImagePicker.requestMediaLibraryPermissionsAsync()
  // ImagePicker.launchImageLibraryAsync()
  // ImagePicker.requestCameraPermissionsAsync()

  return (
    <>
      <View style={{ flex: 1, padding: 10 }}>
        {loading ? (
          <BallIndicator size={30} color='#' />
        ) : (
          <>
            <Button title="Abrir a câmera" onPress={launchCamera} />
            <Button title="Abrir galeria" onPress={launchGallery} />
          </>
        )}
      </View>

      {/* <ScrollView style={{ marginTop: 20 }}>
        {gifs.length > 0 ? (
          gifs.map((gif, index) => (
            <TouchableOpacity key={index} onPress={() => openModal(gif)}>
              <Image
                source={{ uri: gif.uri }}
                style={{ width: 100, height: 100, marginBottom: 10 }}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text>Nenhum GIF encontrado</Text>
        )}
      </ScrollView> */}

      <FlatList
      data={gifs}
      contentContainerStyle={{paddingVertical: 20}}
      // style={}
      horizontal
      showsHorizontalScrollIndicator={false}
      overScrollMode='never'
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => openModal(item)}>
            <Image
              source={{ uri: item.uri }}
              style={{ width: 100, height: 100, marginBottom: 10 }}
            />
          </TouchableOpacity>
      )}
      />
      {/* Modal para exibição do GIF em tela cheia */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedGif && (
              <Image source={{ uri: selectedGif.uri }} style={styles.modalImage} />
            )}
            <Button title="Fechar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </>
  );


















}

export default GalleryScreen;
//Style na pasta Styles (Patrick)


{/* <ScrollView style={{ flex: 1, padding: 10 }}>
      <View>
        {loading ? (
          <BallIndicator size={30} color='#FF3403' />
        ) : (
          <>
            <Button title="Abrir a câmera" onPress={launchCamera} />
            <Button title="Abrir galeria" onPress={launchGallery} />
          </>
        )}
        {loading && <Text>Convertendo vídeo para gif...</Text>}
      </View>

      <FlatList
        data={gifs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <Image
              source={{ uri: item.uri }}
              style={{ width: 100, height: 100, marginBottom: 10 }}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
        ListEmptyComponent={<Text>Nenhum GIF encontrado</Text>}
        style={{ maxHeight: 400 }} // Definindo uma altura máxima para rolagem do FlatList dentro do ScrollView
      /> */}