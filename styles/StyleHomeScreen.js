import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 30,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    button: {
      width: 200,
      borderRadius: 10,
      paddingVertical: 10,
      backgroundColor: '#FF6F61',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  export default styles;