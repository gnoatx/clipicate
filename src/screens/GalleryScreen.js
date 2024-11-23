import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

const GifGallery = () => {
  const [gifList, setGifList] = useState([]);

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const response = await axios.get("http://192.168.10.11:8080/api/gif/gifs");
        setGifList(response.data); // Certifique-se de que `response.data` contém uma lista de GIFs em Base64
      } catch (error) {
        console.error("Erro ao buscar GIFs:", error);
      }
    };

    fetchGifs();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Galeria de GIFs</Text>
      {gifList.length > 0 ? (
        gifList.map((gif, index) => {
          let file = gif.file64.map((byte) => String.fromCharCode(byte)).join('')
          return (
          <Image
            key={index}
            source={{ uri: `data:image/gif;base64,${file}` }}
            style={styles.image}
          />)
      })
      ) : (
        <Text style={styles.loadingText}>Carregando GIFs...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
  },
});

export default GifGallery;
