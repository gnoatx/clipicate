import { StyleSheet } from 'react-native';

const localStyles = StyleSheet.create({
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: '#FF6F61',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    marginBottom: 10,
  },
  gifList: {
    paddingHorizontal: 10,
  },
  gifImage: {
    width: 100,
    height: 100,
    marginHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  galleryButton: {
    marginTop: 20,
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  galleryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  feedItem: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  feedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 5,
  },
  caption: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  likeButton: {
    color: '#FF4500',
  },
  shareButton: {
    color: '#1E90FF',
  },
  commentText: {
    fontSize: 12,
    color: '#555',
  },
  commentInput: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 8,
    fontSize: 14,
  },
  userBackground: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  }
    
});

export default localStyles;