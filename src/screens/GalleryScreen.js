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


import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker"

export default function GalleryScreen() {
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
  
  const launchCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync()
    if(permission.granted === false){
      alert('Voce precisa de permissao')
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos

    })
    setVideo(result)
    console.log(video)
  }
  
  
  // ImagePicker.requestMediaLibraryPermissionsAsync()
  // ImagePicker.launchImageLibraryAsync()
  // ImagePicker.requestCameraPermissionsAsync()

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Converter Vídeo para GIF" onPress={convertVideoToGif} />
      <Button title="Abrir a câmera" onPress={launchCamera}/>

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

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});
