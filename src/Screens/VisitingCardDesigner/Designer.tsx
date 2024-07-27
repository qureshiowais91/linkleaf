import React, { useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import VisualDesignElements from './VisualDesignElements';
import LayoutAndFormat from './LayoutAndFormat';

const VisitingCardDesigner = () => {
  const [designElements, setDesignElements] = useState(null);
  const [layout, setLayout] = useState(null);

  const handleVisualDesignSubmit = (designData) => {
    setDesignElements(designData);
  };

  const handleLayoutSubmit = (layoutData) => {
    setLayout(layoutData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Preveiw</Text>
      <VisualDesignElements onSubmit={handleVisualDesignSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 20,
      },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  previewContainer: {
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
  previewHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  previewCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default VisitingCardDesigner;
