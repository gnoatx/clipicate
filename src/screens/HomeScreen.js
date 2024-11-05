import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput, Share, ImageBackground } from 'react-native';
import localStyles from '../../styles/StyleHomeScreen';

export default function HomeScreen({ navigation }) {
  const user = {
    name: 'Jão Jão',
    photo: 'https://th.bing.com/th/id/OIP.dHTpXsUFGaLoDQJWZzPUkgHaHE?w=960&h=917&rs=1&pid=ImgDetMain',
    gifs: [
      'https://media.giphy.com/media/3o6Mbfal9W7w1WgB9i/giphy.gif',
      'https://3.bp.blogspot.com/-6XpCCjTmRu0/UmXUTg34KlI/AAAAAAAADkE/lnQ47XMgcz0/s1600/Gif_animado_para_orkut9xgoi8t1.gif',
      'https://2.bp.blogspot.com/-vQF_6LCIeaA/V5vSWrsvhEI/AAAAAAAAK9g/-4tcqCQBkOgJw6qHMZAmMcXdLS7tNHLGQCLcB/s1600/gifs+animados+2.gif',
    ],
  };

  const sharedImages = [
    { id: '1', uri: 'https://aniyuki.com/wp-content/uploads/2021/06/aniyuki-anime-avatars-gif-discord-72.gif', likes: 0, comments: [], caption: 'Imagem compartilhada 1' },
    { id: '2', uri: 'https://support.discord.com/hc/user_images/IeJrMGtT1V3y96nC9MPfvQ.gif', likes: 0, comments: [], caption: 'Imagem compartilhada 2' },
    { id: '3', uri: 'https://www.chiquipedia.com/imagenes/gifs-animados-pokemon-picachu-1.gif', likes: 0, comments: [], caption: 'Imagem compartilhada 3' },
    { id: '4', uri: 'https://gere720.weebly.com/uploads/1/1/6/9/116940787/ringasm_orig.gif', likes: 0, comments: [], caption: 'Imagem compartilhada 4' },

  ];

  //mudanças aki
  const backgroundImage = 'https://img.freepik.com/vetores-premium/fundo-de-bokeh-suave-simples-e-bonito_125452-556.jpg' ; //url da imagem

  const [images, setImages] = useState(sharedImages);

  const handleLike = (id) => {
    setImages(images.map((image) => (
      image.id === id ? { ...image, likes: image.likes + 1 } : image
    )));
  };

  const handleComment = (id, text) => {
    setImages(images.map((image) => (
      image.id === id ? { ...image, comments: [...image.comments, text] } : image
    )));
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

  return (
    <View style={localStyles.container}>
      {/* User Info Section */}
      <ImageBackground source={{uri:backgroundImage}} style={localStyles.userBackground}>
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

      {/* User's Recent GIFs */}
      <Text style={localStyles.sectionTitle}>GIFs Recentes</Text>
      <FlatList
        data={user.gifs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={localStyles.gifImage} />
        )}
        horizontal
        contentContainerStyle={localStyles.gifList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Button to navigate to Gallery */}
      <TouchableOpacity
        style={localStyles.galleryButton}
        onPress={() => navigation.navigate('Gallery')}
      >
        <Text style={localStyles.galleryButtonText}>Ir para Galeria</Text>
      </TouchableOpacity>

      {/* Feeds Section for Shared Images */}
      <Text style={localStyles.sectionTitle}>Feeds</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={localStyles.feedItem}>
            <Image source={{ uri: item.uri }} style={localStyles.feedImage} />
            <Text style={localStyles.caption}>{item.caption}</Text>

            {/* Like and Share Buttons */}
            <View style={localStyles.actions}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Text style={localStyles.likeButton}>Curtir ({item.likes})</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare(item.uri)}>
                <Text style={localStyles.shareButton}>Compartilhar</Text>
              </TouchableOpacity>
            </View>

            {/* Comments Section */}
            <FlatList
              data={item.comments}
              keyExtractor={(comment, index) => index.toString()}
              renderItem={({ item }) => <Text style={localStyles.commentText}>- {item}</Text>}
            />
            <TextInput
              style={localStyles.commentInput}
              placeholder="Escreva um comentário..."
              onSubmitEditing={(event) => handleComment(item.id, event.nativeEvent.text)}
            />
          </View>
        )}
        contentContainerStyle={localStyles.feedList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}