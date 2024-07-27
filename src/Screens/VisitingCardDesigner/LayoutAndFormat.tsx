import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';

const LayoutAndFormat = ({ onSubmit }) => {
  const [cardDimensions, setCardDimensions] = useState('');
  const [orientation, setOrientation] = useState('');

  const handleSubmit = () => {
    const layout = {
      cardDimensions,
      orientation,
    };
    onSubmit(layout);
  };

  return (
    <View style={styles.container}>
      <Title>Layout and Format</Title>
      <TextInput
        label="Card Dimensions (e.g., 3.5 x 2 inches)"
        value={cardDimensions}
        onChangeText={setCardDimensions}
        style={styles.input}
      />
      <TextInput
        label="Orientation (Portrait or Landscape)"
        value={orientation}
        onChangeText={setOrientation}
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

export default LayoutAndFormat;
