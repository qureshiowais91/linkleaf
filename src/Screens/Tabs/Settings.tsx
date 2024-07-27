import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Switch, useTheme, DefaultTheme } from "react-native-paper";

const SettingsScreen = () => {
  const [keepEmailPrivate, setKeepEmailPrivate] = useState(false);
  const [keepMobileNumberPrivate, setKeepMobileNumberPrivate] = useState(false);
  const [keepAddressPrivate, setKeepAddressPrivate] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  // Custom theme with black text color
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: "black", // Set text color to black
    },
  };

  const textColor = theme.colors.text; // Accessing text color from custom theme

  const toggleEmailPrivacy = () => setKeepEmailPrivate(!keepEmailPrivate);
  const toggleMobileNumberPrivacy = () =>
    setKeepMobileNumberPrivate(!keepMobileNumberPrivate);
  const toggleAddressPrivacy = () => setKeepAddressPrivate(!keepAddressPrivate);
  const toggleNotifications = () => setAllowNotifications(!allowNotifications);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>
          Keep Email Private
        </Text>
        <Switch
          value={keepEmailPrivate}
          onValueChange={toggleEmailPrivacy}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>
          Keep Mobile Number Private
        </Text>
        <Switch
          value={keepMobileNumberPrivate}
          onValueChange={toggleMobileNumberPrivacy}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>
          Keep Address Private
        </Text>
        <Switch
          value={keepAddressPrivate}
          onValueChange={toggleAddressPrivacy}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>
          Access Request
        </Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          color={theme.colors.primary}
        />
      </View>

      <View style={styles.option}>
        <Text style={[styles.optionText, { color: textColor }]}>
          Allow Notifications
        </Text>
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
