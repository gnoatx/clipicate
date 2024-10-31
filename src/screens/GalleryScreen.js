import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker"
import styles from '../../styles/StyleGalleryScreen';
import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import { BallIndicator } from 'react-native-indicators';

export function GalleryScreen() {
  const [gifs, setGifs] = useState([
    { uri: 'https://media.giphy.com/media/3o6Mbfal9W7w1WgB9i/giphy.gif' }, // Exemplo de GIF
    { uri: 'https://media.giphy.com/media/1d5E2Wf38BIRLajm/giphy.gif' },
  ]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertVideoToGif = async (inputFile) => {
    await FFmpegKitConfig.init()
    //${FileSystem.documentDirectory}
    const outputFile = `${inputFile.replace('.mp4','.gif')}`;
    console.log('caminho; ', inputFile)
    
    try {
      const convert = `-i ${inputFile} -vf "fps=10,scale=320:-1:flags=lanczos" -loop 0 ${outputFile}`;
      setLoading(true);

      FFmpegKit.execute(convert).then(async (session) => {
        const codeReturn = session.getReturnCode()
        setLoading(false);
        if (ReturnCode.isSucess(codeReturn)) {
          console.log('Convertido', outputFile)
        } else {
          console.log('Erro durante a conversão')
        }
        console.log('fail: ',await session.getFailStackTrace())
      },
      () => alert('Conversão falhou')).catch(e => console.log('Erro ao converter: ', e))
    } catch (error) {
      console.log('Erro ao converter: ', error)
    } finally {
      setLoading(false);
    }
    // return (
    //   <View>
    //     {loading && <ActivityIndicator size="large" color="#FF3403" />}
    //   </View>
    // );
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
    convertVideoToGif(result.assets[0].uri)
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
    convertVideoToGif(result.assets[0].uri)
  }



  useEffect(() => {
    console.log(video)
  }, [video])

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
        {loading && <Text>Convertendo vídeo para gif...</Text>}
      </View>

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
    </>
  );
}

export default GalleryScreen;
//Style na pasta Styles (Patrick)