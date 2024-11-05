import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BallIndicator } from 'react-native-indicators';
import * as FileSystem from 'expo-file-system';
import Styles from '../../styles/StyleGalleryScreen'; 

export function GalleryScreen() {
  const [gifs, setGifs] = useState([
    { id: '1', uri: 'https://media.giphy.com/media/3o6Mbfal9W7w1WgB9i/giphy.gif' },
    { id: '2', uri: 'https://media.giphy.com/media/1d5E2Wf38BIRLajm/giphy.gif' },
    {  id: '3', uri: 'https://media.giphy.com/media/1d5E2Wf38BIRLajm/giphy.gif' },
    {  id: '4', uri: 'https://media.giphy.com/media/1d5E2Wf38BIRLajm/giphy.gif' },
  ]);

  const [selectedGif, setSelectedGif] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [video, setVideo] = useState(null);
  const [video64, setVideo64] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const pickerOptions = {
    base64: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    videoMaxDurationn: 10,
    quality: 0.1,
    allowEditing: true,
  };
  
  const openModal = (gif) => {
    setSelectedGif(gif);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedGif(null);
  };
    
  const convertVideoToBase64 = async (fileUri = '') => {
    setIsLoading(true);
    try {
      const base64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setVideo64(base64Data);
      setIsLoading(false);
      return base64Data;
    } catch (error) {
      console.error('Error converting Video to base64:', error);
      setIsLoading(false);
      return null;
    }
  };
  
  const launchGallery = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Você precisa permitir o acesso à galeria.');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);
    setVideo(result);

    if (result.assets && !result.canceled) {
      convertVideoToBase64(result.assets[0].uri);
    }
  };

  const launchCamera = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Você precisa permitir o acesso à câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync(pickerOptions);
    setVideo(result);

    if (result.assets && !result.canceled) {
      convertVideoToBase64(result.assets[0].uri);
    }
  };

  useEffect(() => {
    console.log(video);
    console.log(video64);
  }, [video, video64]);
  
  return (
    <View style={Styles.container}>
      {isLoading ? (
        <BallIndicator size={30} color="#FF3403" />
      ) : (
        <View style={Styles.buttonContainer}>
          <TouchableOpacity style={Styles.customButton} onPress={launchCamera}>
            <Text style={Styles.buttonText}>Abrir a câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.customButton} onPress={launchGallery}>
            <Text style={Styles.buttonText}>Abrir galeria</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={gifs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={Styles.gifListContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)} style={Styles.gifContainer}>
            <Image source={{ uri: item.uri }} style={Styles.gifImage} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={Styles.emptyText}>Nenhum GIF encontrado</Text>}
      />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={Styles.modalBackground}>
          <View style={Styles.modalContainer}>
            {selectedGif && (
              <Image source={{ uri: selectedGif.uri }} style={Styles.modalImage} />
            )}
            <TouchableOpacity style={Styles.closeButton} onPress={closeModal}>
              <Text style={Styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default GalleryScreen;
