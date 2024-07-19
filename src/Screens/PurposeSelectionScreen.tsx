import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"; // Adjust based on the icon set you prefer
import ConfirmButton from "../Components/Buttons"; // Adjust the path as per your project structure

const PurposeSelectionScreen = ({ navigation }) => {
  const [selectedPurposes, setSelectedPurposes] = useState([]);

  const togglePurpose = (purpose) => {
    if (selectedPurposes.includes(purpose)) {
      setSelectedPurposes(selectedPurposes.filter((item) => item !== purpose));
    } else {
      setSelectedPurposes([...selectedPurposes, purpose]);
    }
  };

  const purposes = [
    { id: 1, title: "Virtual Visiting Card", icon: "business" },
    { id: 2, title: "Fast Banking Information Sharing", icon: "favorite" },
    { id: 3, title: "Networking", icon: "people" },
    { id: 4, title: "Looking For Job", icon: "work" },
    { id: 5, title: "I am HR", icon: "account-circle" },
    { id: 6, title: "Dating", icon: "account-circle" },
    { id: 7, title: "Casual Friendship", icon: "account-circle" },
    { id: 8, title: "Freelancer ", icon: "account-circle" },
    { id: 9, title: "Others", icon: "account-circle" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Why are you using this app?</Text>
      <View style={styles.chipContainer}>
        {purposes.map((purpose) => (
          <Chip
            key={purpose.id}
            mode="outlined"
            selected={selectedPurposes.includes(purpose.title)}
            onPress={() => togglePurpose(purpose.title)}
            style={[
              styles.chip,
              selectedPurposes.includes(purpose.title) && styles.selectedChip,
            ]}
            icon={
              selectedPurposes.includes(purpose.title) ? (
                <Icon name={purpose.icon} size={24} color="#ffffff" />
              ) : null
            }
            textStyle={
              selectedPurposes.includes(purpose.title)
                ? { fontSize: 16, color: "#ffffff" }
                : { fontSize: 16, color: "#333333" }
            }
          >
            {purpose.title}
          </Chip>
        ))}
      </View>
      <ConfirmButton
        title="Continue"
        onPress={() => {
          console.log("Selected Purposes:", selectedPurposes);
          // Navigate to TreeSelectionScreen
          navigation.navigate("Tree"); // Pass any necessary data
        }}
        style={styles.button}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333333",
    textAlign: "center",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  chip: {
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#333333",
  },
  selectedChip: {
    backgroundColor: "#6A0DAD",
    borderColor: "#6A0DAD",
  },
  button: {
    marginTop: 30,
  },
});

export default PurposeSelectionScreen;
