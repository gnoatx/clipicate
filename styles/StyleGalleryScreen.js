import { StyleSheet } from 'react-native';

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

export default styles;