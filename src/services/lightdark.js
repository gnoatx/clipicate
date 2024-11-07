import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, useColorScheme } from 'react-native';

export default function App() {
  // Detecta o tema do sistema (claro ou escuro)
  const systemTheme = useColorScheme();
  // Estado para alternância manual
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

  // Alterna entre claro e escuro manualmente
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Define estilos dependendo do modo
  const themeStyles = isDarkMode ? styles.dark : styles.light;

  return (
    <View style={[styles.container, themeStyles]}>
      <Text style={[styles.text, themeStyles]}>Modo {isDarkMode ? 'Escuro' : 'Claro'}</Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  light: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  dark: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
});