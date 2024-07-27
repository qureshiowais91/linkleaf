import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{updateUserEmail}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default HomeScreen;
