import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput, Share, ImageBackground } from 'react-native';
import localStyles from '../../styles/StyleFeedScreen';

export default function FeedScreen({ navigation }) {
    
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
    
      return (
        <View style={localStyles.container}>    
          <FlatList
            data={images}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={localStyles.feedItem}>
                <Image source={{ uri: item.uri }} style={localStyles.feedImage} />
                <Text style={localStyles.caption}>{item.caption}</Text>
                <View style={localStyles.actions}>
                  <TouchableOpacity onPress={() => handleLike(item.id)}>
                    <Text style={localStyles.likeButton}>Curtir ({item.likes})</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleShare(item.uri)}>
                    <Text style={localStyles.shareButton}>Compartilhar</Text>
                  </TouchableOpacity>
                </View>
    
                <FlatList
                  data={item.comments}
                  keyExtractor={(comment, index) => index.toString()}
                  renderItem={({ item }) => <Text style={localStyles.commentText}>- {item}</Text>}
                />
                <View style={localStyles.commentContainer}>
                  <TextInput
                    style={localStyles.commentInput}
                    placeholder="Escreva um comentário..."
                    value={newComment}
                    onChangeText={setNewComment}
                    onSubmitEditing={() => handleComment(item.id)}
                  />
                  <TouchableOpacity onPress={() => handleComment(item.id)}>
                    <Text style={localStyles.commentButtonText}>Comentar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={localStyles.feedList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }