import { StyleSheet } from 'react-native';

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userBackground: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10, 
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#ff5757',
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: '#444',
  },
  gifList: {
    paddingVertical: 10,
  },
  gifContainer: {
    width: 100,  
    height: 400,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',  
  },
  gifImage: {
    width: '100%',     
    height: '20%',
  },
  galleryButton: {

    paddingVertical: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  galleryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default localStyles;