// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, Image, Button, Modal } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';
// import Video from 'react-native-video';

// export default function GalleryScreen() {
//   const [gifs, setGifs] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);

//   const convertVideoToGif = async () => {
//     // colocar a logica de conversao  do video para gif
//     const newGif = { uri: 'link-para-o-gif-gerado.gif' };
//     setGifs([...gifs, newGif]);
//   }; 
//   const openModal = (gif) => {
//     setSelectedGif(gif);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedGif(null);
//   };

//   return (
//     <View style={{ flex: 1, padding: 10 }}>
//       <Button title="Converter Vídeo para GIF" onPress={convertVideoToGif} />
//       <ScrollView style={{ marginTop: 20 }}>
//         {gifs.length > 0 ? (
//           gifs.map((gif, index) => (
//             <Image
//               key={index}
//               source={{ uri: gif.uri }}
//               style={{ width: 100, height: 100, marginBottom: 10 }}
//             />
//           ))
//         ) : (
//           <Text>Nenhum GIF encontrado</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// }


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker"
import styles from '../../styles/StyleGalleryScreen';
import { FFmpegKit, FFmpegKitConfig } from 'ffmpeg-kit-react-native';

export function GalleryScreen() {
  const [gifs, setGifs] = useState([
    { uri: 'https://media.giphy.com/media/3o6Mbfal9W7w1WgB9i/giphy.gif' }, // Exemplo de GIF
    { uri: 'https://media.giphy.com/media/1d5E2Wf38BIRLajm/giphy.gif' },
  ]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [video, setVideo] = useState(null)

  const convertVideoToGif = async () => {
    const newGif = { uri: 'https://media.giphy.com/media/2A75RyXVzzSI2bx4Gj/giphy.gif' };
    setGifs([...gifs, newGif]);
  };

  const openModal = (gif) => {
    setSelectedGif(gif);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGif(null);
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

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      base64: true,
    })
    
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

    result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
    })
    setVideo(result)
  }



  useEffect(() => {
    console.log(video)
  }, [video])

  // ImagePicker.requestMediaLibraryPermissionsAsync()
  // ImagePicker.launchImageLibraryAsync()
  // ImagePicker.requestCameraPermissionsAsync()

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Converter Vídeo para GIF" onPress={convertVideoToGif} />
      <Button title="Abrir a câmera" onPress={launchCamera} />
      <Button title="Abrir galeria" onPress={launchGallery} />

      <ScrollView style={{ marginTop: 20 }}>
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
      </ScrollView>
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
    </View>
  );
}

export default GalleryScreen;
//Style na pasta Styles (Patrick)