import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "../Screens/Tabs/Profile";
import SettingsScreen from "../Screens/Tabs/Settings";
import ProfileForm from "../Screens/Forms/ProfileForm";
import VisitingCardDesigner from "../Screens/VisitingCardDesigner/Designer";

import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the FontAwesome icon library

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
    
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 20,
          height: 100,
          ...styles.shadow,
        },
        tabBarActiveTintColor: "#efb810",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Set the icon based on the route name
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Settings") {
            iconName = "gear";
          } else if (route.name === "Edit Profile") {
            iconName = "user";
          }

          // Return the icon component
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={ProfileScreen} />
      <Tab.Screen name="Edit Profile" component={ProfileForm} />
      <Tab.Screen name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabNavigator;
