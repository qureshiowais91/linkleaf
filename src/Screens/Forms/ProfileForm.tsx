import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  useTheme,
} from "react-native-paper";
import useGoogleLogin from "../../store/store";
import useProfileStore from "../../store/Profile";

// Define the shape of the profile data
interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  visitingHours: string;
  bio: string;
  company: string; // Added company field
}

const ManageProfileScreen: React.FC = () => {
  const uid = useGoogleLogin((state) => state.uid);
  const { updateProfile } = useProfileStore((state) => ({
    updateProfile: state.updateProfile,
  }));

  const [name, setName] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("johndoe@example.com");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [visitingHours, setVisitingHours] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [company, setCompany] = useState<string>(""); // Added company state
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const theme = useTheme(); // Access the current theme

  const handleSubmit = async () => {
    try {
      const profileData: ProfileData = {
        name,
        email,
        phone,
        address,
        visitingHours,
        bio,
        company, // Added company field to profile data
      };

      await updateProfile(profileData, uid);
      setSnackbarMessage("Profile updated successfully!");
      setShowSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Failed to update profile.");
      setShowSnackbar(true);
      console.error("Profile update error:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        underlineColor={theme.colors.primary} // Custom underline color
        mode="outlined" // Outlined style
        theme={{ colors: { text: theme.colors.text } }} // Text color
      />
      {/* <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        underlineColor={theme.colors.primary} // Custom underline color
        mode="outlined" // Outlined style
        theme={{ colors: { text: theme.colors.text } }} // Text color
      /> */}
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
        underlineColor={theme.colors.primary} // Custom underline color
        mode="outlined" // Outlined style
        theme={{ colors: { text: theme.colors.text } }} // Text color
      />
      <TextInput
        label="Company Name"
        value={company}
        onChangeText={setCompany}
        style={styles.input}
        underlineColor={theme.colors.primary} // Custom underline color
        mode="outlined" // Outlined style
        theme={{ colors: { text: theme.colors.text } }} // Text color
      />
      <TextInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        style={[styles.input, styles.multiline]} // Combine input styles
        multiline
        numberOfLines={2}
        underlineColor={theme.colors.primary} // Custom underline color
        mode="outlined" // Outlined style
        theme={{ colors: { text: theme.colors.text } }} // Text color
      />
      {/* <TextInput
        label="Visiting Hours"
        value={visitingHours}
        onChangeText={setVisitingHours}
        style={styles.input}
        underlineColor={theme.colors.primary} // Custom underline color
        mode="outlined" // Outlined style
        theme={{ colors: { text: theme.colors.text } }} // Text color
      /> */}
      {/* <TextInput
        label="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
        style={[styles.input, styles.multiline, { minHeight: 100 }]} // Adjust height for multiline input
        underlineColor={theme.colors.primary} // Custom underline color
        mode="outlined" // Outlined style
        theme={{ colors: { text: theme.colors.text } }} // Text color
      /> */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Save Changes
      </Button>
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
        action={{
          label: "Close",
          onPress: () => setShowSnackbar(false),
        }}
        style={styles.snackbar}
        theme={{
          colors: {
            accent: theme.colors.primary,
            surface: theme.colors.surface,
          },
        }} // Snackbar text color
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 40,
    backgroundColor: "#ffffff", // Background color
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#ffffff", // Input background color
    color: "#000000", // Text color
  },
  multiline: {
    minHeight: 60, // Adjust height for multiline input
  },
  button: {
    marginTop: 20,
    borderRadius: 30, // Rounded button
    padding: 10, // Adjust button height
    justifyContent: "center", // Center button text vertically
    backgroundColor: "#006aff", // Button background color
  },
  buttonLabel: {
    fontSize: 20, // Adjust button text font size
    color: "#ffffff", // Button text color
  },
  snackbar: {
    marginBottom: 20,
    borderRadius: 20, // Rounded snackbar
    backgroundColor: "#006aff", // Snackbar background color
  },
});

export default ManageProfileScreen;
