// import React, { useState } from 'react';
// import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Modal, StyleSheet, Switch, useColorScheme } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { BallIndicator } from 'react-native-indicators';
// import localStyles from '../../styles/StyleHomeScreen';
// import { darkTheme, lightTheme } from '../services/lightdark';


// export default function HomeScreen({ navigation }) {
//    const systemColorScheme = useColorScheme();
//   const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

//   const toggleSwitch = () => setIsDarkMode(previousState => !previousState);
//   const styles = isDarkMode ? darkTheme : lightTheme;

//   const user = {
//     name: 'João João',
//     photo: 'https://th.bing.com/th/id/OIP.dHTpXsUFGaLoDQJWZzPUkgHaHE?w=960&h=917&rs=1&pid=ImgDetMain',
//     gifs: [
//       'https://i.pinimg.com/originals/95/bc/de/95bcdeda8fd273fd794d4bbbf715f7fe.gif',
//       'https://3.bp.blogspot.com/-6XpCCjTmRu0/UmXUTg34KlI/AAAAAAAAADkE/lnQ47XMgcz0/s1600/Gif_animado_para_orkut9xgoi8t1.gif',
//       'https://2.bp.blogspot.com/-vQF_6LCIeaA/V5vSWrsvhEI/AAAAAAAAK9g/-4tcqCQBkOgJw6qHMZAmMcXdLS7tNHLGQCLcB/s1600/gifs+animados+2.gif',
//       'https://support.discord.com/hc/user_images/IeJrMGtT1V3y96nC9MPfvQ.gif',
//     ],
//   };

//   const [gifs, setGifs] = useState([
//     { id: '1', uri: 'https://th.bing.com/th/id/R.6dcf3a15e0b17ea5742892e4ae220b4a?rik=O7xK9qmJYBMkDQ&pid=ImgRaw&r=0' },
//     { id: '2', uri: 'https://media1.tenor.com/m/qs5pVKHIyTUAAAAd/kakashi-hatake-kakashi.gif' },
//     { id: '3', uri: 'https://media1.tenor.com/m/o7ZwUccm6OAAAAAd/x.gif' },
//     { id: '4', uri: 'https://media1.tenor.com/m/5el2GMHhUiQAAAAd/elon-musk-x-app.gif' },
//     { id: '5', uri: 'https://media1.tenor.com/m/hBwkISiqNI0AAAAd/shura-hiwa-lamer.gif' },
//   ]);

// const [selectedGif, setSelectedGif] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const openModal = (gif) => {
//     setSelectedGif(gif);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedGif(null);
//   };

//   const launchGallery = async () => {
//     let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       alert('Você precisa permitir o acesso à galeria.');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     });

//     if (!result.cancelled) {
//       setGifs([...gifs, { id: String(gifs.length + 1), uri: result.uri }]);
//     }
//   };
// const launchCamera = async () => {
//     let permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       alert('Você precisa permitir o acesso à câmera.');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     });

//     if (!result.cancelled) {
//       setGifs([...gifs, { id: String(gifs.length + 1), uri: result.uri }]);
//     }
//   };

//   return (
//     <View style={localStyles.container}>
//       <ImageBackground source={{ uri: 'https://img.freepik.com/vetores-premium/fundo-de-bokeh-suave-simples-e-bonito_125452-556.jpg' }} style={localStyles.userBackground}>
//         <View style={localStyles.userInfo}>
//           <Image source={{ uri: user.photo }} style={localStyles.userPhoto} />
//           <Text style={localStyles.userName}>{user.name}</Text>
//           <TouchableOpacity
//            style={localStyles.logoutButton}
//             onPress={() => navigation.navigate('TelaDeLogout')}
//           >
//             <Text style={localStyles.logoutButtonText}>Sair</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>

//       <Text style={localStyles.sectionTitle}>GIFs Recentes</Text>
//       <FlatList
//         data={user.gifs}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={localStyles.gifContainer}>
//             <Image source={{ uri: item }} style={localStyles.gifImage} />
//           </View>
//         )}
//         horizontal
//         contentContainerStyle={localStyles.gifList}
//         showsHorizontalScrollIndicator={false}
//       />
//       <Text style={localStyles.sectionTitle}>Galeria</Text>

    
//         {isLoading ? (
//         <BallIndicator size={30} color="#FF3403" />
//       ) : (
//         <FlatList
//           data={gifs}
//           keyExtractor={(item) => item.id}
//           numColumns={3}
//           contentContainerStyle={localStyles.gifListContainer}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => openModal(item)} style={localStyles.gifContainer}>
//               <Image source={{ uri: item.uri }} style={localStyles.gifImage} />
//             </TouchableOpacity>
//           )}
//           ListEmptyComponent={<Text style={localStyles.emptyText}>Nenhum GIF encontrado</Text>}
//         />
//       )}

//       <Modal visible={modalVisible} transparent={true} animationType="fade">
//         <View style={localStyles.modalBackground}>
//           <View style={localStyles.modalContainer}>
//             {selectedGif && (
//               <Image source={{ uri: selectedGif.uri }} style={localStyles.modalImage} />
//             )}
//             <TouchableOpacity style={localStyles.closeButton} onPress={closeModal}>
//               <Text style={localStyles.closeButtonText}>Fechar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }


import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Modal, StyleSheet, Switch, useColorScheme } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BallIndicator } from 'react-native-indicators';
import localStyles from '../../styles/StyleHomeScreen';

export default function HomeScreen({ navigation }) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  
  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

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

  const launchGallery = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Você precisa permitir o acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
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

    if (!result.canceled) {
      setGifs([...gifs, { id: String(gifs.length + 1), uri: result.uri }]);
    }
  };

  return (
    <View style={localStyles.container}>
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

      <TouchableOpacity style={localStyles.cameraButton} onPress={launchCamera}>
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

toggleSwitch: {
  alignSelf: 'center',
  marginVertical: 10,
},
cameraButton: {
  alignSelf: 'center',
  backgroundColor: '#FF3403',
  padding: 10,
  borderRadius: 5,
  marginVertical: 20,
},
cameraButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
modalImageLarge: {
  width: '90%',
  height: '90%',
  resizeMode: 'contain',
},
