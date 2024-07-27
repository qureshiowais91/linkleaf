import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Colors } from 'react-native-paper';

const VisualDesignElements = ({ onSubmit }) => {
  const [logo, setLogo] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [fontName, setFontName] = useState('');

  const handleSubmit = () => {
    const designElements = {
      logo,
      colorScheme: {
        primary: primaryColor,
        secondary: secondaryColor,
      },
      typography: {
        fontName,
      },
    };
    onSubmit(designElements);
  };

  return (
    <View style={styles.container}>
      <Title>Visual Design Elements</Title>
      <TextInput
        label="Logo URL"
        value={logo}
        onChangeText={setLogo}
        style={styles.input}
      />
      <TextInput
        label="Primary Color"
        value={primaryColor}
        onChangeText={setPrimaryColor}
        style={styles.input}
      />
      <TextInput
        label="Secondary Color"
        value={secondaryColor}
        onChangeText={setSecondaryColor}
        style={styles.input}
      />
      <TextInput
        label="Font Name"
        value={fontName}
        onChangeText={setFontName}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff0000",
  },
});

export default VisualDesignElements;
