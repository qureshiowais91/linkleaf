import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ConfirmButton from '../Components/Buttons'; // Adjust the path as per your project structure

const TreeSelectionScreen = ({ navigation }) => {
  const [selectedTrees, setSelectedTrees] = useState([]);

  const toggleTree = (tree) => {
    if (selectedTrees.includes(tree)) {
      setSelectedTrees(selectedTrees.filter(item => item !== tree));
    } else {
      setSelectedTrees([...selectedTrees, tree]);
    }
  };

  const trees = [
    { id: 1, title: 'Personal', iconName: 'person' },
    { id: 2, title: 'Professional', iconName: 'work' },
    { id: 3, title: 'Business', iconName: 'business' },
    { id: 4, title: 'Freelancer', iconName: 'attach-money' },
    { id: 5, title: 'Job Seeker', iconName: 'work' },
    { id: 6, title: 'HR', iconName: 'people' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Trees</Text>
      <View style={styles.chipContainer}>
        {trees.map((tree) => (
          <Chip
            key={tree.id}
            mode="outlined"
            selected={selectedTrees.includes(tree.title)}
            onPress={() => toggleTree(tree.title)}
            style={[
              styles.chip,
              selectedTrees.includes(tree.title) && styles.selectedChip,
            ]}
            icon={
              selectedTrees.includes(tree.title) ? (
                <Icon name={tree.iconName} size={24} color="#ffffff" />
              ) : null
            }
            textStyle={
              selectedTrees.includes(tree.title)
                ? { fontSize: 16, color: '#ffffff' }
                : { fontSize: 16, color: '#333333' }
            }
          >
            {tree.title}
          </Chip>
        ))}
      </View>
      <ConfirmButton
        onPress={() => {
          console.log('Selected Trees:', selectedTrees);
          // Navigate to next screen or perform necessary actions
        }}
        style={styles.button}
        title="Continue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333333',
    textAlign: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chip: {
    margin: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#333333',
  },
  selectedChip: {
    backgroundColor: '#6A0DAD',
    borderColor: '#6A0DAD',
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
});

export default TreeSelectionScreen;
