import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput, Share, ImageBackground } from 'react-native';
import localStyles from '../../styles/StyleHomeScreen';

export default function HomeScreen({ navigation }) {
  const user = {
    name: 'Jão Jão',
    photo: 'https://th.bing.com/th/id/OIP.dHTpXsUFGaLoDQJWZzPUkgHaHE?w=960&h=917&rs=1&pid=ImgDetMain',
    gifs: [
      'https://i.pinimg.com/originals/95/bc/de/95bcdeda8fd273fd794d4bbbf715f7fe.gif',
      'https://3.bp.blogspot.com/-6XpCCjTmRu0/UmXUTg34KlI/AAAAAAAADkE/lnQ47XMgcz0/s1600/Gif_animado_para_orkut9xgoi8t1.gif',
      'https://2.bp.blogspot.com/-vQF_6LCIeaA/V5vSWrsvhEI/AAAAAAAAK9g/-4tcqCQBkOgJw6qHMZAmMcXdLS7tNHLGQCLcB/s1600/gifs+animados+2.gif',
      'https://support.discord.com/hc/user_images/IeJrMGtT1V3y96nC9MPfvQ.gif',
    ],
  };

  const sharedImages = [
    { id: '1', uri: 'https://aniyuki.com/wp-content/uploads/2021/06/aniyuki-anime-avatars-gif-discord-72.gif', likes: 0, comments: [], caption: 'Xuga Xuga' },
    { id: '2', uri: 'https://support.discord.com/hc/user_images/IeJrMGtT1V3y96nC9MPfvQ.gif', likes: 0, comments: [], caption: 'Caveirinha Malvada' },
    { id: '3', uri: 'https://www.chiquipedia.com/imagenes/gifs-animados-pokemon-picachu-1.gif', likes: 0, comments: [], caption: 'Pikaxu Alegre' },
    { id: '4', uri: 'https://gere720.weebly.com/uploads/1/1/6/9/116940787/ringasm_orig.gif', likes: 0, comments: [], caption: 'Vergoinha' },
  ];

  const backgroundImage = 'https://img.freepik.com/vetores-premium/fundo-de-bokeh-suave-simples-e-bonito_125452-556.jpg';
  const [images, setImages] = useState(sharedImages);
  const [newComment, setNewComment] = useState('');

  const handleLike = (id) => {
    setImages(images.map((image) =>
      image.id === id ? { ...image, likes: image.likes + 1 } : image
    ));
  };

  const handleComment = (id) => {
    if (newComment.trim()) {
      setImages(images.map((image) =>
        image.id === id ? { ...image, comments: [...image.comments, newComment] } : image
      ));
      setNewComment('');
    }
  };

  const handleShare = async (uri) => {
    try {
      await Share.share({
        message: `Confira esta imagem: ${uri}`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
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

  const openModal = (gif) => {
    setSelectedGif(gif);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGif(null);
  };

  return (
    <View style={localStyles.container}>
      <ImageBackground source={{ uri: backgroundImage }} style={localStyles.userBackground}>
        <View style={localStyles.userInfo}>
          <Image source={{ uri: user.photo }} style={localStyles.userPhoto} />
          <Text style={localStyles.userName}>{user.name}</Text>
          <TouchableOpacity
            style={localStyles.logoutButton}
            onPress={() => navigation.navigate('LogoutScreen')}
          >
            <Text style={localStyles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <Text style={localStyles.sectionTitle}>GIFs Recentes</Text>
      <FlatList
        data={user.gifs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={localStyles.gifContainer}>
            <Image source={{ uri: item }} style={localStyles.gifImage} />
          </View>
        )}
        horizontal
        contentContainerStyle={localStyles.gifList}
        showsHorizontalScrollIndicator={false}
      />
      
      

      
      

      

    </View>
  );
}