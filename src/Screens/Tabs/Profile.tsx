import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Clipboard,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useGoogleLogin from "../../store/store";
import useUserProfile from "../../store/readProfile"; // Import the custom hook
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import Share from 'react-native-share'; // Import the react-native-share library

const ProfileScreen = () => {
  const email = useGoogleLogin((state) => state.email);
  const userId = useGoogleLogin((state) => state.uid); // Get the userId from the store
  
  // Use the custom hook to get user profile data
  const { profile, loading, error, refetch } = useUserProfile(userId);

  // Define a callback function to refetch data when the screen is focused
  const fetchProfileOnFocus = useCallback(() => {
    refetch(); // Call refetch function from the custom hook
  }, [refetch]);

  useFocusEffect(fetchProfileOnFocus);

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    alert(`${text} copied to clipboard!`);
  };

  const shareProfile = async () => {
    const profileInfo = `
      Name: ${profile.name || "N/A"}
      Company: ${profile.company || "N/A"}
      Phone: ${profile.phone || "N/A"}
      Email: ${email || "error@gmail.com"}
    `;
    
    const shareOptions = {
      title: 'Share Profile',
      message: profileInfo, 
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const renderCopyableText = (label, value, iconName) => {
    return (
      <TouchableOpacity
        onPress={() => copyToClipboard(value)}
        style={styles.copyableTextContainer}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        onPress={shareProfile}
        style={styles.shareIconContainer}
      >
        <Icon name="share" size={24} color="#000000" />
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          {renderCopyableText("Name:", profile?.name || "N/A", "user")}
          <View style={styles.divider} />
          {renderCopyableText("Company:", profile?.company || "N/A", "building")}
          <View style={styles.divider} />
          {renderCopyableText("Phone:", profile?.phone || "N/A", "phone")}
          <View style={styles.divider} />
          {renderCopyableText("Email:", email || "error@gmail.com", "envelope")}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  shareIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  card: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsContainer: {
    marginTop: 10,
  },
  copyableTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
});

export default ProfileScreen;
