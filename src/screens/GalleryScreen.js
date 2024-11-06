import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BallIndicator } from 'react-native-indicators';
import Styles from '../../styles/StyleGalleryScreen'; 

export function GalleryScreen() {
  const [gifs, setGifs] = useState([
    { id: '1', uri: 'https://th.bing.com/th/id/R.6dcf3a15e0b17ea5742892e4ae220b4a?rik=O7xK9qmJYBMkDQ&pid=ImgRaw&r=0' }, 
    { id: '2', uri: 'https://media1.tenor.com/m/qs5pVKHIyTUAAAAd/kakashi-hatake-kakashi.gif' }, 
    { id: '3', uri: 'https://media1.tenor.com/m/o7ZwUccm6OAAAAAd/x.gif' }, 
    { id: '4', uri: 'https://media1.tenor.com/m/5el2GMHhUiQAAAAd/elon-musk-x-app.gif' }, 
    { id: '5', uri: 'https://media1.tenor.com/m/hBwkISiqNI0AAAAd/shura-hiwa-lamer.gif' }, 
    { id: '6', uri: 'https://media1.tenor.com/m/5hCo-bxm3mUAAAAd/gojo-gojo-annoyed.gif' }, 
    { id: '7', uri: 'https://media1.tenor.com/m/8UntVSgyu6QAAAAd/gojo-satoru-satoru-gojo.gif' }, 
    { id: '8', uri: 'https://media1.tenor.com/m/XUiSuVmjE_oAAAAC/satoru-gojo-high-gojo-high.gif' }, 
    { id: '9', uri: 'https://media1.tenor.com/m/W7G0UqnWAcUAAAAC/gojo-gojo-happy.gif' }, 
  ]);

  const [selectedGif, setSelectedGif] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (gif) => {
    setSelectedGif(gif);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGif(null);
  };

  const launchGallery = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Você precisa permitir o acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setGifs([...gifs, { id: String(gifs.length + 1), uri: result.uri }]);
    }
  };

  const launchCamera = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Você precisa permitir o acesso à câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setGifs([...gifs, { id: String(gifs.length + 1), uri: result.uri }]);
    }
  };

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
        numColumns={3} 
        contentContainerStyle={Styles.gifListContainer}
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
