import React, { useEffect } from 'react';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.replace('Login'); 
  }, [navigation]);

  return null;
};

export default LogoutScreen;