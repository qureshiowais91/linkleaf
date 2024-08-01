import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme, DefaultTheme } from "react-native-paper";
import firestore from '@react-native-firebase/firestore'; // Import firestore from Firebase
import useGoogleLogin from "../../store/store";


const SettingsScreen = () => {
  const [keepEmailPrivate, setKeepEmailPrivate] = useState(false);
  const [keepMobileNumberPrivate, setKeepMobileNumberPrivate] = useState(false);
  const [keepAddressPrivate, setKeepAddressPrivate] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const userId = useGoogleLogin((state) => state.uid); // Get the userId from the store


  // Custom theme with black text color
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: "black", // Set text color to black
    },
  };

  // Accessing text color from custom theme
  const textColor = theme.colors.text;

  // Function to update settings in Firestore
  const updateSettings = async () => {
    try {
      await firestore().collection('users').doc(userId).update({
        keepEmailPrivate,
        keepMobileNumberPrivate,
        keepAddressPrivate,
        allowNotifications,
        darkMode
      });
      console.log('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  // Function to fetch settings from Firestore
  const fetchSettings = async () => {
    const userId = 'YOUR_USER_ID'; // Replace with actual user ID
    try {
      const snapshot = await firestore().collection('users').doc(userId).get();
      if (snapshot.exists) {
        const data = snapshot.data();
        setKeepEmailPrivate(data.keepEmailPrivate || false);
        setKeepMobileNumberPrivate(data.keepMobileNumberPrivate || false);
        setKeepAddressPrivate(data.keepAddressPrivate || false);
        setAllowNotifications(data.allowNotifications || true);
        setDarkMode(data.darkMode || false);
      } else {
        console.log('No settings found for the user.');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  // Toggle functions
  const toggleEmailPrivacy = () => setKeepEmailPrivate(!keepEmailPrivate);
  const toggleMobileNumberPrivacy = () => setKeepMobileNumberPrivate(!keepMobileNumberPrivate);
  const toggleAddressPrivacy = () => setKeepAddressPrivate(!keepAddressPrivate);
  const toggleNotifications = () => setAllowNotifications(!allowNotifications);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Effect to update settings in Firestore whenever they change
  useEffect(() => {
    updateSettings();
  }, [keepEmailPrivate, keepMobileNumberPrivate, keepAddressPrivate, allowNotifications, darkMode]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>Keep Email Private</Text>
        <Switch
          value={keepEmailPrivate}
          onValueChange={toggleEmailPrivacy}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>Keep Mobile Number Private</Text>
        <Switch
          value={keepMobileNumberPrivate}
          onValueChange={toggleMobileNumberPrivacy}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>Keep Address Private</Text>
        <Switch
          value={keepAddressPrivate}
          onValueChange={toggleAddressPrivacy}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>Allow Notifications</Text>
        <Switch
          value={allowNotifications}
          onValueChange={toggleNotifications}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
