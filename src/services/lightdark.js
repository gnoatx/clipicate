import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, useColorScheme } from "react-native";

const lightdark= () => {
  const systemColorScheme = useColorScheme(); // Detecção automática de tema do sistema
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  const styles = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modo{isDarkMode ? " Escuro" : " Claro"}</Text>
      <Switch onValueChange={toggleSwitch} value={isDarkMode} />
    </View>
  );
};

const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  text: {
    color: "#000000",
  },
});

const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
  text: {
    color: "#ffffff",
  },
});