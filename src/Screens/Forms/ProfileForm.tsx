import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, Button, Snackbar, useTheme } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"; // Import Firestore
import useGoogleLogin from "../../store/store";
import useProfileStore from "../../store/Profile";

// Define the shape of the profile data
interface ProfileData {
  name: string;
  phone: string;
  address: string;
  visitingHours: string;
  bio: string;
  company: string;
}

const ManageProfileScreen: React.FC = () => {
  const uid = useGoogleLogin((state) => state.uid);
  const { updateProfile } = useProfileStore((state) => ({
    updateProfile: state.updateProfile,
  }));

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [visitingHours, setVisitingHours] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const theme = useTheme();

  useEffect(() => {
    // Fetch existing profile data when component mounts
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const userDoc = await firestore().collection("users").doc(uid).get();
      const userData = userDoc.data() as ProfileData;
      setName(userData.name);
      setPhone(userData.phone);
      setAddress(userData.address);
      setVisitingHours(userData.visitingHours);
      setBio(userData.bio);
      setCompany(userData.company);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      Alert.alert("Error", "Failed to fetch profile data. Please try again.");
    }
  };

  const handleSubmit = async () => {
    try {
      const phoneExists = await checkPhoneNumberExists(phone);
      if (phoneExists) {
        Alert.alert("Phone Number Exists", "This phone number is already in use. Please use a different one.");
        return;
      }

      const profileData: ProfileData = {
        name,
        phone,
        address,
        visitingHours,
        bio,
        company,
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

  const checkPhoneNumberExists = async (phoneNumber: string) => {
    const querySnapshot = await firestore().collection("users").where("phone", "==", phoneNumber).get();
    return !querySnapshot.empty;
  };

  const handleTextInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (text: string) => {
    const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, "");
    setter(cleanedText);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={handleTextInputChange(setName)}
        style={styles.input}
        underlineColor={theme.colors.primary}
        mode="outlined"
        theme={{ colors: { text: theme.colors.text } }}
      />
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={handleTextInputChange(setPhone)}
        style={styles.input}
        keyboardType="phone-pad"
        underlineColor={theme.colors.primary}
        mode="outlined"
        theme={{ colors: { text: theme.colors.text } }}
      />
      <TextInput
        label="Company Name"
        value={company}
        onChangeText={handleTextInputChange(setCompany)}
        style={styles.input}
        underlineColor={theme.colors.primary}
        mode="outlined"
        theme={{ colors: { text: theme.colors.text } }}
      />
      <TextInput
        label="Address"
        value={address}
        onChangeText={handleTextInputChange(setAddress)}
        style={[styles.input, styles.multiline]}
        multiline
        numberOfLines={2}
        underlineColor={theme.colors.primary}
        mode="outlined"
        theme={{ colors: { text: theme.colors.text } }}
      />
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
        }}
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
    backgroundColor: "#ffffff",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  multiline: {
    minHeight: 60,
  },
  button: {
    marginTop: 20,
    borderRadius: 30,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#006aff",
  },
  buttonLabel: {
    fontSize: 20,
    color: "#ffffff",
  },
  snackbar: {
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#006aff",
  },
});

export default ManageProfileScreen;
