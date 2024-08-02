import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Clipboard,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useGoogleLogin from "../../store/store";
import useUserProfile from "../../store/readProfile";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Share from "react-native-share";

const ProfileScreen = () => {
  const navigation = useNavigation(); // Hook to get navigation object
  const email = useGoogleLogin((state) => state.email);
  const userId = useGoogleLogin((state) => state.uid);

  const { profile, loading, error, refetch } = useUserProfile(userId);

  const fetchProfileOnFocus = useCallback(() => {
    refetch();
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
      title: "Share Profile",
      message: profileInfo,
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const renderCopyableText = (label, value) => {
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

  if (!userId) {
    // Profile data not found, navigate to login screen
    navigation.navigate("LogIn"); // Replace "LogIn" with your actual login screen name
    return null; // Return null or a loading indicator if needed while navigating
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        onPress={shareProfile}
        style={styles.shareIconContainer}
      >
        <Icon name="share" size={24} color="#000000" />
      </TouchableOpacity>
      <View style={styles.container}>
        {renderCopyableText("Name:", profile?.name || "N/A")}
        <View style={styles.divider} />
        {renderCopyableText("Company:", profile?.company || "N/A")}
        <View style={styles.divider} />
        {renderCopyableText("Phone:", profile?.phone || "N/A")}
        <View style={styles.divider} />
        {renderCopyableText("Email:", email || "error@gmail.com")}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  shareIconContainer: {
    position: "absolute",
    top: 620,
    right: 30,
    zIndex: 1,
  },
  container: {
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
  },
  copyableTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  },
});

export default ProfileScreen;
